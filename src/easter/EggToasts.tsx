// Toast "pencapaian rahasia": mendengarkan eggEvents, muncul playful,
// hilang sendiri ~4 detik, maksimal 3 tumpuk.

import { useEffect, useRef, useState } from 'react';
import { eggEvents, eggMeta, type EggId } from './eggs';
import { Doodle } from '../components/ui';
import { sfx } from '../lib/sound';

interface ToastItem {
  key: number;
  id: EggId;
  title: string;
  text: string;
}

const MAX_TOASTS = 3;
const DISMISS_MS = 4000;

export default function EggToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const keyRef = useRef(0);

  useEffect(() => {
    const unsub = eggEvents.subscribe((id: EggId) => {
      const meta = eggMeta(id);
      keyRef.current += 1;
      const key = keyRef.current;
      const item: ToastItem = { key, id, title: meta.title, text: meta.text };
      setToasts((prev) => [...prev.slice(-(MAX_TOASTS - 1)), item]);
      sfx.tada();
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.key !== key));
      }, DISMISS_MS);
    });
    return unsub;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 top-4 z-[100] flex w-[min(92vw,22rem)] -translate-x-1/2 flex-col items-stretch gap-2"
    >
      {toasts.map((t) => (
        <div
          key={t.key}
          role="status"
          className="paper-card animate-pop-in pointer-events-auto flex items-start gap-2 px-4 py-3"
        >
          <Doodle kind="star" className="h-6 w-6 text-butter-400" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-ink">
              Pencapaian rahasia: {t.title}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-ink-soft">{t.text}</p>
          </div>
          <button
            type="button"
            aria-label="Tutup notifikasi pencapaian"
            onClick={() => setToasts((prev) => prev.filter((x) => x.key !== t.key))}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-xl text-ink-faint transition-colors hover:text-ink"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
