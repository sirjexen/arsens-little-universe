import { useEffect, useRef, useState } from 'react';
import { Glyph } from '../components/icons';
import {
  Chip,
  PaperCard,
  SectionHeader,
  StickerButton,
  useLocalStorage,
} from '../components/ui';
import { sfx } from '../lib/sound';

/* ------------------------------------------------------------------ */
/* Motif — 8 doodle SVG digambar inline, gaya stroke konsisten          */
/* ------------------------------------------------------------------ */

const INK = '#4a3b52';

type MotifKind =
  | 'tulip'
  | 'daisy'
  | 'sun'
  | 'star'
  | 'heart'
  | 'leaf'
  | 'mushroom'
  | 'rainbow';

const MOTIF_ORDER: MotifKind[] = [
  'tulip',
  'daisy',
  'sun',
  'star',
  'heart',
  'leaf',
  'mushroom',
  'rainbow',
];

const MOTIF_LABEL: Record<MotifKind, string> = {
  tulip: 'tulip',
  daisy: 'daisy',
  sun: 'matahari',
  star: 'bintang',
  heart: 'hati',
  leaf: 'daun',
  mushroom: 'jamur',
  rainbow: 'pelangi',
};

function Motif({ kind, className = 'h-10 w-10' }: { kind: MotifKind; className?: string }) {
  const frame = { viewBox: '0 0 48 48', className, 'aria-hidden': true } as const;
  switch (kind) {
    case 'tulip':
      return (
        <svg {...frame}>
          <path d="M24 45V27" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <path
            d="M24 39c-4.5 0-8.5-2-11-5.5 3.5-.5 8 .5 11 3.5 3-3 7.5-4 11-3.5-2.5 3.5-6.5 5.5-11 5.5z"
            fill="#9dc39a"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <path
            d="M15 26c0-7 4-12.5 9-15 5 2.5 9 8 9 15 0 5-4 8-9 8s-9-3-9-8z"
            fill="#f4a9c4"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <path
            d="M15 26c1.8 1.6 3.6 1.6 5.4 0 1.8 1.6 3.6 1.6 5.4 0 1.8 1.6 3.6 1.6 5.4 0"
            fill="none"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'daisy':
      return (
        <svg {...frame}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse
              key={a}
              cx={24}
              cy={13.5}
              rx={5}
              ry={8}
              fill="#fffdf7"
              stroke={INK}
              strokeWidth={2.4}
              transform={`rotate(${a} 24 24)`}
            />
          ))}
          <circle cx={24} cy={24} r={7} fill="#f6d774" stroke={INK} strokeWidth={2.4} />
          <circle cx={21.5} cy={23} r={1.4} fill={INK} />
          <circle cx={26.5} cy={23} r={1.4} fill={INK} />
          <path
            d="M21 27q3 2.4 6 0"
            fill="none"
            stroke={INK}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'sun':
      return (
        <svg {...frame}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={24 + 13.5 * Math.cos(rad)}
                y1={24 + 13.5 * Math.sin(rad)}
                x2={24 + 18 * Math.cos(rad)}
                y2={24 + 18 * Math.sin(rad)}
                stroke={INK}
                strokeWidth={2.8}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={24} cy={24} r={10.5} fill="#f9df8a" stroke={INK} strokeWidth={2.6} />
          <circle cx={20.5} cy={22.5} r={1.5} fill={INK} />
          <circle cx={27.5} cy={22.5} r={1.5} fill={INK} />
          <path
            d="M20 27.5q4 3 8 0"
            fill="none"
            stroke={INK}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'star':
      return (
        <svg {...frame}>
          <path
            d="M24 7l4.9 10.4 11.4 1.3-8.5 7.7 2.3 11.2L24 31.9l-10.1 5.7 2.3-11.2-8.5-7.7 11.4-1.3z"
            fill="#cdbcf0"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <path
            d="M20 16l1.5 3.2 3.4.4-2.6 2.3.7 3.4-3-1.7-3 1.7.7-3.4-2.6-2.3 3.4-.4z"
            fill="#fffdf7"
            opacity={0.55}
          />
        </svg>
      );
    case 'heart':
      return (
        <svg {...frame}>
          <path
            d="M24 40C15 32 10 26.5 10 20c0-4.5 3.5-8 8-8 2.6 0 4.8 1.3 6 3.2 1.2-1.9 3.4-3.2 6-3.2 4.5 0 8 3.5 8 8 0 6.5-5 12-14 20z"
            fill="#f4a9c4"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <path
            d="M16 18.5c-1.2 1-2 2.4-2.2 4"
            fill="none"
            stroke="#fffdf7"
            strokeWidth={2.2}
            strokeLinecap="round"
            opacity={0.8}
          />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...frame}>
          <path
            d="M10 38C10 24 20 12 38 10c-2 18-12 28-28 28z"
            fill="#a9cfa4"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <path
            d="M10 38c6-12 14-20 24-24"
            fill="none"
            stroke={INK}
            strokeWidth={2.2}
            strokeLinecap="round"
            opacity={0.7}
          />
        </svg>
      );
    case 'mushroom':
      return (
        <svg {...frame}>
          <path
            d="M24 8C14 8 7 14.5 7 21c0 1.6 1.2 2.6 2.8 2.6h28.4c1.6 0 2.8-1 2.8-2.6C41 14.5 34 8 24 8z"
            fill="#ef8fb3"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <circle cx={17} cy={16} r={2.2} fill="#fffdf7" />
          <circle cx={30} cy={17.5} r={1.7} fill="#fffdf7" />
          <path
            d="M20 23.6h8l1.6 13.2c.2 1.6-1 3-2.6 3h-5.2c-1.6 0-2.8-1.4-2.6-3L20 23.6z"
            fill="#fff3d6"
            stroke={INK}
            strokeWidth={2.6}
            strokeLinejoin="round"
          />
          <circle cx={22} cy={31} r={1.4} fill={INK} />
          <circle cx={26.5} cy={31} r={1.4} fill={INK} />
          <path
            d="M22 35q2.2 1.8 4.4 0"
            fill="none"
            stroke={INK}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'rainbow':
      return (
        <svg {...frame}>
          <g fill="none" strokeLinecap="round">
            <path d="M8 34a16 16 0 0 1 32 0" stroke="#ef8fb3" strokeWidth={4.5} />
            <path d="M13 34a11 11 0 0 1 22 0" stroke="#f6d774" strokeWidth={4.5} />
            <path d="M18 34a6 6 0 0 1 12 0" stroke="#a9cfa4" strokeWidth={4.5} />
          </g>
          <ellipse cx={10} cy={35} rx={7} ry={5} fill="#fffdf7" stroke={INK} strokeWidth={2.4} />
          <ellipse cx={38} cy={35} rx={7} ry={5} fill="#fffdf7" stroke={INK} strokeWidth={2.4} />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Logika game                                                         */
/* ------------------------------------------------------------------ */

interface CardT {
  uid: number;
  kind: MotifKind;
}

type Phase = 'start' | 'playing' | 'won';

interface Best {
  moves: number;
  seconds: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: readonly T[], exclude?: T): T {
  let v = arr[Math.floor(Math.random() * arr.length)];
  let guard = 0;
  while (arr.length > 1 && v === exclude && guard++ < 10) {
    v = arr[Math.floor(Math.random() * arr.length)];
  }
  return v;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/** Godaan lembut Arsen tiap salah pasang — tanpa hukuman, cuma gemas. */
const TEASES = [
  'Hampir! Yang itu bukan pasangannya, tapi usahamu 100.',
  'Bukan yang itu... nggak apa-apa, yang penting happy.',
  'Arsen lihat kamu mikir keras. Lucu.',
  'Salah dikit nggak ngaruh, kamu tetap paling pinter.',
  'Hmm, bukan. Coba diinget-inget lagi, pelan-pelan.',
] as const;

/** Pesan Arsen di layar menang. */
const WIN_MSGS = [
  'Arsen kalah... eh, maksudnya kamu menang! Hebat banget.',
  'Livia menang! Arsen protes: kartunya pasti dikocok sambil merem.',
  'Ingatanmu sekuat ingatan Arsen soal tanggal jadian. (Dia hafal, tenang aja.)',
  'Resmi: kamu juara Pasangan Bunga sedunia. Hadiah: pelukan Arsen, berlaku selamanya.',
  'Cepet banget! Arsen baru mau nyontek, kamu udah menang duluan.',
] as const;

const FLIP_CSS = `
.mem-card { perspective: 700px; background: none; border: 0; padding: 0; cursor: pointer; }
.mem-card:disabled { cursor: default; }
.mem-inner { position: relative; display: block; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.45s cubic-bezier(0.34, 1.3, 0.64, 1); }
.mem-inner.is-up { transform: rotateY(180deg); }
.mem-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 1rem; }
.mem-front { transform: rotateY(180deg); }
.mem-inner.is-matched { animation: mem-pop 0.5s ease; }
@keyframes mem-pop {
  0% { transform: rotateY(180deg) scale(1); }
  40% { transform: rotateY(180deg) scale(1.14) rotate(2deg); }
  70% { transform: rotateY(180deg) scale(0.96); }
  100% { transform: rotateY(180deg) scale(1); }
}
`;

export default function Game() {
  const [phase, setPhase] = useState<Phase>('start');
  const [deck, setDeck] = useState<CardT[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tease, setTease] = useState<string>(TEASES[0]);
  const [winMsg, setWinMsg] = useState('');
  const [newBest, setNewBest] = useState(false);
  const [best, setBest] = useLocalStorage<Best | null>('alu:game-best', null);
  const lock = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  useEffect(() => {
    if (phase !== 'playing') return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const start = () => {
    sfx.click();
    const kinds = shuffle([...MOTIF_ORDER, ...MOTIF_ORDER]);
    setDeck(kinds.map((kind, i) => ({ uid: i, kind })));
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setNewBest(false);
    setTease(pick(TEASES));
    lock.current = false;
    setPhase('playing');
  };

  const flip = (uid: number) => {
    if (phase !== 'playing' || lock.current) return;
    if (open.includes(uid) || matched.includes(uid)) return;
    sfx.pop();

    if (open.length === 0) {
      setOpen([uid]);
      return;
    }

    const firstUid = open[0];
    const first = deck.find((c) => c.uid === firstUid);
    const second = deck.find((c) => c.uid === uid);
    if (!first || !second) return;

    const nextMoves = moves + 1;
    setMoves(nextMoves);
    setOpen([firstUid, uid]);

    if (first.kind === second.kind) {
      const nextMatched = [...matched, firstUid, uid];
      setMatched(nextMatched);
      setOpen([]);
      if (nextMatched.length === deck.length) {
        lock.current = true;
        setWinMsg(pick(WIN_MSGS));
        later(700, () => {
          sfx.tada();
          const isBetter =
            !best || nextMoves < best.moves || (nextMoves === best.moves && seconds < best.seconds);
          if (isBetter) {
            setBest({ moves: nextMoves, seconds });
            setNewBest(true);
          }
          setPhase('won');
          lock.current = false;
        });
      }
    } else {
      lock.current = true;
      setTease((t) => pick(TEASES, t));
      later(800, () => {
        setOpen([]);
        lock.current = false;
      });
    }
  };

  const stars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10">
      <style>{FLIP_CSS}</style>
      <SectionHeader
        title="Pasangan Bunga"
        subtitle="Cari 8 pasangan gambar yang sama. Santai aja, nggak ada hukuman."
        doodle="heart"
      />

      {phase === 'start' && (
        <PaperCard washi tilt={-1} className="text-center">
          <p className="font-hand text-ink-soft text-xl">Kenalan dulu sama gambarnya:</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {MOTIF_ORDER.map((k) => (
              <span
                key={k}
                title={MOTIF_LABEL[k]}
                className="border-ink bg-paper flex h-14 w-14 items-center justify-center rounded-2xl border-2"
              >
                <Motif kind={k} className="h-10 w-10" />
              </span>
            ))}
          </div>
          <ol className="text-ink-soft mx-auto mt-4 max-w-[30ch] list-decimal space-y-1 pl-6 text-left text-sm">
            <li>Ketuk kartu buat ngebalik, dua-dua.</li>
            <li>Yang gambarnya sama bakal kebuka terus.</li>
            <li>Selesaikan dengan langkah sesedikit mungkin!</li>
          </ol>
          {best ? (
            <p className="text-ink mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
              <Glyph kind="star" className="text-butter-400 h-5 w-5" />
              Rekor: {best.moves} langkah • {fmt(best.seconds)}
            </p>
          ) : (
            <p className="text-ink-faint mt-4 text-sm">
              Belum ada rekor. Jadilah legenda pertama!
            </p>
          )}
          <div className="mt-4">
            <StickerButton color="sage" onClick={start}>
              <Glyph kind="dice" className="h-6 w-6" />
              Mulai main
            </StickerButton>
          </div>
        </PaperCard>
      )}

      {phase === 'playing' && (
        <>
          <div className="mb-3 flex items-center justify-center gap-2">
            <Chip>
              <Glyph kind="dice" className="h-4 w-4" />
              {moves} langkah
            </Chip>
            <Chip>
              <Glyph kind="moon" className="h-4 w-4" />
              {fmt(seconds)}
            </Chip>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="papan permainan">
            {deck.map((card) => {
              const faceUp = open.includes(card.uid) || matched.includes(card.uid);
              const isMatched = matched.includes(card.uid);
              return (
                <button
                  key={card.uid}
                  type="button"
                  onClick={() => flip(card.uid)}
                  aria-label={faceUp ? `${MOTIF_LABEL[card.kind]}, terbuka` : 'kartu tertutup'}
                  className="mem-card aspect-square min-h-[56px] w-full touch-manipulation"
                >
                  <span
                    className={`mem-inner${faceUp ? ' is-up' : ''}${isMatched ? ' is-matched' : ''}`}
                  >
                    <span
                      className="mem-face border-ink bg-blush-200 border-[2.5px] shadow-[0_2px_0_#4a3b52]"
                      aria-hidden="true"
                    >
                      <Glyph kind="flower" className="text-blush-500 h-8 w-8" />
                    </span>
                    <span
                      className="mem-face mem-front border-ink bg-paper border-[2.5px] shadow-[0_2px_0_#4a3b52]"
                      aria-hidden="true"
                    >
                      <Motif kind={card.kind} className="h-3/5 w-3/5" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="font-hand text-ink-soft mt-4 text-center text-lg">
            {tease}
          </p>
        </>
      )}

      {phase === 'won' && (
        <PaperCard washi tilt={1} className="text-center">
          <div className="flex items-center justify-center gap-1" aria-label={`${stars} dari 3 bintang`}>
            {[0, 1, 2].map((i) => (
              <Glyph
                key={i}
                kind="star"
                className={`h-10 w-10 ${i < stars ? 'text-butter-400' : 'text-ink-faint'}`}
              />
            ))}
          </div>
          <h3 className="font-display text-ink mt-2 text-2xl font-bold">Kamu menang!</h3>
          <p className="font-hand text-ink-soft mt-2 text-xl">{winMsg}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Chip>{moves} langkah</Chip>
            <Chip>{fmt(seconds)}</Chip>
            {newBest && <Chip active>Rekor baru!</Chip>}
          </div>
          <div className="mt-5">
            <StickerButton color="sage" onClick={start}>
              <Glyph kind="refresh" className="h-6 w-6" />
              Main lagi
            </StickerButton>
          </div>
        </PaperCard>
      )}
    </div>
  );
}
