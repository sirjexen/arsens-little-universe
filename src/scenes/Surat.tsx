// Letters for Livia: koleksi 3 surat dengan koreografi amplop sinematik.
// Alur: pick (pilih amplop) -> closed -> opening (flap + segel) ->
// sliding (surat meluncur keluar) -> unfolding (kertas terbentang) -> open.
// Mode tenang (atau prefers-reduced-motion): langsung ke 'open'.
// Buka surat jam 00:00-05:00 -> unlock('night-owl').

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  LETTERS,
  type Letter,
  type LetterAnnotation,
  type LetterAtmosphere,
} from '../content/content';
import {
  Chip,
  PaperCard,
  SectionHeader,
} from '../components/ui';
import { Glyph, type GlyphKind } from '../components/icons';
import Ambience from '../components/Ambience';
import { sfx } from '../lib/sound';
import { useEggs } from '../easter/eggs';

type Phase = 'pick' | 'closed' | 'opening' | 'sliding' | 'unfolding' | 'open';

const OPENING_MS = 650;
const SLIDING_MS = 800;
const UNFOLDING_MS = 700;

const READ_KEY = 'alu:letters-read';
const CALM_KEY = 'alu:calm-mode';

const SEAL_GLYPH: Record<LetterAtmosphere, GlyphKind> = {
  rain: 'cloud',
  sunset: 'sun',
  stars: 'star',
};

const ENVELOPE_BG: Record<LetterAtmosphere, string> = {
  rain: 'bg-lav-100',
  sunset: 'bg-peach-100',
  stars: 'bg-lav-200',
};

const ENVELOPE_DEEP: Record<LetterAtmosphere, string> = {
  rain: 'bg-lav-200',
  sunset: 'bg-peach-200',
  stars: 'bg-lav-300',
};

function readIds(): string[] {
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/* Paragraf dengan anotasi tulisan tangan: anchor diketik/diketuk
   untuk memunculkan catatan kecil. Anchor harus substring persis
   dari teks paragraf (dijamin modul konten). */
function AnnotatedParagraph({
  text,
  annotations,
  staggerMs,
}: {
  text: string;
  annotations: LetterAnnotation[];
  staggerMs: number;
}) {
  const [open, setOpen] = useState(false);
  const ann = annotations.find((a) => text.includes(a.anchor));

  let body: ReactNode = text;
  if (ann) {
    const idx = text.indexOf(ann.anchor);
    const before = text.slice(0, idx);
    const after = text.slice(idx + ann.anchor.length);
    // Tempelkan tanda baca pembuka (koma/titik/dll) ke anchor supaya
    // tidak yatim di awal baris berikutnya.
    const punctMatch = after.match(/^([,.;:!?…]+)/);
    const punct = punctMatch ? punctMatch[1] : '';
    const rest = punct ? after.slice(punct.length) : after;
    body = (
      <>
        {before}
        <span className="whitespace-nowrap">
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              sfx.pop();
            }}
            aria-expanded={open}
            className="font-bold text-blush-700 underline decoration-blush-300 decoration-dotted underline-offset-4"
          >
            {ann.anchor}
          </button>
          {punct}
        </span>
        {rest}
      </>
    );
  }

  return (
    <div>
      <p
        className="animate-ink-in text-[1.05rem] leading-relaxed text-ink sm:text-lg"
        style={{ animationDelay: `${staggerMs}ms` }}
      >
        {body}
      </p>
      {ann && open && (
        <p className="animate-pop-in mt-2 inline-block -rotate-1 rounded-xl border-2 border-dashed border-ink/25 bg-butter-100 px-3 py-1.5 font-hand text-xl leading-snug text-ink">
          {ann.note}
        </p>
      )}
    </div>
  );
}

function WaxSeal({ letter, size = 'md' }: { letter: Letter; size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'h-11 w-11' : 'h-14 w-14';
  const icon = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
  return (
    <span
      aria-hidden="true"
      className={`flex ${dims} items-center justify-center rounded-full border-2 border-ink shadow`}
      style={{ background: letter.sealColor }}
    >
      <Glyph kind={SEAL_GLYPH[letter.atmosphere]} className={`${icon} text-paper`} />
    </span>
  );
}

export default function Surat() {
  const [phase, setPhase] = useState<Phase>('pick');
  const [letterId, setLetterId] = useState<string | null>(null);
  const [read, setRead] = useState<string[]>(() => readIds());
  const [calm, setCalm] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(CALM_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [surpriseShown, setSurpriseShown] = useState(false);
  const { unlock } = useEggs();
  const timers = useRef<number[]>([]);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const still = calm || reducedMotion;

  const letter: Letter | null = letterId
    ? (LETTERS.find((l) => l.id === letterId) ?? null)
    : null;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase === 'open' && letterId && !read.includes(letterId)) {
      const next = [...read, letterId];
      setRead(next);
      try {
        window.localStorage.setItem(READ_KEY, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, letterId]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const pickLetter = (id: string) => {
    sfx.click();
    setLetterId(id);
    setSurpriseShown(false);
    setPhase('closed');
  };

  const backToPick = () => {
    clearTimers();
    sfx.click();
    setPhase('pick');
    setLetterId(null);
    setSurpriseShown(false);
  };

  const openEnvelope = () => {
    if (phase !== 'closed') return;
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock('night-owl');
    if (still) {
      sfx.pop();
      setPhase('open');
      return;
    }
    setPhase('opening');
    sfx.pop();
    later(() => setPhase('sliding'), OPENING_MS);
    later(() => setPhase('unfolding'), OPENING_MS + SLIDING_MS);
    later(() => {
      setPhase('open');
      sfx.tada();
    }, OPENING_MS + SLIDING_MS + UNFOLDING_MS);
  };

  const toggleCalm = () => {
    const next = !calm;
    setCalm(next);
    try {
      window.localStorage.setItem(CALM_KEY, next ? '1' : '0');
    } catch {
      /* abaikan */
    }
    sfx.click();
  };

  const envelopePhase = phase === 'closed' || phase === 'opening' || phase === 'sliding';

  return (
    <section aria-label="Letters for Livia" className="relative mx-auto w-full max-w-xl px-4 py-6">
      <SectionHeader
        title="Letters for Livia"
        subtitle="Tiga surat, tiga suasana. Pilih amplopnya, buka pelan-pelan."
        doodle="sparkle"
      />

      <div className="mb-4 flex justify-center">
        <Chip
          onClick={toggleCalm}
          label={calm ? 'Matikan mode tenang' : 'Nyalakan mode tenang'}
        >
          <Glyph kind="moon" className="h-4 w-4" />
          Mode tenang: {calm ? 'nyala' : 'mati'}
        </Chip>
      </div>

      {phase === 'pick' && (
        <div className="animate-pop-in grid gap-4 sm:grid-cols-3">
          {LETTERS.map((l) => {
            const wasRead = read.includes(l.id);
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => pickLetter(l.id)}
                className="paper-card group p-4 text-left transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="relative mx-auto block h-24 w-40" aria-hidden="true">
                  <span
                    className={`absolute inset-0 rounded-xl border-2 border-ink ${ENVELOPE_BG[l.atmosphere]}`}
                  />
                  <span
                    className={`absolute inset-x-0 top-0 h-1/2 border-2 border-ink ${ENVELOPE_DEEP[l.atmosphere]}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110">
                    <WaxSeal letter={l} size="sm" />
                  </span>
                </span>
                <span className="font-display mt-3 block text-lg leading-tight font-bold text-ink">
                  {l.title}
                </span>
                <span className="mt-1 block text-sm text-ink-soft">{l.subtitle}</span>
                {wasRead && (
                  <span className="mt-2 flex items-center gap-1 text-xs font-bold text-sage-600">
                    <Glyph kind="check" className="h-4 w-4" />
                    sudah dibaca
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {letter && phase !== 'pick' && (
        <div className="relative">
          <Ambience variant={letter.atmosphere} still={still} />

          <div className="relative">
            <button
              type="button"
              onClick={backToPick}
              className="font-display mb-4 inline-flex min-h-[44px] items-center gap-1 rounded-full border-2 border-ink/15 bg-paper px-4 text-sm font-bold text-ink-soft"
            >
              ← pilih surat lain
            </button>

            {envelopePhase && (
              <div className="flex flex-col items-center">
                <p className="mb-6 text-center text-sm text-ink-soft">
                  Ada surat buat kamu: <strong className="text-ink">{letter.title}</strong>.
                  Ketuk amplopnya buat buka.
                </p>

                <button
                  type="button"
                  onClick={openEnvelope}
                  aria-label={`Buka surat: ${letter.title}`}
                  className="animate-pop-in relative h-56 w-72 cursor-pointer [perspective:900px] sm:h-64 sm:w-96"
                >
                  {/* Badan amplop */}
                  <span
                    aria-hidden="true"
                    className={`shadow-card absolute inset-0 rounded-2xl border-[2.5px] border-ink transition-all duration-500 ${ENVELOPE_BG[letter.atmosphere]} ${
                      phase === 'sliding' ? 'scale-95 opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Surat yang meluncur keluar */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-5 top-4 bottom-4 rounded-lg border-2 border-ink/60 bg-paper shadow transition-all duration-700 ease-out ${
                      phase === 'sliding' ? '-translate-y-24 opacity-100' : 'translate-y-8 opacity-90'
                    }`}
                  >
                    <span className="font-hand mt-4 block text-center text-xl text-ink-soft">
                      untuk Livia...
                    </span>
                  </span>
                  {/* Kantong depan */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 top-[42%] rounded-b-2xl border-[2.5px] border-ink transition-opacity duration-500 ${ENVELOPE_DEEP[letter.atmosphere]} [clip-path:polygon(0_0,50%_32%,100%_0,100%_100%,0_100%)] ${
                      phase === 'sliding' ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Flap segitiga — terlipat ke belakang saat dibuka */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[46%] origin-top border-[2.5px] border-ink transition-all duration-700 [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] ${ENVELOPE_DEEP[letter.atmosphere]} ${
                      phase === 'closed' ? '' : '[transform:rotateX(180deg)] opacity-0'
                    }`}
                  />
                  {/* Segel lilin */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                      phase === 'closed' ? 'scale-100 opacity-100' : 'scale-50 rotate-90 opacity-0'
                    }`}
                  >
                    <WaxSeal letter={letter} />
                  </span>
                </button>

                <p className="mt-8 flex items-center gap-2 text-center text-xs text-ink-faint">
                  <Glyph kind="moon" className="h-4 w-4" />
                  Psst... kata orang, surat-surat ini lebih manis dibaca tengah malam.
                </p>
              </div>
            )}

            {(phase === 'unfolding' || phase === 'open') && (
              <PaperCard
                key={`${letter.id}-${phase === 'unfolding' ? 'anim' : 'static'}`}
                washi
                className={`relative mt-2 ${phase === 'unfolding' ? 'animate-unfold origin-top' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <WaxSeal letter={letter} size="sm" />
                  <div>
                    <h3 className="font-hand text-3xl leading-tight text-ink sm:text-4xl">
                      {letter.title}
                    </h3>
                    <p className="text-xs font-bold tracking-widest text-ink-faint uppercase">
                      {letter.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {letter.paragraphs.map((p, i) => (
                    <AnnotatedParagraph
                      key={i}
                      text={p}
                      annotations={letter.annotations}
                      staggerMs={still ? 0 : 150 + i * 160}
                    />
                  ))}
                </div>

                <p className="font-hand mt-6 text-right text-2xl text-blush-700">{letter.sign}</p>

                {/* Kejutan tersembunyi di dalam surat */}
                <div className="mt-6 border-t-2 border-dashed border-ink/15 pt-5 text-center">
                  {!surpriseShown ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSurpriseShown(true);
                        sfx.tada();
                      }}
                      className="group inline-flex min-h-[56px] items-center gap-3 rounded-full border-2 border-ink/15 bg-cream px-5 py-2 transition-transform hover:scale-105 active:scale-95"
                      aria-label="Ada sesuatu yang disembunyikan di surat ini"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink transition-transform group-hover:rotate-12"
                        style={{ background: letter.sealColor }}
                      >
                        <Glyph kind={SEAL_GLYPH[letter.atmosphere]} className="h-5 w-5 text-paper" />
                      </span>
                      <span className="font-hand text-xl text-ink-soft">{letter.surprise.hint}</span>
                    </button>
                  ) : (
                    <div className="animate-pop-in doodle-frame bg-butter-100 px-4 py-3">
                      <p className="font-hand text-2xl leading-snug text-ink">
                        {letter.surprise.reveal}
                      </p>
                    </div>
                  )}
                </div>
              </PaperCard>
            )}
          </div>
        </div>
      )}

      {phase === 'pick' && (
        <p className="mt-6 text-center text-xs text-ink-faint">
          Setiap surat punya suasananya sendiri. Dibaca ulang pun tetap manis.
        </p>
      )}
    </section>
  );
}
