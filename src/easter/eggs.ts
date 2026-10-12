// Sistem easter egg "pencapaian rahasia".
// - useEggs(): baca + unlock pencapaian (persist di localStorage 'alu:eggs').
// - eggEvents: emitter module-level — unlock() memanggil emit(), EggToasts subscribe().
// - eggMeta(): judul + teks pencapaian dari konten EASTER_EGGS.

import { useCallback, useEffect, useRef, useState } from 'react';
import { EASTER_EGGS } from '../content/content';

export const EGG_IDS = [
  'mascot-spam',
  'star-note',
  'flower-power',
  'collector',
  'sleeper',
  'night-owl',
] as const;

export type EggId = (typeof EGG_IDS)[number];

const STORAGE_KEY = 'alu:eggs';

type EggListener = (id: EggId) => void;

const listeners = new Set<EggListener>();

export const eggEvents = {
  emit(id: EggId): void {
    listeners.forEach((fn) => {
      try {
        fn(id);
      } catch {
        /* satu listener error jangan ikut matiin yang lain */
      }
    });
  },
  subscribe(fn: EggListener): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};

function isEggId(value: unknown): value is EggId {
  return typeof value === 'string' && (EGG_IDS as readonly string[]).includes(value);
}

function readStored(): EggId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEggId);
  } catch {
    return [];
  }
}

function writeStored(ids: EggId[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* storage diblokir/penuh: pencapaian tetap hidup selama sesi ini */
  }
}

export function eggMeta(id: EggId): { title: string; text: string } {
  const found = EASTER_EGGS.find((e) => e.id === id);
  if (found) return { title: found.title, text: found.text };
  return {
    title: 'Pencapaian Rahasia',
    text: 'Kamu nemu sesuatu yang tersembunyi. Arsen bangga sama kamu.',
  };
}

export function useEggs(): {
  unlocked: EggId[];
  unlock: (id: EggId) => boolean;
} {
  const [unlocked, setUnlocked] = useState<EggId[]>(() => readStored());
  const ref = useRef<EggId[]>(unlocked);
  useEffect(() => {
    ref.current = unlocked;
  }, [unlocked]);

  // Jaga sinkron antar-instance: setiap unlock di mana pun -> baca ulang storage.
  useEffect(() => {
    const unsub = eggEvents.subscribe(() => {
      const fresh = readStored();
      ref.current = fresh;
      setUnlocked(fresh);
    });
    return unsub;
  }, []);

  const unlock = useCallback((id: EggId): boolean => {
    const current = ref.current ?? readStored();
    if (current.includes(id)) return false;
    const next = [...current, id];
    ref.current = next;
    writeStored(next);
    setUnlocked(next);
    eggEvents.emit(id);
    return true;
  }, []);

  return { unlocked, unlock };
}
