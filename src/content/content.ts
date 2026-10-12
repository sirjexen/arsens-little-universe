// Barrel — centralized content for "Arsen's Little Universe".
// All copy lives in the sibling modules; edit them (see CONTENT_GUIDE.md),
// never invent new export names — scenes import from this file.

export { MOODS } from './moods';
export type { MoodId, MoodMeta, Advice } from './moods';
export { ADVICE } from './advice';
export { LETTERS } from './letter';
export type { Letter, LetterAnnotation, LetterAtmosphere } from './letter';
export { GARDEN } from './garden';
export { EMERGENCY } from './emergency';
export { METER_RESULTS } from './meter';
export { WELCOME_LINES, EASTER_EGGS, FAVORITES_EMPTY } from './misc';
