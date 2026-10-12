// Maskot "Arsen": blob peachy mungil, jambul tiga helai, agak usil.
// Root SVG membawa data-egg="mascot" — dipakai sistem easter egg.

export type ArsenExpression =
  | 'happy'
  | 'confused'
  | 'wise'
  | 'cry'
  | 'blush'
  | 'sleepy'
  | 'panic'
  | 'proud'
  | 'love';

interface ArsenProps {
  expression?: ArsenExpression;
  size?: number;
  className?: string;
}

const INK = '#4a3b52';
const SKIN = '#ffcf9f';
const SKIN_LIGHT = '#ffe4cd';
const BLUSH = '#f7a8c4';
const MOUTH_DARK = '#8e4a63';
const TEAR_BLUE = '#9fd4f5';

function heartPath(cx: number, cy: number, s: number): string {
  return (
    `M${cx} ${cy + s * 0.9} ` +
    `C${cx - s * 1.4} ${cy + s * 0.1} ${cx - s} ${cy - s * 0.8} ${cx - s * 0.42} ${cy - s * 0.45} ` +
    `C${cx - s * 0.12} ${cy - s * 0.28} ${cx} ${cy - s * 0.02} ${cx} ${cy + s * 0.22} ` +
    `C${cx} ${cy - s * 0.02} ${cx + s * 0.12} ${cy - s * 0.28} ${cx + s * 0.42} ${cy - s * 0.45} ` +
    `C${cx + s} ${cy - s * 0.8} ${cx + s * 1.4} ${cy + s * 0.1} ${cx} ${cy + s * 0.9} Z`
  );
}

function Tear({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y} C${x - 4 * s} ${y + 6 * s} ${x - 5.5 * s} ${y + 9 * s} ${x - 5.5 * s} ${y + 11.5 * s} a${5.5 * s} ${5.5 * s} 0 0 0 ${11 * s} 0 C${x + 5.5 * s} ${y + 9 * s} ${x + 4 * s} ${y + 6 * s} ${x} ${y} Z`}
      fill={TEAR_BLUE}
      stroke={INK}
      strokeWidth={1.8}
    />
  );
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y - 8 * s} Q${x + 2 * s} ${y - 2 * s} ${x + 8 * s} ${y} Q${x + 2 * s} ${y + 2 * s} ${x} ${y + 8 * s} Q${x - 2 * s} ${y + 2 * s} ${x - 8 * s} ${y} Q${x - 2 * s} ${y - 2 * s} ${x} ${y - 8 * s} Z`}
      fill="#f5c95c"
      stroke={INK}
      strokeWidth={1.5}
    />
  );
}

const EYE_LINE = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round' } as const;

function Face({ expression }: { expression: ArsenExpression }) {
  switch (expression) {
    case 'happy':
      return (
        <>
          <path d="M42 62 q6 -8 12 0" {...EYE_LINE} />
          <path d="M66 62 q6 -8 12 0" {...EYE_LINE} />
          <ellipse cx={60} cy={79} rx={9} ry={7.5} fill={MOUTH_DARK} stroke={INK} strokeWidth={2.5} />
          <ellipse cx={60} cy={82} rx={4.5} ry={3} fill="#e89bb8" />
          <ellipse cx={38} cy={72} rx={6} ry={4} fill={BLUSH} opacity={0.7} />
          <ellipse cx={82} cy={72} rx={6} ry={4} fill={BLUSH} opacity={0.7} />
        </>
      );
    case 'confused':
      return (
        <>
          <circle cx={48} cy={60} r={4} fill={INK} />
          <circle cx={72} cy={60} r={4} fill={INK} />
          <path d="M40 49 l15 4" {...EYE_LINE} />
          <path d="M65 52 l15 -4" {...EYE_LINE} />
          <path d="M52 77 q4 -4 8 0 q4 4 8 0" {...EYE_LINE} strokeWidth={2.5} />
          <text x={94} y={38} fontSize={26} fontWeight={800} fill="#8f76cc" fontFamily="Caveat, cursive">
            ?
          </text>
        </>
      );
    case 'wise':
      return (
        <>
          <circle cx={48} cy={60} r={3.5} fill={INK} />
          <circle cx={72} cy={60} r={3.5} fill={INK} />
          <circle cx={48} cy={60} r={10.5} fill="none" stroke={INK} strokeWidth={2.5} />
          <circle cx={72} cy={60} r={10.5} fill="none" stroke={INK} strokeWidth={2.5} />
          <path d="M58.5 60 h3" stroke={INK} strokeWidth={2.5} />
          <path d="M37.5 58 L30 54" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
          <path d="M82.5 58 L90 54" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
          <path d="M52 77 q8 6 16 0" {...EYE_LINE} strokeWidth={2.5} />
        </>
      );
    case 'cry':
      return (
        <>
          <path d="M42 59 q6 6 12 0" {...EYE_LINE} />
          <path d="M66 59 q6 6 12 0" {...EYE_LINE} />
          <Tear x={44} y={67} />
          <Tear x={76} y={67} />
          <Tear x={28} y={78} s={0.65} />
          <Tear x={92} y={78} s={0.65} />
          <ellipse cx={60} cy={81} rx={8} ry={10} fill={MOUTH_DARK} stroke={INK} strokeWidth={2.5} />
          <ellipse cx={60} cy={85} rx={4} ry={3.5} fill="#e89bb8" />
        </>
      );
    case 'blush':
      return (
        <>
          <path d="M42 62 q6 -8 12 0" {...EYE_LINE} />
          <path d="M66 62 q6 -8 12 0" {...EYE_LINE} />
          <path d="M53 75 q7 6 14 0" {...EYE_LINE} strokeWidth={2.5} />
          <ellipse cx={35} cy={71} rx={9} ry={6} fill={BLUSH} opacity={0.9} />
          <ellipse cx={85} cy={71} rx={9} ry={6} fill={BLUSH} opacity={0.9} />
          <path d={heartPath(60, 20, 6)} fill="#e0709c" />
        </>
      );
    case 'sleepy':
      return (
        <>
          <path d="M42 62 h12" {...EYE_LINE} />
          <path d="M66 62 h12" {...EYE_LINE} />
          <circle cx={60} cy={78} r={3.2} fill="none" stroke={INK} strokeWidth={2.5} />
          <path d="M42 40 Q58 16 84 24 L78 4 Q60 6 46 30 Z" fill="#b9a3e8" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <circle cx={79} cy={6} r={5} fill="#fffdf7" stroke={INK} strokeWidth={2.5} />
          <path d="M40 42 Q62 34 84 40" fill="none" stroke={INK} strokeWidth={2.5} />
          <text x={94} y={26} fontSize={17} fontWeight={700} fill="#8f76cc" fontFamily="Caveat, cursive">
            Z
          </text>
          <text x={103} y={13} fontSize={12} fontWeight={700} fill="#8f76cc" fontFamily="Caveat, cursive">
            z
          </text>
        </>
      );
    case 'panic':
      return (
        <>
          <path d="M40 46 q8 -5 16 -2" {...EYE_LINE} strokeWidth={2.5} />
          <path d="M64 44 q8 -3 16 2" {...EYE_LINE} strokeWidth={2.5} />
          <circle cx={48} cy={59} r={6} fill="#fffdf7" stroke={INK} strokeWidth={2.5} />
          <circle cx={72} cy={59} r={6} fill="#fffdf7" stroke={INK} strokeWidth={2.5} />
          <circle cx={50} cy={57} r={2} fill={INK} />
          <circle cx={74} cy={57} r={2} fill={INK} />
          <ellipse cx={60} cy={79} rx={5.5} ry={7} fill={MOUTH_DARK} stroke={INK} strokeWidth={2.5} />
          <Tear x={22} y={38} s={0.9} />
          <Tear x={98} y={38} s={0.9} />
        </>
      );
    case 'proud':
      return (
        <>
          <circle cx={48} cy={60} r={4} fill={INK} />
          <path d="M66 60 h12" {...EYE_LINE} />
          <path d="M50 76 q10 9 20 1" {...EYE_LINE} />
          <ellipse cx={84} cy={70} rx={5} ry={3.5} fill={BLUSH} opacity={0.6} />
          <Sparkle x={94} y={30} />
          <Sparkle x={26} y={26} s={0.65} />
        </>
      );
    case 'love':
      return (
        <>
          <path d={heartPath(48, 57, 9)} fill="#e0709c" stroke={INK} strokeWidth={2} />
          <path d={heartPath(72, 57, 9)} fill="#e0709c" stroke={INK} strokeWidth={2} />
          <ellipse cx={60} cy={79} rx={9} ry={7.5} fill={MOUTH_DARK} stroke={INK} strokeWidth={2.5} />
          <ellipse cx={60} cy={82} rx={4.5} ry={3} fill="#e89bb8" />
          <ellipse cx={38} cy={72} rx={6} ry={4} fill={BLUSH} opacity={0.8} />
          <ellipse cx={82} cy={72} rx={6} ry={4} fill={BLUSH} opacity={0.8} />
        </>
      );
  }
}

export function Arsen({ expression = 'happy', size = 96, className = '' }: ArsenProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      data-egg="mascot"
      role="img"
      aria-label={`Arsen si maskot, ekspresi ${expression}`}
    >
      {/* kaki mungil */}
      <ellipse cx={47} cy={99} rx={9} ry={5.5} fill={SKIN} stroke={INK} strokeWidth={2.5} />
      <ellipse cx={73} cy={99} rx={9} ry={5.5} fill={SKIN} stroke={INK} strokeWidth={2.5} />
      {/* badan blob */}
      <ellipse cx={60} cy={68} rx={36} ry={32} fill={SKIN} stroke={INK} strokeWidth={3} />
      <ellipse cx={60} cy={80} rx={20} ry={13} fill={SKIN_LIGHT} opacity={0.9} />
      {/* jambul */}
      <path d="M50 38 q0 -12 8 -13" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M60 36 q2 -14 10 -12" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M70 38 q5 -10 12 -8" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {/* wajah sesuai ekspresi */}
      <Face expression={expression} />
    </svg>
  );
}

// Default exports for convenience (named exports above are canonical).
export default Arsen;
