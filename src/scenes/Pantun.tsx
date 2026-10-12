import { useState } from 'react';
import { PANTUN } from '../content/pantun';
import { Glyph } from '../components/icons';
import {
  Chip,
  Doodle,
  PaperCard,
  SectionHeader,
  StickerButton,
  useLocalStorage,
} from '../components/ui';
import { sfx } from '../lib/sound';

function pickIndex(exclude: number): number {
  let n = Math.floor(Math.random() * PANTUN.length);
  let guard = 0;
  while (PANTUN.length > 1 && n === exclude && guard++ < 10) {
    n = Math.floor(Math.random() * PANTUN.length);
  }
  return n;
}

const SWAP_CSS = `
.pantun-swap { animation: pantun-in 0.35s ease; }
@keyframes pantun-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
`;

export default function Pantun() {
  const [idx, setIdx] = useLocalStorage<number>(
    'alu:pantun-idx',
    Math.floor(Math.random() * PANTUN.length),
  );
  const [favs, setFavs] = useLocalStorage<Record<string, boolean>>('alu:pantun-favs', {});
  const [copied, setCopied] = useState(false);

  const safeIdx = idx >= 0 && idx < PANTUN.length ? idx : 0;
  const pantun = PANTUN[safeIdx];
  const favKey = String(safeIdx);
  const isFav = !!favs[favKey];
  const favCount = Object.values(favs).filter(Boolean).length;

  const next = () => {
    sfx.pop();
    setCopied(false);
    setIdx((prev) => pickIndex(prev));
  };

  const toggleFav = () => {
    sfx.pop();
    setFavs((prev) => ({ ...prev, [favKey]: !prev[favKey] }));
  };

  const copy = async () => {
    sfx.click();
    const text = [...pantun.sampiran, ...pantun.isi].join('\n');
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = false;
    }
    if (!ok) {
      // Fallback buat browser lama / izin clipboard ditolak.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10">
      <style>{SWAP_CSS}</style>
      <SectionHeader
        title="Pantun Arsen"
        subtitle="Pantun gombal spesial buat Livia, fresh from the oven."
        doodle="sparkle"
      />

      <PaperCard washi tilt={-1}>
        <div key={safeIdx} className="pantun-swap">
          <div className="mb-3 flex items-center justify-between gap-2">
            <Chip>
              pantun ke-{safeIdx + 1} dari {PANTUN.length}
            </Chip>
            <button
              type="button"
              onClick={toggleFav}
              aria-pressed={isFav}
              aria-label={isFav ? 'hapus dari favorit' : 'tandai sebagai favorit'}
              className="border-ink bg-paper flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border-2 px-3"
            >
              <Glyph
                kind="heart"
                className={`h-6 w-6 ${isFav ? 'text-blush-500' : 'text-ink-faint'}`}
              />
            </button>
          </div>

          <div aria-live="polite">
            <div className="font-hand text-ink-soft text-xl leading-relaxed italic">
              {pantun.sampiran.map((line) => (
                <p key={line} className="pl-1">
                  {line}
                </p>
              ))}
            </div>

            <div className="my-3 flex items-center justify-center">
              <Doodle kind="swirl" className="text-blush-300 h-6 w-6" />
            </div>

            <div className="font-display text-ink text-[1.35rem] leading-snug font-bold">
              {pantun.isi.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </PaperCard>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <StickerButton color="butter" onClick={next}>
          <Glyph kind="refresh" className="h-6 w-6" />
          Pantun lagi
        </StickerButton>
        <StickerButton color="peach" onClick={copy}>
          <Glyph kind={copied ? 'check' : 'copy'} className="h-6 w-6" />
          {copied ? 'Tersalin!' : 'Salin'}
        </StickerButton>
      </div>

      {favCount > 0 && (
        <p className="text-ink-faint mt-4 text-center text-sm">
          {favCount} pantun masuk daftar favoritmu.
        </p>
      )}
    </div>
  );
}
