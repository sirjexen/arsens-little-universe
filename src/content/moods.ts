// Types + daftar mood untuk Mesin Nasihat.
// Kalau mau nambah mood baru, tambah satu object di MOODS di bawah,
// terus tambah nasihatnya di advice.ts.

import type { GlyphKind } from '../components/icons';

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
  icon: GlyphKind;
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
    icon: 'tear',
    hint: 'Lagi pengen nangis? Sini, sandar dulu.',
  },
  {
    id: 'capek',
    label: 'Capek',
    icon: 'moon',
    hint: 'Energi tinggal 2%? Cas dulu di sini.',
  },
  {
    id: 'ngambek',
    label: 'Ngambek',
    icon: 'cloud',
    hint: 'Ngambek boleh, tapi jangan lupa makan.',
  },
  {
    id: 'overthinking',
    label: 'Overthinking',
    icon: 'spiral',
    hint: 'Otak muter terus? Biar Arsen yang matiin tombolnya.',
  },
  {
    id: 'kangen',
    label: 'Kangen',
    icon: 'heart',
    hint: 'Kangen seseorang yang sok sibuk? Itu Arsen.',
  },
  {
    id: 'seneng',
    label: 'Seneng',
    icon: 'sun',
    hint: 'Lagi happy? Biar makin happy.',
  },
  {
    id: 'ngawur',
    label: 'Ngawur',
    icon: 'dice',
    hint: 'Nggak butuh nasihat, cuma butuh ketawa ngawur.',
  },
];
