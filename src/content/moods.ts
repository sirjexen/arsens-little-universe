// Types + daftar mood untuk Mesin Nasihat.
// Kalau mau nambah mood baru, tambah satu object di MOODS di bawah,
// terus tambah nasihatnya di advice.ts.

export type MoodId =
  | 'sedih'
  | 'capek'
  | 'ngambek'
  | 'overthinking'
  | 'kangen'
  | 'seneng'
  | 'ngawur';

export interface MoodMeta {
  id: MoodId;
  label: string;
  emoji: string;
  hint: string;
}

export interface Advice {
  id: string;
  mood: MoodId;
  text: string;
}

export const MOODS: MoodMeta[] = [
  {
    id: 'sedih',
    label: 'Sedih',
    emoji: '😢',
    hint: 'Lagi pengen nangis? Sini, sandar dulu.',
  },
  {
    id: 'capek',
    label: 'Capek',
    emoji: '😮‍💨',
    hint: 'Energi tinggal 2%? Cas dulu di sini.',
  },
  {
    id: 'ngambek',
    label: 'Ngambek',
    emoji: '😤',
    hint: 'Ngambek boleh, tapi jangan lupa makan.',
  },
  {
    id: 'overthinking',
    label: 'Overthinking',
    emoji: '🌀',
    hint: 'Otak muter terus? Biar Arsen yang matiin tombolnya.',
  },
  {
    id: 'kangen',
    label: 'Kangen',
    emoji: '🥺',
    hint: 'Kangen seseorang yang sok sibuk? Itu Arsen.',
  },
  {
    id: 'seneng',
    label: 'Seneng',
    emoji: '🥳',
    hint: 'Lagi happy? Biar makin happy.',
  },
  {
    id: 'ngawur',
    label: 'Ngawur',
    emoji: '🤪',
    hint: 'Nggak butuh nasihat, cuma butuh ketawa ngawur.',
  },
];
