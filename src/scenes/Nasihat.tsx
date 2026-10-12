import { useEffect, useRef, useState } from 'react';
import {
  ADVICE,
  FAVORITES_EMPTY,
  MOODS,
  type Advice,
  type MoodId,
} from '../content/content';
import { Arsen } from '../components/Arsen';
import type { ArsenExpression } from '../components/Arsen';
import {
  PaperCard,
  SectionHeader,
  StickerButton,
  useLocalStorage,
} from '../components/ui';
import { sfx } from '../lib/sound';

type MoodChoice = MoodId | 'surprise';

const REACTS = ['😂', '🥺', '💗', '🤡'] as const;

const MOOD_EXPRESSIONS: Record<MoodId, ArsenExpression> = {
  sedih: 'love',
  capek: 'sleepy',
  ngambek: 'confused',
  overthinking: 'wise',
  kangen: 'blush',
  seneng: 'happy',
  ngawur: 'proud',
};

const FAV_KEY = 'alu:favorites';
const REACT_KEY = 'alu:fav-reacts';

function pickAdvice(choice: MoodChoice, excludeId: string | null): Advice {
  const pool =
    choice === 'surprise' ? ADVICE : ADVICE.filter((a) => a.mood === choice);
  const candidates =
    pool.length > 1 && excludeId
      ? pool.filter((a) => a.id !== excludeId)
      : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function moodLabel(mood: MoodId): string {
  return MOODS.find((m) => m.id === mood)?.label ?? mood;
}

function dispatchFavCount(count: number): void {
  window.dispatchEvent(
    new CustomEvent('alu:fav-count', { detail: { count } }),
  );
}

export default function Nasihat() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(FAV_KEY, []);
  const [reacts, setReacts] = useLocalStorage<Record<string, string>>(
    REACT_KEY,
    {},
  );
  const [choice, setChoice] = useState<MoodChoice | null>(null);
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);
  const [revealKey, setRevealKey] = useState(0);
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [showFavs, setShowFavs] = useState(false);
  const copyTimer = useRef<number | null>(null);

  // Komponen lain (mis. navbar) yang ikut baca 'alu:favorites' bisa
  // mengandalkan event ini; dispatch juga saat mount pertama.
  useEffect(() => {
    dispatchFavCount(favorites.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    };
  }, []);

  function giveAdvice(nextChoice: MoodChoice): void {
    const next = pickAdvice(nextChoice, prevId);
    setChoice(nextChoice);
    setAdvice(next);
    setPrevId(next.id);
    setRevealKey((k) => k + 1);
    setCopied('idle');
    sfx.pop();
  }

  function toggleFavorite(id: string): void {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((f) => f !== id) : [...prev, id];
      dispatchFavCount(next.length);
      return next;
    });
    sfx.boing();
  }

  function removeFavorite(id: string): void {
    setFavorites((prev) => {
      const next = prev.filter((f) => f !== id);
      dispatchFavCount(next.length);
      return next;
    });
  }

  function toggleReact(id: string, emoji: string): void {
    setReacts((prev) => {
      const next = { ...prev };
      if (next[id] === emoji) {
        delete next[id];
      } else {
        next[id] = emoji;
      }
      return next;
    });
    sfx.pop();
  }

  async function copyAdvice(text: string): Promise<void> {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? 'ok' : 'fail');
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied('idle'), 2000);
  }

  const activeMood: MoodId | null =
    advice === null ? null : advice.mood;
  const expression: ArsenExpression = activeMood
    ? MOOD_EXPRESSIONS[activeMood]
    : 'happy';
  const isFav = advice !== null && favorites.includes(advice.id);
  const currentReact = advice ? reacts[advice.id] : undefined;

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-10">
      <SectionHeader
        title="Mesin Nasihat Arsen™"
        subtitle="Pilih mood kamu, terima wejangan ngawur tapi tulus."
      />

      {/* Mood picker */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Pilih mood">
        {MOODS.map((mood) => (
          <StickerButton
            key={mood.id}
            onClick={() => giveAdvice(mood.id)}
            className={`flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 py-2 text-center ${
              choice === mood.id
                ? 'bg-blush-200 text-ink'
                : 'bg-paper text-ink'
            }`}
            title={mood.hint}
          >
            <span className="text-2xl" aria-hidden="true">
              {mood.emoji}
            </span>
            <span className="text-sm leading-tight">{mood.label}</span>
          </StickerButton>
        ))}
        <StickerButton
          onClick={() => giveAdvice('surprise')}
          className={`flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 py-2 text-center ${
            choice === 'surprise'
              ? 'bg-lav-200 text-ink'
              : 'bg-paper text-ink'
          }`}
          title="Biar nasib yang milih. Arsen cuma perantara."
        >
          <span className="text-2xl" aria-hidden="true">
            🎲
          </span>
          <span className="text-sm leading-tight">Surprise me!</span>
        </StickerButton>
      </div>

      {/* Advice card */}
      <div aria-live="polite" className="mt-6">
        {advice ? (
          <PaperCard
            key={`${advice.id}-${revealKey}`}
            className="animate-pop-in px-5 py-6 text-center"
          >
            <div className="washi" aria-hidden="true" />
            <div className="flex justify-center">
              <Arsen expression={expression} size={104} />
            </div>
            <p className="font-hand mt-3 text-2xl leading-snug text-ink">
              “{advice.text}”
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-ink-faint">
              untuk mood: {moodLabel(advice.mood)}
            </p>

            {/* Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <StickerButton
                onClick={() => choice && giveAdvice(choice)}
                className="min-h-[44px] bg-butter-200 px-5 text-base"
              >
                Nasihat lagi dong 🔄
              </StickerButton>
              <StickerButton
                onClick={() => toggleFavorite(advice.id)}
                className={`min-h-[44px] px-4 text-base ${
                  isFav ? 'bg-blush-200' : 'bg-paper'
                }`}
                title={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                {isFav ? '★ Tersimpan' : '☆ Simpan'}
              </StickerButton>
              <StickerButton
                onClick={() => void copyAdvice(`"${advice.text}" — Arsen`)}
                className="min-h-[44px] bg-sage-100 px-4 text-base"
              >
                {copied === 'ok'
                  ? 'Disalin! ✅'
                  : copied === 'fail'
                    ? 'Gagal nyalin 😅'
                    : '📋 Salin'}
              </StickerButton>
            </div>

            {/* Emoji reacts */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-ink-soft">Reaksi kamu:</span>
              {REACTS.map((emoji) => {
                const active = currentReact === emoji;
                return (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => toggleReact(advice.id, emoji)}
                    aria-pressed={active}
                    aria-label={`Reaksi ${emoji}`}
                    className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 text-2xl transition-transform ${
                      active
                        ? 'animate-wiggle border-blush-500 bg-blush-100 scale-110'
                        : 'border-ink/15 bg-cream hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </PaperCard>
        ) : (
          <PaperCard className="px-5 py-8 text-center">
            <div className="flex justify-center">
              <Arsen expression="happy" size={96} className="animate-float" />
            </div>
            <p className="font-hand mt-2 text-2xl text-ink-soft">
              Mood-nya lagi apa nih? Pilih di atas, biar Arsen mikirin
              nasihatnya. 🧠
            </p>
          </PaperCard>
        )}
      </div>

      {/* Favorites */}
      <div className="mt-6 text-center">
        <StickerButton
          onClick={() => setShowFavs((v) => !v)}
          className="min-h-[44px] bg-lav-100 px-5 text-base"
        >
          ⭐ Favorit ({favorites.length}) {showFavs ? '▴' : '▾'}
        </StickerButton>
      </div>

      {showFavs && (
        <div className="animate-pop-in mt-4">
          {favorites.length === 0 ? (
            <PaperCard className="px-5 py-6 text-center">
              <p className="font-hand text-xl text-ink-soft">
                {FAVORITES_EMPTY}
              </p>
            </PaperCard>
          ) : (
            <ul className="flex flex-col gap-3">
              {favorites.map((id) => {
                const item = ADVICE.find((a) => a.id === id);
                if (!item) return null;
                return (
                  <li key={id}>
                    <PaperCard className="flex items-start gap-3 px-4 py-4">
                      <span className="text-xl" aria-hidden="true">
                        💌
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug text-ink">
                          “{item.text}”
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-ink-faint">
                          {moodLabel(item.mood)}
                          {reacts[id] ? ` · reaksi kamu: ${reacts[id]}` : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFavorite(id)}
                        aria-label="Hapus dari favorit"
                        className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border-2 border-ink/15 bg-cream text-lg hover:bg-blush-100"
                      >
                        ✕
                      </button>
                    </PaperCard>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
