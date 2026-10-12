import { useCallback, useState } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* StickerButton — tombol chunky ala stiker, pakai .btn-sticker        */
/* ------------------------------------------------------------------ */

type StickerColor = 'blush' | 'lav' | 'butter' | 'peach' | 'sage';

const STICKER_BG: Record<StickerColor, string> = {
  blush: 'bg-blush-200',
  lav: 'bg-lav-200',
  butter: 'bg-butter-200',
  peach: 'bg-peach-200',
  sage: 'bg-sage-200',
};

interface StickerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: StickerColor;
  children: ReactNode;
}

export function StickerButton({
  color = 'blush',
  children,
  className = '',
  type = 'button',
  ...rest
}: StickerButtonProps) {
  return (
    <button
      type={type}
      className={`btn-sticker ${STICKER_BG[color]} text-ink inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 text-lg disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* PaperCard — kartu kertas organik, opsional selotip washi + miring    */
/* ------------------------------------------------------------------ */

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  /** Derajat kemiringan kartu, mis. -1.5 atau 2. */
  tilt?: number;
  /** Tampilkan strip washi tape di atas kartu. */
  washi?: boolean;
  style?: CSSProperties;
}

export function PaperCard({ children, className = '', tilt = 0, washi = false, style }: PaperCardProps) {
  return (
    <div
      className={`paper-card px-5 py-5 ${className}`}
      style={{ transform: tilt === 0 ? undefined : `rotate(${tilt}deg)`, ...style }}
    >
      {washi && <span className="washi" aria-hidden="true" />}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeader — judul tiap scene                                    */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  doodle?: DoodleKind;
}

export function SectionHeader({ title, subtitle, doodle = 'sparkle' }: SectionHeaderProps) {
  return (
    <div className="mb-4 text-center">
      <div className="mb-1 flex items-center justify-center gap-2">
        <Doodle kind={doodle} className="h-6 w-6 text-blush-500" />
        <h2 className="font-display text-ink text-3xl font-bold">{title}</h2>
        <Doodle kind={doodle} className="h-6 w-6 text-blush-500" />
      </div>
      {subtitle && <p className="text-ink-soft text-base">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chip — label pil mungil, bisa diklik                                */
/* ------------------------------------------------------------------ */

interface ChipProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  label?: string;
}

export function Chip({ children, className = '', onClick, active = false, label }: ChipProps) {
  const cls = `inline-flex items-center justify-center gap-1 rounded-full border-2 border-ink px-4 text-sm font-bold ${
    active ? 'bg-butter-200 text-ink' : 'bg-paper text-ink-soft'
  } ${className}`;
  if (onClick) {
    return (
      <button type="button" aria-label={label} onClick={onClick} className={`${cls} min-h-[44px]`}>
        {children}
      </button>
    );
  }
  return <span className={`${cls} min-h-[32px] py-1`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Doodle — coretan SVG mungil                                         */
/* ------------------------------------------------------------------ */

export type DoodleKind = 'star' | 'heart' | 'sparkle' | 'swirl';

interface DoodleProps {
  kind: DoodleKind;
  className?: string;
}

export function Doodle({ kind, className = 'h-5 w-5' }: DoodleProps) {
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
    case 'star':
      return (
        <svg {...common}>
          <path d="M12 3l2.5 6.2 6.5.4-5 4.2 1.6 6.4L12 16.7l-5.6 3.5L8 13.8l-5-4.2 6.5-.4z" fill="currentColor" stroke="none" opacity={0.85} />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20C7 15.5 4 12.3 4 8.8 4 6 6.2 4 8.8 4c1.4 0 2.6.7 3.2 1.7C12.6 4.7 13.8 4 15.2 4 17.8 4 20 6 20 8.8c0 3.5-3 6.7-8 11.2z" fill="currentColor" stroke="none" opacity={0.85} />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M12 2c.7 5.5 2.5 7.3 8 8-5.5.7-7.3 2.5-8 8-.7-5.5-2.5-7.3-8-8 5.5-.7 7.3-2.5 8-8z" fill="currentColor" stroke="none" opacity={0.9} />
          <path d="M19 4c.3 2.4 1.1 3.2 3.5 3.5-2.4.3-3.2 1.1-3.5 3.5-.3-2.4-1.1-3.2-3.5-3.5 2.4-.3 3.2-1.1 3.5-3.5z" fill="currentColor" stroke="none" opacity={0.6} />
        </svg>
      );
    case 'swirl':
      return (
        <svg {...common}>
          <path d="M4 14c2-6 6-9 10-8 3 .8 4.5 3.5 3.5 6-1 2.6-4.5 3.4-6.7 2-2-1.2-2.4-4-.8-5.6" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/* useLocalStorage — state yang nyangkut di localStorage                */
/* ------------------------------------------------------------------ */

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // penyimpanan penuh / diblokir — state tetap jalan di memori
        }
        return next;
      });
    },
    [key],
  );

  return [value, set] as const;
}

/* ------------------------------------------------------------------ */
/* EmptyNote — keadaan kosong yang tetap lucu                          */
/* ------------------------------------------------------------------ */

export function EmptyNote({ children }: { children?: ReactNode }) {
  return (
    <div className="doodle-frame flex flex-col items-center gap-2 px-6 py-10 text-center">
      <Doodle kind="swirl" className="text-ink-faint h-10 w-10" />
      <p className="font-hand text-ink-soft text-xl">{children ?? 'belum ada apa-apa di sini…'}</p>
    </div>
  );
}
