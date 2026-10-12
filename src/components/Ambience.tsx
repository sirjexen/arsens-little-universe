// Ambience — environmental animation per letter atmosphere.
// Subtle, lightweight, pure CSS: drifting clouds + falling rain,
// floating petals + sun glow, or twinkling stars. aria-hidden,
// pointer-events-none. `still` renders the composed scene without motion
// (used by calm mode / reduced-motion).

import { Doodle } from './ui';
import { Glyph } from './icons';
import type { LetterAtmosphere } from '../content/content';

interface AmbienceProps {
  variant: LetterAtmosphere;
  still?: boolean;
}

function Rain() {
  return (
    <>
      <span className="absolute left-[6%] top-[4%]">
        <Glyph kind="cloud" className="h-14 w-14 text-lav-300/70 animate-drift" />
      </span>
      <span className="absolute right-[8%] top-[14%]">
        <Glyph kind="cloud" className="h-9 w-9 text-lav-200/70 animate-drift" />
      </span>
      {[10, 28, 46, 64, 82].map((left, i) => (
        <span
          key={i}
          className="absolute top-0 animate-rain-fall"
          style={{ left: `${left}%`, animationDelay: `${i * 0.7}s` }}
        >
          <Glyph kind="drop" className="h-4 w-4 text-lav-300/60" />
        </span>
      ))}
    </>
  );
}

function Sunset() {
  return (
    <>
      {/* hangat matahari */}
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,201,92,0.35) 0%, transparent 70%)' }}
      />
      {[8, 24, 48, 70, 88].map((left, i) => (
        <span
          key={i}
          className="absolute animate-petal-drift"
          style={{ left: `${left}%`, top: `${8 + (i % 3) * 22}%`, animationDelay: `${i * 1.3}s` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="8"
              fill={i % 2 === 0 ? '#f7a8c4' : '#ffcf9f'}
              opacity={0.75}
              stroke="#4a3b52"
              strokeWidth={1.4}
            />
          </svg>
        </span>
      ))}
    </>
  );
}

function Stars() {
  const items = [
    { left: '8%', top: '10%', cls: 'h-5 w-5 text-butter-400', delay: '0s' },
    { left: '24%', top: '26%', cls: 'h-4 w-4 text-lav-300', delay: '0.9s' },
    { left: '70%', top: '8%', cls: 'h-6 w-6 text-butter-400', delay: '1.7s' },
    { left: '86%', top: '30%', cls: 'h-4 w-4 text-blush-300', delay: '0.4s' },
    { left: '45%', top: '6%', cls: 'h-4 w-4 text-lav-500', delay: '2.2s' },
    { left: '58%', top: '22%', cls: 'h-5 w-5 text-peach-400', delay: '1.2s' },
  ];
  return (
    <>
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle"
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        >
          <Doodle kind={i % 2 === 0 ? 'sparkle' : 'star'} className={s.cls} />
        </span>
      ))}
    </>
  );
}

export default function Ambience({ variant, still = false }: AmbienceProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {still ? (
        <div className="absolute inset-0 opacity-60">
          {variant === 'rain' && (
            <Glyph kind="cloud" className="absolute left-[6%] top-[4%] h-14 w-14 text-lav-300/50" />
          )}
          {variant === 'sunset' && (
            <span
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,201,92,0.25) 0%, transparent 70%)' }}
            />
          )}
          {variant === 'stars' && (
            <Doodle kind="sparkle" className="absolute left-[8%] top-[10%] h-5 w-5 text-butter-400/70" />
          )}
        </div>
      ) : variant === 'rain' ? (
        <Rain />
      ) : variant === 'sunset' ? (
        <Sunset />
      ) : (
        <Stars />
      )}
    </div>
  );
}
