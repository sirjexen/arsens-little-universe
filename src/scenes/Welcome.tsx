import { useEffect, useRef, useState } from 'react';
import Arsen from '../components/Arsen';
import Bunga from '../components/Bunga';
import { Glyph } from '../components/icons';
import { Doodle, PaperCard, StickerButton } from '../components/ui';
import { sfx } from '../lib/sound';
import { WELCOME_LINES } from '../content/content';

interface WelcomeProps {
  onEnter: () => void;
}

const DOODLES = [
  { kind: 'star', cls: 'left-[6%] top-[12%] h-7 w-7 text-butter-400', anim: 'animate-float', delay: '0s' },
  { kind: 'heart', cls: 'right-[8%] top-[18%] h-8 w-8 text-blush-500', anim: 'animate-drift', delay: '0.8s' },
  { kind: 'sparkle', cls: 'left-[10%] bottom-[22%] h-6 w-6 text-lav-500', anim: 'animate-drift', delay: '1.6s' },
  { kind: 'swirl', cls: 'right-[6%] bottom-[30%] h-9 w-9 text-sage-600', anim: 'animate-float', delay: '2.2s' },
  { kind: 'star', cls: 'left-[16%] top-[46%] h-5 w-5 text-peach-400', anim: 'animate-bob', delay: '1.1s' },
  { kind: 'heart', cls: 'right-[16%] top-[52%] h-5 w-5 text-blush-300', anim: 'animate-bob', delay: '0.4s' },
] as const;

export default function Welcome({ onEnter }: WelcomeProps) {
  const lines = WELCOME_LINES;
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (lines.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % lines.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [lines.length]);

  const nextLine = () => {
    sfx.pop();
    setIdx((i) => (i + 1) % lines.length);
  };

  const enter = () => {
    if (done.current) return;
    done.current = true;
    sfx.tada();
    setLeaving(true);
    window.setTimeout(onEnter, 750);
  };

  const line = lines[idx] ?? lines[0];

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip px-5 py-10">
      {/* coretan melayang */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {DOODLES.map((d, i) => (
          <span key={i} className={`absolute ${d.cls}`} style={{ animationDelay: d.delay }}>
            <Doodle kind={d.kind} className={`h-full w-full ${d.anim}`} />
          </span>
        ))}
      </div>

      <div className="animate-pop-in flex w-full max-w-sm flex-col items-center gap-5">
        <p className="font-hand text-ink-soft text-center text-2xl">
          dari Arsen, untuk Livia{' '}
          <Glyph kind="flower" className="inline h-6 w-6 text-blush-500" />
        </p>

        <h1 className="font-display text-ink text-center text-4xl leading-tight font-extrabold">
          Arsen's Little
          <br />
          Universe
        </h1>

        {/* komposisi maskot */}
        <div className="relative flex items-end justify-center" aria-hidden="true">
          <Bunga mood="happy" size={118} className="animate-wobble -mr-6 mb-2" />
          <Arsen
            expression={leaving ? 'happy' : 'love'}
            size={152}
            className={leaving ? 'animate-wiggle' : 'animate-bob'}
          />
        </div>

        {/* gelembung sapaan — bisa diketuk untuk ganti kalimat */}
        <button
          type="button"
          onClick={nextLine}
          aria-label="Tampilkan sapaan berikutnya"
          className="w-full cursor-pointer text-left"
        >
          <PaperCard washi tilt={-1} className="min-h-[104px]">
            <p key={idx} className="animate-pop-in font-hand text-ink text-center text-[1.35rem] leading-snug">
              “{line}”
            </p>
            <p className="text-ink-faint mt-2 text-center text-xs font-bold tracking-wide uppercase">
              ketuk buat sapaan lain ↻
            </p>
          </PaperCard>
        </button>

        <StickerButton color="blush" onClick={enter} className="w-full px-8 py-4 text-xl" disabled={leaving}>
          {leaving ? 'siap-siap…' : 'Masuk ke dunia Arsen'}
        </StickerButton>

        <p className="text-ink-soft text-center text-sm">
          lima dunia mini menunggumu: nasihat, darurat kangen, kebun, surat, dan pengukur kegemesan
        </p>
      </div>

      {/* transisi keluar: layar "terangkat" */}
      <div
        aria-hidden="true"
        className={`bg-cream pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-transform duration-500 ease-in ${
          leaving ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <Arsen expression="happy" size={110} className="animate-bob" />
          <p className="font-hand text-ink-soft text-2xl">tunggu yaa, lagi disiapin…</p>
        </div>
      </div>
    </main>
  );
}
