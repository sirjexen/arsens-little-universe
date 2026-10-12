// Lapisan easter egg global. Isinya:
// (a) hotspot bintang kecil di kanan-bawah (klik -> 'star-note' + ledakan kilau),
// (b) delegasi klik dokumen: 7x klik [data-egg="mascot"] dalam 3 detik -> 'mascot-spam',
//     (root SVG komponen Arsen memang membawa data-egg="mascot")
// (c) makhluk ngintip dari tepi bawah layar (klik -> 'sleeper', lalu sembunyi 5 menit),
// (d) pendengar CustomEvent 'alu:fav-count' -> count >= 5 -> 'collector'.
// Semua pointer-events-none kecuali hotspot-nya sendiri; tidak mengganggu scroll.

import { useEffect, useRef, useState } from 'react';
import { useEggs } from './eggs';
import { sfx } from '../lib/sound';

const MASCOT_CLICKS_NEEDED = 7;
const MASCOT_WINDOW_MS = 3000;
const SLEEPER_HIDE_MS = 5 * 60 * 1000;
const BURST_MS = 1000;

const SPARKLES: { left: string; top: string; delay: string }[] = [
  { left: '-16%', top: '-28%', delay: '0ms' },
  { left: '92%', top: '-34%', delay: '70ms' },
  { left: '108%', top: '38%', delay: '140ms' },
  { left: '-32%', top: '48%', delay: '210ms' },
  { left: '28%', top: '-48%', delay: '280ms' },
  { left: '62%', top: '102%', delay: '350ms' },
];

export default function EasterLayer() {
  const { unlock } = useEggs();
  const [burst, setBurst] = useState(0);
  const [sleeperVisible, setSleeperVisible] = useState(true);
  const mascotClicks = useRef<number[]>([]);
  const burstTimer = useRef<number | null>(null);
  const sleeperTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (burstTimer.current !== null) window.clearTimeout(burstTimer.current);
      if (sleeperTimer.current !== null) window.clearTimeout(sleeperTimer.current);
    },
    [],
  );

  // (b) Hitung klik cepat pada maskot.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;
      if (!target.closest('[data-egg="mascot"]')) return;
      const now = Date.now();
      mascotClicks.current = [...mascotClicks.current.filter((t) => now - t < MASCOT_WINDOW_MS), now];
      if (mascotClicks.current.length >= MASCOT_CLICKS_NEEDED) {
        mascotClicks.current = [];
        if (unlock('mascot-spam')) sfx.tada();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [unlock]);

  // (d) Event jumlah favorit dari scene lain.
  useEffect(() => {
    const onFavCount = (e: Event) => {
      const detail = (e as CustomEvent<{ count?: unknown }>).detail;
      if (typeof detail?.count === 'number' && detail.count >= 5) {
        if (unlock('collector')) sfx.tada();
      }
    };
    window.addEventListener('alu:fav-count', onFavCount);
    return () => window.removeEventListener('alu:fav-count', onFavCount);
  }, [unlock]);

  const handleStar = () => {
    if (unlock('star-note')) sfx.tada();
    else sfx.pop();
    setBurst((b) => b + 1);
    if (burstTimer.current !== null) window.clearTimeout(burstTimer.current);
    burstTimer.current = window.setTimeout(() => setBurst(0), BURST_MS);
  };

  const handleSleeper = () => {
    if (unlock('sleeper')) sfx.tada();
    else sfx.boing();
    setSleeperVisible(false);
    if (sleeperTimer.current !== null) window.clearTimeout(sleeperTimer.current);
    sleeperTimer.current = window.setTimeout(() => setSleeperVisible(true), SLEEPER_HIDE_MS);
  };

  return (
    <>
      {/* (a) Hotspot bintang kecil — sengaja subtle biar seru ditemuin */}
      <button
        type="button"
        onClick={handleStar}
        aria-label="Ada bintang kecil berkedip di sini, coba pencet"
        className="fixed bottom-5 right-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/15 bg-butter-100/90 opacity-80 shadow-sm transition hover:scale-110 hover:opacity-100 active:scale-95"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 animate-pulse fill-butter-400">
          <path d="M12 2.6l2.8 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.7l-5.8 3.1 1.4-6.3L2.8 9.2l6.4-.7L12 2.6z" />
        </svg>
        {burst > 0 && (
          <span key={burst} aria-hidden="true" className="pointer-events-none absolute -inset-3">
            {SPARKLES.map((s, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="animate-pop-in absolute text-lg text-butter-400"
                style={{ left: s.left, top: s.top, animationDelay: s.delay }}
              >
                ✦
              </span>
            ))}
          </span>
        )}
      </button>

      {/* (c) Makhluk ngintip — animate-peek bikin dia nongol tiap siklus */}
      {sleeperVisible && (
        <div className="pointer-events-none fixed bottom-0 left-4 z-[90] h-14 w-16 overflow-hidden">
          <button
            type="button"
            onClick={handleSleeper}
            aria-label="Ada yang ngintip dari bawah layar! Pencet dia"
            className="pointer-events-none absolute inset-0"
          >
            {/* Span yang dianimasikan yang pegang pointer-events: cuma bisa
                diklik saat dia lagi nongol (nggak kepotong overflow). */}
            <span className="animate-peek pointer-events-auto absolute inset-0 flex items-end justify-center">
              <svg viewBox="0 0 64 60" aria-hidden="true" className="h-12 w-14">
                <ellipse cx="32" cy="54" rx="26" ry="18" fill="#8f76cc" />
                <ellipse cx="32" cy="54" rx="26" ry="18" fill="none" stroke="#4a3b52" strokeWidth="2.5" />
                <circle cx="23" cy="48" r="7.5" fill="#fffdf7" stroke="#4a3b52" strokeWidth="2" />
                <circle cx="41" cy="48" r="7.5" fill="#fffdf7" stroke="#4a3b52" strokeWidth="2" />
                <circle cx="24" cy="49" r="3" fill="#4a3b52" />
                <circle cx="42" cy="49" r="3" fill="#4a3b52" />
                <circle cx="16" cy="54" r="3" fill="#f7a8c4" opacity="0.85" />
                <circle cx="48" cy="54" r="3" fill="#f7a8c4" opacity="0.85" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
