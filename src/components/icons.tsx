// Glyph — consistent minimal SVG icon system for "Arsen's Little Universe".
// Replaces ALL emoji used in UI: every glyph is stroke-based (2px, round),
// 24x24 viewBox, currentColor, matching the hand-drawn Doodle aesthetic.
// Colored garden-decor glyphs (mushroom/pebble/flag/ladybug) carry their own
// fills. Usage: <Glyph kind="drop" className="h-6 w-6 text-sage-600" />

export type GlyphKind =
  | 'chat'
  | 'bell'
  | 'sprout'
  | 'envelope'
  | 'heart'
  | 'volume'
  | 'volume-off'
  | 'drop'
  | 'sun'
  | 'hug'
  | 'ribbon'
  | 'dice'
  | 'refresh'
  | 'copy'
  | 'check'
  | 'sparkle'
  | 'star'
  | 'moon'
  | 'cloud'
  | 'spiral'
  | 'tear'
  | 'leaf'
  | 'gauge'
  | 'paw'
  | 'flower'
  | 'mushroom'
  | 'pebble'
  | 'flag'
  | 'ladybug'
  | 'grass'
  | 'laugh';

interface GlyphProps {
  kind: GlyphKind;
  className?: string;
}

const INK = '#4a3b52';

export function Glyph({ kind, className = 'h-6 w-6' }: GlyphProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (kind) {
    case 'chat':
      return (
        <svg {...common}>
          <path d="M4 6.5C4 4 6.2 3 9 3h6c2.8 0 5 1 5 3.5v6c0 2.5-2.2 3.5-5 3.5h-4.2L7 19.5v-3.6c-1.8-.4-3-1.4-3-3.4v-6z" />
          <path d="M9 8.5h6M9 11.5h4" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 16v-5.5C6 7 8.6 4.5 12 4.5s6 2.5 6 6.5V16l1.8 2.8H4.2L6 16z" />
          <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case 'sprout':
      return (
        <svg {...common}>
          <path d="M12 21v-8" />
          <path d="M12 13C12 9 9 6.5 4.5 6.5c0 4.5 3 7 7.5 7z" />
          <path d="M12 11c0-3.5 2.5-5.5 7.5-5.5 0 3.8-2.8 6-7.5 6z" />
        </svg>
      );
    case 'envelope':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M3.5 7.5L12 13l8.5-5.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path
            d="M12 20C7 15.5 4 12.3 4 8.8 4 6 6.2 4 8.8 4c1.4 0 2.6.7 3.2 1.7.6-1 1.8-1.7 3.2-1.7 2.6 0 4.8 2 4.8 4.8 0 3.5-3 6.7-8 11.2z"
            fill="currentColor"
            stroke="none"
            opacity={0.9}
          />
        </svg>
      );
    case 'volume':
      return (
        <svg {...common}>
          <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" stroke="none" opacity={0.9} />
          <path d="M15 9.5a4 4 0 0 1 0 5M17.5 7.5a7.5 7.5 0 0 1 0 9" />
        </svg>
      );
    case 'volume-off':
      return (
        <svg {...common}>
          <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" stroke="none" opacity={0.9} />
          <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" />
        </svg>
      );
    case 'drop':
      return (
        <svg {...common}>
          <path d="M12 3.5c3.5 4.2 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.5-6.8 6-11z" />
          <path d="M9.5 14.5a2.8 2.8 0 0 0 2.2 2.6" opacity={0.6} />
        </svg>
      );
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2L17 7M7 17l-1.8 1.8" />
        </svg>
      );
    case 'hug':
      return (
        <svg {...common}>
          <path
            d="M12 19.5C8 15.8 5.5 13 5.5 10 5.5 8 7 6.5 8.9 6.5c1 0 2 .5 2.6 1.2.2-.9 1-2 2.5-2.7"
            opacity={0.9}
          />
          <path d="M3.5 12.5C2 10 2.5 7 4.5 5.5M20.5 12.5c1.5-2.5 1-5.5-1-7" />
          <path
            d="M12 19.5c.6-.5 1.2-1 1.8-1.6"
            opacity={0.9}
          />
        </svg>
      );
    case 'ribbon':
      return (
        <svg {...common}>
          <path d="M12 8L4 4.5 5.5 12 4 19.5 12 16l8 3.5L18.5 12 20 4.5 12 8z" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'dice':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="15" cy="15" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="15" cy="9" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 1 1-2.5-5.8" />
          <path d="M20 3.5V8h-4.5" />
        </svg>
      );
    case 'copy':
      return (
        <svg {...common}>
          <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
          <path d="M15.5 5.5v-1a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M4.5 12.5l5 5 10-11" strokeWidth={2.6} />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path
            d="M12 2c.7 5.5 2.5 7.3 8 8-5.5.7-7.3 2.5-8 8-.7-5.5-2.5-7.3-8-8 5.5-.7 7.3-2.5 8-8z"
            fill="currentColor"
            stroke="none"
            opacity={0.9}
          />
          <path
            d="M19 4c.3 2.4 1.1 3.2 3.5 3.5-2.4.3-3.2 1.1-3.5 3.5-.3-2.4-1.1-3.2-3.5-3.5 2.4-.3 3.2-1.1 3.5-3.5z"
            fill="currentColor"
            stroke="none"
            opacity={0.6}
          />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path
            d="M12 3l2.5 6.2 6.5.4-5 4.2 1.6 6.4L12 16.7l-5.6 3.5L8 13.8l-5-4.2 6.5-.4z"
            fill="currentColor"
            stroke="none"
            opacity={0.9}
          />
        </svg>
      );
    case 'moon':
      return (
        <svg {...common}>
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.7a4.8 4.8 0 0 1-.5 9.8H7z" />
          <path d="M9.5 12.5h.01M14.5 12.5h.01" strokeWidth={2.6} />
        </svg>
      );
    case 'spiral':
      return (
        <svg {...common}>
          <path d="M4 14c2-6 6-9 10-8 3 .8 4.5 3.5 3.5 6-1 2.6-4.5 3.4-6.7 2-2-1.2-2.4-4-.8-5.6" />
        </svg>
      );
    case 'tear':
      return (
        <svg {...common}>
          <path d="M12 4c2.8 3.6 4.8 6.4 4.8 9.2a4.8 4.8 0 0 1-9.6 0C7.2 10.4 9.2 7.6 12 4z" />
          <path d="M15.5 5.5c.8.3 1.4 1 1.6 1.9" opacity={0.6} />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z" />
          <path d="M5 19c3-6 7-10 12-12" opacity={0.6} />
        </svg>
      );
    case 'gauge':
      return (
        <svg {...common}>
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M12 19L16.5 11" strokeWidth={2.6} />
          <circle cx="12" cy="19" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'paw':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="15.5" rx="3.6" ry="3" fill="currentColor" stroke="none" opacity={0.9} />
          <circle cx="6.8" cy="10.5" r="1.7" fill="currentColor" stroke="none" opacity={0.9} />
          <circle cx="12" cy="8.5" r="1.7" fill="currentColor" stroke="none" opacity={0.9} />
          <circle cx="17.2" cy="10.5" r="1.7" fill="currentColor" stroke="none" opacity={0.9} />
        </svg>
      );
    case 'flower':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" opacity={0.9} />
          <path d="M12 9.4C10.6 7 10.8 4.8 12 3.5c1.2 1.3 1.4 3.5 0 5.9z" />
          <path d="M14.4 10.9c2.6-.6 4.7.2 5.6 1.6-1.4 1-3.6.9-5.6-1.6z" />
          <path d="M13.4 14.2c1.2 2.4.9 4.6-.3 5.8-1.2-1.2-1.5-3.4.3-5.8z" />
          <path d="M10.6 14.2c-1.2 2.4-.9 4.6.3 5.8 1.2-1.2 1.5-3.4-.3-5.8z" />
          <path d="M9.6 10.9c-2.6-.6-4.7.2-5.6 1.6 1.4 1 3.6.9 5.6-1.6z" />
        </svg>
      );
    case 'mushroom':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 3.5C6.5 3.5 3 7 3 10.5c0 1 .8 1.5 1.8 1.5h14.4c1 0 1.8-.5 1.8-1.5C21 7 17.5 3.5 12 3.5z"
            fill="#e0709c"
            stroke={INK}
            strokeWidth={1.8}
          />
          <circle cx="9" cy="7.5" r="1.3" fill="#fffdf7" />
          <circle cx="14.5" cy="8.5" r="1" fill="#fffdf7" />
          <path
            d="M10 12h4l1 7.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5L10 12z"
            fill="#fff3cf"
            stroke={INK}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'pebble':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M4 15c0-4 4-8 8.5-8 4 0 7.5 3 7.5 6.5 0 3-3 5.5-8 5.5S4 18 4 15z"
            fill="#cfc4d8"
            stroke={INK}
            strokeWidth={1.8}
          />
          <path d="M9 12.5c1-1.5 3-2.5 5-2.5" stroke="#fffdf7" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      );
    case 'flag':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M6 21V4" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
          <path
            d="M6 4.5h11l-3 4 3 4H6z"
            fill="#f0a06a"
            stroke={INK}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'ladybug':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="13" r="7.5" fill="#e0709c" stroke={INK} strokeWidth={1.8} />
          <path d="M12 5.5v15" stroke={INK} strokeWidth={1.8} />
          <circle cx="12" cy="5" r="2.6" fill={INK} />
          <circle cx="8.5" cy="11" r="1.3" fill={INK} />
          <circle cx="15.5" cy="11" r="1.3" fill={INK} />
          <circle cx="9" cy="16" r="1.3" fill={INK} />
          <circle cx="15" cy="16" r="1.3" fill={INK} />
        </svg>
      );
    case 'grass':
      return (
        <svg {...common}>
          <path d="M5 20c0-5 1-9 3-12-.3 4 .3 8 1.5 12M12 20c-.5-6 0-11 2-15 .2 5 0 10-1 15M18.5 20c.5-4 1.5-7 3.5-9.5-.5 3.5-1 6.5-2 9.5" />
        </svg>
      );
    case 'laugh':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 10.5q1.2-1.8 2.5 0M13.5 10.5q1.2-1.8 2.5 0" />
          <path d="M8 14q4 4.5 8 0" />
        </svg>
      );
  }
}

export default Glyph;
