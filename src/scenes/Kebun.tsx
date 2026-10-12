// Kebun Livia: rawat bunga kesayangan.
// - Bunga besar di atas gundukan tanah, 5 aksi (siram/matahari/ngobrol/peluk/hias).
// - Tiap aksi: mood bunga + bubble kalimat random dari GARDEN (tanpa pengulangan
//   beruntun) + reaksi mini Arsen.
// - Dekorasi (jamur/batu/bendera/kumbang) mengelilingi gundukan, maks 6, tersimpan.
// - State tersimpan di localStorage 'alu:garden'.
// - 5x colek cepat pada bunga -> unlock('flower-power').

import { useEffect, useRef, useState } from 'react';
import { GARDEN } from '../content/content';
import Arsen, { type ArsenExpression } from '../components/Arsen';
import Bunga, { type BungaMood } from '../components/Bunga';
import { Glyph, type GlyphKind } from '../components/icons';
import { PaperCard, SectionHeader, StickerButton, useLocalStorage } from '../components/ui';
import { sfx } from '../lib/sound';
import { useEggs } from '../easter/eggs';

type GardenAction = 'water' | 'sun' | 'talk' | 'hug' | 'decorate';
type GardenBucket = 'water' | 'sun' | 'talk' | 'hug' | 'decorate' | 'idle';

interface GardenState {
  water: number;
  sun: number;
  hugs: number;
  talks: number;
  decor: string[];
}

interface DecorKind {
  id: string;
  icon: GlyphKind;
  label: string;
}

const DECOR_CYCLE: DecorKind[] = [
  { id: 'mushroom', icon: 'mushroom', label: 'jamur mungil' },
  { id: 'pebble', icon: 'pebble', label: 'batu kerikil' },
  { id: 'flag', icon: 'flag', label: 'bendera mini' },
  { id: 'ladybug', icon: 'ladybug', label: 'kumbang imut' },
];

const MAX_DECOR = 6;

// Titik-titik di sekitar gundukan tanah (persen dari area kebun).
const DECOR_SPOTS: { left: string; bottom: string }[] = [
  { left: '5%', bottom: '15%' },
  { left: '83%', bottom: '19%' },
  { left: '15%', bottom: '3%' },
  { left: '73%', bottom: '5%' },
  { left: '35%', bottom: '1%' },
  { left: '55%', bottom: '23%' },
];

const ACTIONS: { id: GardenAction; icon: GlyphKind; label: string; color: 'sage' | 'butter' | 'lav' | 'blush' | 'peach' }[] = [
  { id: 'water', icon: 'drop', label: 'Siram', color: 'sage' },
  { id: 'sun', icon: 'sun', label: 'Kasih matahari', color: 'butter' },
  { id: 'talk', icon: 'chat', label: 'Ajak ngobrol', color: 'lav' },
  { id: 'hug', icon: 'hug', label: 'Peluk', color: 'blush' },
  { id: 'decorate', icon: 'ribbon', label: 'Hias', color: 'peach' },
];

const ARSEN_REACT: Record<GardenAction, { expression: ArsenExpression; lines: string[] }> = {
  water: {
    expression: 'happy',
    lines: [
      'Tugas nyiram selesai! Bunganya seneng, Arsen juga seneng.',
      'Hidrasi itu penting. Buat bunga, maupun buat kamu. Minum gih.',
    ],
  },
  sun: {
    expression: 'happy',
    lines: [
      'Berjemur bareng bunga, gratis tanpa karcis.',
      'Mataharinya pas. Kayak senyummu: anget.',
    ],
  },
  talk: {
    expression: 'wise',
    lines: [
      'Bunganya dengerin curhatmu dengan khidmat. Pendengar terbaik sedunia.',
      'Obrolan berkualitas. Bunganya sampai melek.',
    ],
  },
  hug: {
    expression: 'love',
    lines: [
      'Aww. Pelukannya nyampe ke sini, anget.',
      'Bunganya resmi jadi anak kesayangan. Jangan bilang-bilang ke tanaman lain.',
    ],
  },
  decorate: {
    expression: 'proud',
    lines: [
      'Interior designer kebun: kamu. Klien: Livia. Rating: 5 bintang.',
      'Estetiknya naik 200%. Siap-siap masuk FYP kebun.',
    ],
  },
};

const FLOWER_CLICK_WINDOW_MS = 1500;
const FLOWER_CLICKS_NEEDED = 5;
const MOOD_REVERT_MS = 4000;
const IDLE_MS = 22000;

/** Ambil acak tanpa mengulang index terakhir (kalau cuma 1 item, ya itu-itu aja). */
function pickNoRepeat<T>(arr: readonly T[], lastIdx: number): { index: number; value: T } {
  let i = Math.floor(Math.random() * arr.length);
  if (arr.length > 1) {
    let guard = 0;
    while (i === lastIdx && guard < 12) {
      i = Math.floor(Math.random() * arr.length);
      guard += 1;
    }
  }
  return { index: i, value: arr[i] };
}

function isNight(): boolean {
  const hour = new Date().getHours();
  return hour >= 22 || hour < 6;
}

function baseMood(water: number): BungaMood {
  if (isNight()) return 'sleepy';
  if (water === 0) return 'thirsty';
  return 'happy';
}

/** Baca jumlah siraman tersimpan (buat mood awal yang bener). */
function readStoredWater(): number {
  try {
    const raw = window.localStorage.getItem('alu:garden');
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { water?: unknown };
    return typeof parsed.water === 'number' ? parsed.water : 0;
  } catch {
    return 0;
  }
}

function findDecor(id: string): DecorKind {
  return DECOR_CYCLE.find((d) => d.id === id) ?? DECOR_CYCLE[0];
}

export default function Kebun() {
  const [garden, setGarden] = useLocalStorage<GardenState>('alu:garden', {
    water: 0,
    sun: 0,
    hugs: 0,
    talks: 0,
    decor: [],
  });
  const { unlock } = useEggs();

  const [mood, setMood] = useState<BungaMood>(() => baseMood(readStoredWater()));
  const [line, setLine] = useState<{ key: number; text: string }>(() => {
    const { value } = pickNoRepeat(GARDEN.idle, -1);
    return { key: 0, text: value };
  });
  const [arsen, setArsen] = useState<{ expression: ArsenExpression; line: string; key: number }>({
    expression: 'happy',
    line: 'Halo! Arsen, asisten kebun magang. Bunganya udah disiram hari ini belum?',
    key: 0,
  });

  const gardenRef = useRef(garden);
  useEffect(() => {
    gardenRef.current = garden;
  }, [garden]);
  const lastLineIdx = useRef<Partial<Record<GardenBucket, number>>>({});
  const lastReactIdx = useRef<Partial<Record<GardenAction, number>>>({});
  const lineKey = useRef(0);
  const arsenKey = useRef(0);
  const revertTimer = useRef<number | null>(null);
  const flowerClicks = useRef<number[]>([]);
  const lastActionAt = useRef<number>(Date.now());
  const [wiggleKey, setWiggleKey] = useState(0);

  useEffect(
    () => () => {
      if (revertTimer.current !== null) window.clearTimeout(revertTimer.current);
    },
    [],
  );

  const say = (bucket: GardenBucket, suffix = '') => {
    const arr = GARDEN[bucket];
    const last = lastLineIdx.current[bucket] ?? -1;
    const { index, value } = pickNoRepeat(arr, last);
    lastLineIdx.current[bucket] = index;
    lineKey.current += 1;
    setLine({ key: lineKey.current, text: value + suffix });
  };

  const flashMood = (m: BungaMood) => {
    setMood(m);
    if (revertTimer.current !== null) window.clearTimeout(revertTimer.current);
    revertTimer.current = window.setTimeout(() => {
      setMood(baseMood(gardenRef.current.water));
    }, MOOD_REVERT_MS);
  };

  // Kalau lama nggak diapa-apain, bunganya ngelantur sendiri.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - lastActionAt.current > IDLE_MS) {
        say('idle');
        setMood(baseMood(gardenRef.current.water));
      }
    }, IDLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const doAction = (action: GardenAction) => {
    lastActionAt.current = Date.now();

    if (action === 'decorate') {
      sfx.tada();
      const prev = gardenRef.current;
      const nextKind =
        prev.decor.length === 0
          ? DECOR_CYCLE[0]
          : DECOR_CYCLE[
              (DECOR_CYCLE.findIndex((d) => d.id === prev.decor[prev.decor.length - 1]) + 1) %
                DECOR_CYCLE.length
            ];
      const wasFull = prev.decor.length >= MAX_DECOR;
      const nextDecor = [...prev.decor, nextKind.id];
      if (nextDecor.length > MAX_DECOR) nextDecor.shift(); // yang paling lama pindah pot
      const next: GardenState = { ...prev, decor: nextDecor };
      gardenRef.current = next;
      setGarden(next);
      say(
        'decorate',
        wasFull ? ` Yang paling lama (${findDecor(prev.decor[0]).label}) pindah ke pot sebelah biar muat.` : '',
      );
    } else {
      sfx.pop();
      const prev = gardenRef.current;
      const next: GardenState = { ...prev };
      if (action === 'water') next.water += 1;
      if (action === 'sun') next.sun += 1;
      if (action === 'talk') next.talks += 1;
      if (action === 'hug') next.hugs += 1;
      gardenRef.current = next;
      setGarden(next);
      say(action);
    }

    // Reaksi mini Arsen.
    const react = ARSEN_REACT[action];
    const last = lastReactIdx.current[action] ?? -1;
    const picked = pickNoRepeat(react.lines, last);
    lastReactIdx.current[action] = picked.index;
    arsenKey.current += 1;
    setArsen({ expression: react.expression, line: picked.value, key: arsenKey.current });

    // Mood bunga: malam -> tetap ngantuk; peluk -> love; kadang -> wow.
    if (isNight()) {
      flashMood('sleepy');
    } else if (action === 'hug') {
      flashMood('love');
    } else if (Math.random() < 0.15) {
      flashMood('wow');
    } else {
      flashMood('happy');
    }
  };

  const handleFlowerClick = () => {
    lastActionAt.current = Date.now();
    const now = Date.now();
    flowerClicks.current = [...flowerClicks.current.filter((t) => now - t < FLOWER_CLICK_WINDOW_MS), now];
    setWiggleKey((k) => k + 1);
    sfx.boing();
    if (flowerClicks.current.length >= FLOWER_CLICKS_NEEDED) {
      flowerClicks.current = [];
      unlock('flower-power');
      flashMood('wow');
      lineKey.current += 1;
      setLine({
        key: lineKey.current,
        text: 'Hihihi, geli! Jangan dicolek-colek terus... nanti bunganya makin sayang.',
      });
    }
  };

  const stats: { icon: GlyphKind; value: number; label: string }[] = [
    { icon: 'drop', value: garden.water, label: 'kali disiram' },
    { icon: 'sun', value: garden.sun, label: 'kali dijemur' },
    { icon: 'chat', value: garden.talks, label: 'kali ngobrol' },
    { icon: 'hug', value: garden.hugs, label: 'kali dipeluk' },
  ];

  return (
    <section aria-label="Kebun Livia" className="mx-auto w-full max-w-xl px-4 py-6">
      <SectionHeader
        title="Kebun Livia"
        subtitle="Rawat bunga kesayanganmu. Dia bengkok, tapi dia bahagia."
        doodle="heart"
      />

      <PaperCard className="mt-4 overflow-hidden">
        <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-b from-butter-100 via-cream to-sage-100 sm:h-96">
          {/* Matahari doodle */}
          <div
            aria-hidden="true"
            className="animate-spin-slow absolute right-6 top-6 h-14 w-14 rounded-full bg-butter-400/70"
          />
          {/* Awan */}
          <div aria-hidden="true" className="animate-drift absolute left-8 top-10 flex gap-1 opacity-80">
            <span className="h-6 w-10 rounded-full bg-white/90" />
            <span className="-ml-4 h-8 w-8 rounded-full bg-white/90" />
          </div>
          <div
            aria-hidden="true"
            className="animate-drift absolute right-16 top-24 flex gap-1 opacity-60"
            style={{ animationDelay: '-4s' }}
          >
            <span className="h-5 w-8 rounded-full bg-white/90" />
            <span className="-ml-3 h-6 w-6 rounded-full bg-white/90" />
          </div>

          {/* Bubble omongan bunga */}
          <div
            key={line.key}
            className="animate-pop-in absolute left-1/2 top-3 z-20 w-[88%] max-w-xs -translate-x-1/2"
          >
            <div className="rounded-2xl border-2 border-ink bg-paper px-4 py-2 text-center text-sm leading-snug text-ink shadow-sticker">
              {line.text}
            </div>
            <div aria-hidden="true" className="mx-auto h-3 w-3 rotate-45 border-b-2 border-r-2 border-ink bg-paper" />
          </div>

          {/* Gundukan tanah */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-28 w-[94%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#b07a4f] to-[#7c4f2e]"
          />
          {/* Rumput */}
          <div aria-hidden="true" className="absolute bottom-[4.5rem] left-[12%]">
            <Glyph kind="grass" className="h-8 w-8 text-sage-600" />
          </div>
          <div aria-hidden="true" className="absolute bottom-[5rem] right-[10%]">
            <Glyph kind="grass" className="h-8 w-8 text-sage-600" />
          </div>

          {/* Dekorasi mengelilingi gundukan */}
          {garden.decor.map((id, i) => {
            const item = findDecor(id);
            const spot = DECOR_SPOTS[i % DECOR_SPOTS.length];
            return (
              <span
                key={`${id}-${i}`}
                className="absolute z-10"
                style={{ left: spot.left, bottom: spot.bottom, rotate: `${((i * 37) % 25) - 12}deg` }}
              >
                <span role="img" aria-label={item.label} className="animate-pop-in block">
                  <Glyph kind={item.icon} className="block h-9 w-9" />
                </span>
              </span>
            );
          })}

          {/* Bunga — bisa dicolek (root SVG-nya bawa data-egg="flower") */}
          <button
            type="button"
            onClick={handleFlowerClick}
            aria-label="Colek Livia (colek 5x cepat ada kejutan)"
            className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 rounded-full p-2"
          >
            <span key={wiggleKey} className="animate-wiggle block">
              <Bunga mood={mood} size={140} />
            </span>
          </button>
        </div>
      </PaperCard>

      {/* Tombol aksi */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {ACTIONS.map((a) => (
          <StickerButton key={a.id} onClick={() => doAction(a.id)} color={a.color}>
            <Glyph kind={a.icon} className="h-6 w-6" />
            {a.label}
          </StickerButton>
        ))}
      </div>

      {/* Reaksi mini Arsen (root SVG-nya bawa data-egg="mascot" buat easter egg) */}
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-block shrink-0" title="Arsen si maskot">
          <Arsen expression={arsen.expression} size={64} />
        </span>
        <div key={arsen.key} className="animate-pop-in doodle-frame min-w-0 flex-1 bg-paper px-4 py-2">
          <p className="text-sm leading-snug text-ink">
            <span className="font-display font-bold">Arsen: </span>
            {arsen.line}
          </p>
        </div>
      </div>

      {/* Statistik kebun */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Statistik kebun">
        {stats.map((s) => (
          <span key={s.label} className="doodle-frame bg-paper px-3 py-1.5 text-xs text-ink-soft">
            <Glyph kind={s.icon} className="inline h-4 w-4 align-[-3px]" /> {s.value} <span className="sr-only">{s.label}</span>
          </span>
        ))}
        <span className="doodle-frame bg-paper px-3 py-1.5 text-xs text-ink-soft">
          <Glyph kind="ribbon" className="inline h-4 w-4 align-[-3px]" /> {garden.decor.length}/{MAX_DECOR} dekorasi
        </span>
      </div>
    </section>
  );
}
