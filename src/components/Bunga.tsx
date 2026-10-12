// "Bunga Bengkok": bunga bertangkai bengkok yang disengaja,
// kelopak pink merona, wajah imut, dan daun mungil.
// Root SVG membawa data-egg="flower" — dipakai sistem easter egg.

export type BungaMood = 'happy' | 'sleepy' | 'thirsty' | 'love' | 'wow';

interface BungaProps {
  mood?: BungaMood;
  size?: number;
  className?: string;
}

const INK = '#4a3b52';
const PETAL = '#ffc9da';
const PETAL_DEEP = '#f7a8c4';
const CENTER = '#fff3cf';
const BLUSH = '#f7a8c4';
const MOUTH_DARK = '#8e4a63';
const LEAF = '#93b982';
const STEM = '#5f8a52';
const PEACH_LIGHT = '#ffe4cd';

// Kepala bunga — dipakai untuk memutar kelopak & menaruh wajah.
const HX = 78;
const HY = 38;

function heartPath(cx: number, cy: number, s: number): string {
  return (
    `M${cx} ${cy + s * 0.9} ` +
    `C${cx - s * 1.4} ${cy + s * 0.1} ${cx - s} ${cy - s * 0.8} ${cx - s * 0.42} ${cy - s * 0.45} ` +
    `C${cx - s * 0.12} ${cy - s * 0.28} ${cx} ${cy - s * 0.02} ${cx} ${cy + s * 0.22} ` +
    `C${cx} ${cy - s * 0.02} ${cx + s * 0.12} ${cy - s * 0.28} ${cx + s * 0.42} ${cy - s * 0.45} ` +
    `C${cx + s} ${cy - s * 0.8} ${cx + s * 1.4} ${cy + s * 0.1} ${cx} ${cy + s * 0.9} Z`
  );
}

function Drop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y} C${x - 4 * s} ${y + 6 * s} ${x - 5.5 * s} ${y + 9 * s} ${x - 5.5 * s} ${y + 11.5 * s} a${5.5 * s} ${5.5 * s} 0 0 0 ${11 * s} 0 C${x + 5.5 * s} ${y + 9 * s} ${x + 4 * s} ${y + 6 * s} ${x} ${y} Z`}
      fill="#9fd4f5"
      stroke={INK}
      strokeWidth={1.8}
    />
  );
}

const LINE = { fill: 'none', stroke: INK, strokeWidth: 2.5, strokeLinecap: 'round' } as const;

function Face({ mood }: { mood: BungaMood }) {
  switch (mood) {
    case 'happy':
      return (
        <>
          <path d="M69 36 q4 -5.5 8 0" {...LINE} />
          <path d="M79 36 q4 -5.5 8 0" {...LINE} />
          <path d="M72 43 q6 5 12 0" {...LINE} />
          <ellipse cx={69} cy={42} rx={3} ry={2} fill={BLUSH} opacity={0.8} />
          <ellipse cx={87} cy={42} rx={3} ry={2} fill={BLUSH} opacity={0.8} />
        </>
      );
    case 'sleepy':
      return (
        <>
          <path d="M69 37 h8" {...LINE} />
          <path d="M79 37 h8" {...LINE} />
          <circle cx={78} cy={44} r={2.5} fill="none" stroke={INK} strokeWidth={2} />
          <text x={95} y={24} fontSize={15} fontWeight={700} fill="#8f76cc" fontFamily="Caveat, cursive">
            z
          </text>
          <text x={102} y={12} fontSize={11} fontWeight={700} fill="#8f76cc" fontFamily="Caveat, cursive">
            z
          </text>
        </>
      );
    case 'thirsty':
      return (
        <>
          <path d="M69 34 h8" {...LINE} strokeWidth={2} />
          <path d="M79 34 h8" {...LINE} strokeWidth={2} />
          <circle cx={73} cy={38.5} r={2} fill={INK} />
          <circle cx={83} cy={38.5} r={2} fill={INK} />
          <path d="M72 45 q3 -2.5 6 0 q3 2.5 6 0" {...LINE} strokeWidth={2} />
          <Drop x={99} y={24} s={0.8} />
        </>
      );
    case 'love':
      return (
        <>
          <path d={heartPath(73, 35, 6)} fill="#e0709c" stroke={INK} strokeWidth={1.5} />
          <path d={heartPath(83, 35, 6)} fill="#e0709c" stroke={INK} strokeWidth={1.5} />
          <path d="M72 43 q6 5 12 0" {...LINE} />
          <ellipse cx={69} cy={42} rx={3} ry={2} fill={BLUSH} opacity={0.9} />
          <ellipse cx={87} cy={42} rx={3} ry={2} fill={BLUSH} opacity={0.9} />
        </>
      );
    case 'wow':
      return (
        <>
          <circle cx={73} cy={35} r={4.5} fill="#fffdf7" stroke={INK} strokeWidth={2} />
          <circle cx={83} cy={35} r={4.5} fill="#fffdf7" stroke={INK} strokeWidth={2} />
          <circle cx={73} cy={35.5} r={2} fill={INK} />
          <circle cx={83} cy={35.5} r={2} fill={INK} />
          <ellipse cx={78} cy={44} rx={3.5} ry={4.5} fill={MOUTH_DARK} stroke={INK} strokeWidth={2} />
        </>
      );
  }
}

export function Bunga({ mood = 'happy', size = 96, className = '' }: BungaProps) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={className}
      data-egg="flower"
      role="img"
      aria-label={`Bunga Bengkok, mood ${mood}`}
    >
      {/* pot mungil */}
      <path d="M42 120 h36 l-6 24 h-24 Z" fill="#f0a06a" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={36} y={108} width={48} height={13} rx={6.5} fill={PEACH_LIGHT} stroke={INK} strokeWidth={3} />
      {/* tangkai yang (disengaja) bengkok */}
      <path
        d="M60 110 C58 94 74 88 70 70 C67 58 76 52 78 46"
        fill="none"
        stroke={STEM}
        strokeWidth={6}
        strokeLinecap="round"
      />
      {/* daun = tangan mungil */}
      <path d="M59 92 q-18 -2 -24 -18 q18 -2 24 18 Z" fill={LEAF} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M66 78 q18 -4 22 -20 q-16 0 -22 20 Z" fill={LEAF} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      {/* kelopak */}
      {petals.map((a, i) => (
        <ellipse
          key={a}
          cx={HX}
          cy={HY - 16}
          rx={9.5}
          ry={16}
          transform={`rotate(${a} ${HX} ${HY})`}
          fill={i % 2 === 0 ? PETAL : PETAL_DEEP}
          opacity={i % 2 === 0 ? 1 : 0.75}
          stroke={INK}
          strokeWidth={2.5}
        />
      ))}
      {/* wajah */}
      <circle cx={HX} cy={HY} r={12} fill={CENTER} stroke={INK} strokeWidth={2.5} />
      <Face mood={mood} />
    </svg>
  );
}

export default Bunga;
