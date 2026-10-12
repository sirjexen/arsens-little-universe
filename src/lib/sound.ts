// Efek suara mungil pakai WebAudio — nol aset, nol dependensi.
// Default MATI; user menyalakan lewat toggle di header.

const STORAGE_KEY = 'arsen-sound-enabled';

let ctx: AudioContext | null = null;
let enabled = false;

try {
  enabled = window.localStorage.getItem(STORAGE_KEY) === '1';
} catch {
  enabled = false;
}

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

interface Blip {
  from: number;
  to: number;
  dur: number;
  type: OscillatorType;
  delay?: number;
  gain?: number;
}

function play(notes: Blip[]): void {
  if (!enabled) return;
  const ac = audio();
  if (!ac) return;
  try {
    const t0 = ac.currentTime;
    for (const n of notes) {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      const start = t0 + (n.delay ?? 0);
      osc.type = n.type;
      osc.frequency.setValueAtTime(Math.max(40, n.from), start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, n.to), start + n.dur);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(n.gain ?? 0.16, start + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, start + n.dur);
      osc.connect(g).connect(ac.destination);
      osc.start(start);
      osc.stop(start + n.dur + 0.05);
    }
  } catch {
    // Audio gagal (tab dibisukan dsb.) — abaikan diam-diam.
  }
}

export const sfx = {
  enabled(): boolean {
    return enabled;
  },
  setEnabled(v: boolean): void {
    enabled = v;
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? '1' : '0');
    } catch {
      // abaikan
    }
  },
  /** Blip pendek — untuk tap / buka sesuatu. */
  pop(): void {
    play([{ from: 520, to: 880, dur: 0.09, type: 'sine' }]);
  },
  /** Pentalan karet — untuk aksi konyol. */
  boing(): void {
    play([
      { from: 300, to: 120, dur: 0.16, type: 'triangle', gain: 0.2 },
      { from: 180, to: 340, dur: 0.12, type: 'triangle', delay: 0.1, gain: 0.14 },
    ]);
  },
  /** Fanfare mini — untuk momen "tada!". */
  tada(): void {
    play([
      { from: 523, to: 523, dur: 0.12, type: 'triangle' },
      { from: 659, to: 659, dur: 0.12, type: 'triangle', delay: 0.11 },
      { from: 784, to: 988, dur: 0.22, type: 'triangle', delay: 0.22, gain: 0.18 },
    ]);
  },
  /** Klik halus — untuk navigasi tab. */
  click(): void {
    play([{ from: 700, to: 500, dur: 0.05, type: 'square', gain: 0.07 }]);
  },
};
