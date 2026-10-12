// Surat Rahasia dari Arsen: amplop tersegel -> klik -> animasi terbuka
// (flap rotateX + surat meluncur keluar, ~0.8 dtk) -> surat tulisan tangan.
// Dibuka jam 00:00-05:00 -> unlock('night-owl').

import { useEffect, useRef, useState } from 'react';
import { LETTER } from '../content/content';
import { PaperCard, SectionHeader, StickerButton } from '../components/ui';
import { sfx } from '../lib/sound';
import { useEggs } from '../easter/eggs';

type Phase = 'closed' | 'opening' | 'open';

const OPEN_ANIM_MS = 850;

export default function Surat() {
  const [phase, setPhase] = useState<Phase>('closed');
  const { unlock } = useEggs();
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const openLetter = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    sfx.pop();
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock('night-owl');
    timer.current = window.setTimeout(() => setPhase('open'), OPEN_ANIM_MS);
  };

  const closeLetter = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    sfx.click();
    setPhase('closed');
  };

  return (
    <section aria-label="Surat rahasia dari Arsen" className="mx-auto w-full max-w-xl px-4 py-6">
      <SectionHeader
        title="Surat Rahasia"
        subtitle="Arsen nyelipin sesuatu di sini. Jangan bilang-bilang ya."
        doodle="sparkle"
      />

      {phase === 'open' ? (
        <PaperCard washi className="animate-pop-in relative mt-6">
          <h3 className="font-hand text-3xl text-ink sm:text-4xl">{LETTER.title}</h3>
          <div className="mt-4 space-y-4">
            {LETTER.paragraphs.map((p, i) => (
              <p key={i} className="font-hand text-xl leading-relaxed text-ink sm:text-2xl">
                {p}
              </p>
            ))}
          </div>
          <p className="font-hand mt-6 text-right text-2xl text-blush-700">{LETTER.sign}</p>
          <div className="mt-8 text-center">
            <StickerButton onClick={closeLetter} color="blush">
              Lipat lagi 💌
            </StickerButton>
          </div>
        </PaperCard>
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <p className="mb-6 text-center text-sm text-ink-soft">
            Ada surat buat kamu. Klik amplopnya buat buka.
          </p>

          <button
            type="button"
            onClick={openLetter}
            aria-label="Buka surat rahasia dari Arsen"
            className="animate-pop-in relative h-48 w-64 cursor-pointer [perspective:900px] sm:h-56 sm:w-80"
          >
            {/* Badan amplop */}
            <span
              aria-hidden="true"
              className="shadow-card absolute inset-0 rounded-2xl border-[2.5px] border-ink bg-blush-100"
            />
            {/* Surat yang meluncur keluar saat dibuka */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-4 bottom-3 top-3 rounded-lg border-2 border-ink/60 bg-paper shadow transition-all duration-700 ease-out ${
                phase === 'opening' ? '-translate-y-16' : 'translate-y-0'
              }`}
            >
              <span className="font-hand mt-3 block text-center text-lg text-ink-soft">
                untukmu... 💌
              </span>
            </span>
            {/* Kantong depan amplop */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 top-[42%] rounded-b-2xl border-[2.5px] border-ink bg-blush-200 [clip-path:polygon(0_0,50%_32%,100%_0,100%_100%,0_100%)]"
            />
            {/* Flap segitiga — muter ke belakang saat dibuka */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-[46%] origin-top border-[2.5px] border-ink bg-blush-300 transition-transform duration-700 [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] ${
                phase === 'opening' ? '[transform:rotateX(180deg)]' : ''
              }`}
            />
            {/* Segel lilin */}
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-red-400 text-2xl shadow transition-opacity duration-300 ${
                phase === 'opening' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              🌷
            </span>
          </button>

          {/* Hiasan melayang */}
          <div aria-hidden="true" className="pointer-events-none relative h-16 w-full">
            <span className="animate-float absolute left-[18%] top-2 text-2xl">💗</span>
            <span className="animate-drift absolute right-[20%] top-6 text-xl">✨</span>
            <span className="animate-bob absolute left-[42%] top-8 text-lg">💌</span>
          </div>

          <p className="mt-2 text-center text-xs text-ink-faint">
            Psst... kata orang, surat ini lebih manis dibaca tengah malam. 🌙
          </p>
        </div>
      )}
    </section>
  );
}
