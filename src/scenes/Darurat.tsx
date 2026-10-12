import { useEffect, useRef, useState } from 'react';
import { EMERGENCY } from '../content/content';
import { Arsen } from '../components/Arsen';
import {
  PaperCard,
  SectionHeader,
  StickerButton,
  useLocalStorage,
} from '../components/ui';
import { sfx } from '../lib/sound';

type Phase = 'idle' | 'alerts' | 'comfort';

const COUNT_KEY = 'alu:emergency-count';
const ALERT_STEP_MS = 650;

function counterJoke(n: number): string {
  if (n === 1)
    return 'Darurat pertama hari ini. Masih wajar, masih dalam batas normal (kata Arsen).';
  if (n === 2)
    return 'Darurat ke-2. Arsen mulai curiga kamu cuma pengen mainin tombolnya.';
  if (n === 3)
    return 'Ini darurat ke-3 hari ini. Arsen bangga sekaligus khawatir.';
  if (n <= 5)
    return `Darurat ke-${n}. Tim medis fiktif mulai kehabisan akal.`;
  if (n <= 9)
    return `Darurat ke-${n}. Arsen resmi mengangkatmu jadi Kepala Divisi Kangen.`;
  return `Darurat ke-${n}! Rekor kangen tidak resmi telah dipecahkan. Arsen pasrah.`;
}

export default function Darurat() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [visibleAlerts, setVisibleAlerts] = useState(0);
  const [comfort, setComfort] = useState('');
  const [mascotLine, setMascotLine] = useState('');
  const [pressCount, setPressCount] = useLocalStorage<number>(COUNT_KEY, 0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  function clearTimers(): void {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  function startEmergency(): void {
    clearTimers();
    const nextCount = pressCount + 1;
    setPressCount(nextCount);
    setComfort(
      EMERGENCY.comforts[Math.floor(Math.random() * EMERGENCY.comforts.length)],
    );
    setMascotLine(
      EMERGENCY.mascotLines[
        Math.floor(Math.random() * EMERGENCY.mascotLines.length)
      ],
    );
    setVisibleAlerts(0);
    setPhase('alerts');
    sfx.boing();

    for (let i = 1; i <= EMERGENCY.alerts.length; i++) {
      const t = window.setTimeout(() => {
        setVisibleAlerts(i);
        sfx.pop();
        if (i === EMERGENCY.alerts.length) {
          const done = window.setTimeout(() => {
            setPhase('comfort');
            sfx.tada();
          }, 500);
          timers.current.push(done);
        }
      }, i * ALERT_STEP_MS);
      timers.current.push(t);
    }
  }

  function reset(): void {
    clearTimers();
    setPhase('idle');
    setVisibleAlerts(0);
    setComfort('');
    setMascotLine('');
  }

  const active = phase !== 'idle';

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-10">
      <SectionHeader
        title="Tombol Darurat Kangen Arsen"
        subtitle="Untuk keadaan genting: rindu akut stadium lanjut."
      />

      <style>{`
        @keyframes alu-alert-flash {
          0%, 100% { box-shadow: 0 0 0 4px #e0709c, 0 10px 30px -12px rgba(74,59,82,.25); }
          50% { box-shadow: 0 0 0 10px #ffcf9f, 0 10px 30px -12px rgba(74,59,82,.25); }
        }
        .alu-alert-flash {
          animation: alu-alert-flash 0.7s ease-in-out infinite;
        }
      `}</style>

      <div className="mt-6 flex flex-col items-center gap-4">
        {!active ? (
          <>
            <StickerButton
              onClick={startEmergency}
              className="animate-heartbeat min-h-[96px] min-w-[260px] bg-blush-500 px-10 py-6 text-2xl text-paper"
            >
              AKU KANGEN ARSEN 🚨
            </StickerButton>
            {pressCount > 0 && (
              <p className="font-hand text-xl text-ink-soft">
                {counterJoke(pressCount)}
              </p>
            )}
          </>
        ) : (
          <PaperCard
            className={`alu-alert-flash w-full px-5 py-6 ${
              phase === 'comfort' ? 'border-sage-400' : ''
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <Arsen
                expression={phase === 'comfort' ? 'love' : 'panic'}
                size={112}
                className={phase === 'alerts' ? 'animate-shake' : 'animate-float'}
              />

              {/* Staggered alerts */}
              <div
                aria-live="polite"
                className="flex w-full flex-col items-stretch gap-2"
              >
                {EMERGENCY.alerts.slice(0, visibleAlerts).map((alert, i) => (
                  <p
                    key={`${i}-${alert}`}
                    className="animate-pop-in rounded-2xl border-2 border-blush-500 bg-blush-100 px-4 py-2 text-center font-bold text-blush-700"
                  >
                    {alert}
                  </p>
                ))}
              </div>

              {phase === 'comfort' && (
                <div
                  key={comfort}
                  className="animate-pop-in flex w-full flex-col items-center gap-3"
                >
                  <div className="doodle-frame w-full bg-butter-100 px-4 py-3">
                    <p className="font-hand text-2xl leading-snug text-ink">
                      {comfort}
                    </p>
                  </div>
                  <div className="w-full rounded-2xl bg-lav-100 px-4 py-3">
                    <p className="text-sm font-bold text-ink">
                      🐾 Kata Arsen: <span className="font-normal">{mascotLine}</span>
                    </p>
                  </div>
                  <p className="font-hand text-xl text-ink-soft">
                    {counterJoke(pressCount)}
                  </p>
                  <StickerButton
                    onClick={reset}
                    className="min-h-[44px] bg-sage-200 px-6 text-base"
                  >
                    Tutup darurat ✅
                  </StickerButton>
                </div>
              )}
            </div>
          </PaperCard>
        )}

        <p className="text-center text-xs text-ink-faint">
          *darurat fiktif, tidak menghubungi siapa pun kecuali hati Arsen.
        </p>
      </div>
    </div>
  );
}
