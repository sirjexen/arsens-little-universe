import { useRef, useState } from 'react';
import { METER_RESULTS } from '../content/content';
import { Arsen } from '../components/Arsen';
import {
  PaperCard,
  SectionHeader,
  StickerButton,
} from '../components/ui';
import { sfx } from '../lib/sound';

const NEEDLE_MS = 1200;
const TICKS = [-80, -60, -40, -20, 0, 20, 40, 60, 80];

function tickCoords(angleDeg: number): { x1: number; y1: number; x2: number; y2: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const cx = 100;
  const cy = 105;
  return {
    x1: cx + 62 * Math.sin(rad),
    y1: cy - 62 * Math.cos(rad),
    x2: cx + 74 * Math.sin(rad),
    y2: cy - 74 * Math.cos(rad),
  };
}

export default function Meteran() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [needleAngle, setNeedleAngle] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const timer = useRef<number | null>(null);

  function measure(): void {
    if (running) return;
    if (timer.current !== null) window.clearTimeout(timer.current);
    setRunning(true);
    setResult(null);
    sfx.pop();
    timer.current = window.setTimeout(() => {
      const idx = Math.floor(Math.random() * METER_RESULTS.length);
      setResult(METER_RESULTS[idx]);
      // Jarum berhenti di zona gemes–overload: 25° sampai 80°.
      setNeedleAngle(25 + (idx / Math.max(METER_RESULTS.length - 1, 1)) * 55);
      setRunning(false);
      setHasRun(true);
      sfx.tada();
      timer.current = null;
    }, NEEDLE_MS);
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-10">
      <SectionHeader
        title="Mesin Pengukur Kegemesan"
        subtitle="Kalibrasi ulang tiap kali kamu senyum."
      />

      <style>{`
        @keyframes alu-needle-wobble {
          0% { transform: rotate(-70deg); }
          100% { transform: rotate(70deg); }
        }
        .alu-needle-run {
          animation: alu-needle-wobble 0.28s ease-in-out infinite alternate;
        }
      `}</style>

      <PaperCard className="mt-6 px-5 py-6">
        <div className="washi" aria-hidden="true" />
        <div className="flex justify-center">
          <Arsen
            expression={running ? 'confused' : result ? 'proud' : 'happy'}
            size={96}
            className={running ? 'animate-wiggle' : 'animate-float'}
          />
        </div>

        {/* SVG gauge */}
        <svg
          viewBox="0 0 200 120"
          role="img"
          aria-label="Pengukur kegemesan"
          className="mx-auto mt-2 w-full max-w-[340px]"
        >
          {/* zone arcs */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="#c4ddb4"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="#ffe9a3"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="78.5 157"
            strokeDashoffset="-78.5"
            opacity="0.9"
          />
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="#f7a8c4"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="39.25 196.25"
            strokeDashoffset="-196.25"
            opacity="0.9"
          />
          {/* ticks */}
          {TICKS.map((t) => {
            const { x1, y1, x2, y2 } = tickCoords(t);
            return (
              <line
                key={t}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#4a3b52"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
          {/* zone labels */}
          <text x="22" y="118" fontSize="11" fill="#7d6c88" textAnchor="middle">
            biasa
          </text>
          <text x="100" y="30" fontSize="11" fill="#7d6c88" textAnchor="middle">
            gemes
          </text>
          <text x="178" y="118" fontSize="11" fill="#a94a72" textAnchor="middle" fontWeight="bold">
            OVERLOAD
          </text>
          {/* needle */}
          <g
            className={running ? 'alu-needle-run' : undefined}
            style={{
              transform: running ? undefined : `rotate(${needleAngle}deg)`,
              transformBox: 'fill-box',
              transformOrigin: '50% 92%',
              transition: running ? 'none' : 'transform 0.7s ease',
            }}
          >
            <line
              x1="100"
              y1="105"
              x2="100"
              y2="42"
              stroke="#a94a72"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          {/* hub */}
          <circle cx="100" cy="105" r="10" fill="#4a3b52" />
          <circle cx="100" cy="105" r="4" fill="#fff6e9" />
        </svg>

        {/* Result */}
        <div aria-live="polite" className="mt-2 min-h-[72px]">
          {result && !running && (
            <div key={result} className="animate-pop-in">
              <div className="doodle-frame bg-blush-100 px-4 py-3">
                <p className="font-hand text-2xl leading-snug text-ink">
                  {result}
                </p>
              </div>
            </div>
          )}
          {running && (
            <p className="font-hand pt-4 text-center text-2xl text-ink-soft">
              Mengukur kegemesan... sabar ya...
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <StickerButton
            onClick={measure}
            disabled={running}
            className="min-h-[56px] min-w-[220px] bg-lav-200 px-8 py-3 text-xl disabled:opacity-60"
          >
            {hasRun ? 'Ukur lagi! 🔬' : 'UKUR KEGEMESAN 🔬'}
          </StickerButton>
        </div>
      </PaperCard>

      <p className="font-hand mt-4 text-center text-xl text-ink-soft">
        hasil tidak valid secara ilmiah, tapi valid secara perasaan 💗
      </p>
    </div>
  );
}
