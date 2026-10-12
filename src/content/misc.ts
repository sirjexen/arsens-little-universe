// Teks-teks kecil lainnya: sapaan welcome, easter egg achievements,
// dan empty state favorit.

// Sapaan di scene pembuka (dipilih random).
export const WELCOME_LINES: string[] = [
  'Hai Bunga Bengkok! 🌸 Selamat datang di universe kecil buatan Arsen. Isinya nggak banyak, tapi semuanya tentang kamu.',
  'Eits, ketahuan buka website ini! Ya udah, sekalian aja. Selamat datang di Arsen\'s Little Universe!',
  'Halo halo! Kamu resmi jadi warga kehormatan universe ini. Fasilitas: nasihat ngawur, bunga bengkok, dan Arsen.',
  'Selamat datang! Website ini 100% bebas iklan, 100% penuh sayang. Dibuat dengan begadang dan cinta.',
  'Hai kamu! Iya kamu. Senyum dong, website-nya bisa lihat loh. (Nggak bisa, bercanda.)',
];

// Achievement rahasia. id dipakai kode untuk tracking (jangan diubah
// kalau achievement-nya udah rilis, nanti progress ke-reset).
export const EASTER_EGGS: { id: string; title: string; text: string }[] = [
  {
    id: 'mascot-spam',
    title: 'Tukang Pencet Profesional 👆',
    text: 'Maskot Arsen dipencet 7 kali dalam 3 detik. Dia pusing, tapi senang diperhatikan.',
  },
  {
    id: 'star-note',
    title: 'Penemu Bintang Kecil ⭐',
    text: 'Kamu nemu bintang mungil yang ngumpet di pojok layar. Mata elang, hati melankolis.',
  },
  {
    id: 'flower-power',
    title: 'Tangan Ajaib 🌷',
    text: 'Bunga bengkok dicolek 5 kali sampai kegelian. Dia nggak marah. Dia malah mekar dikit.',
  },
  {
    id: 'collector',
    title: 'Kolektor Hati 💗',
    text: 'Lima nasihat masuk daftar favorit. Hati Arsen resmi penuh, tidak bisa menampung lagi. (Bohong, bisa.)',
  },
  {
    id: 'sleeper',
    title: 'Penangkap Pengintip 👀',
    text: 'Kamu nangkep makhluk kecil yang ngintip dari bawah layar. Dia cuma mau lihat kamu senyum.',
  },
  {
    id: 'night-owl',
    title: 'Burung Hantu Resmi 🦉',
    text: 'Buka surat rahasia antara jam 12–5 pagi. Begadang ya? Arsen juga belum tidur, mikirin kamu. (Bohong dikit.)',
  },
];

// Empty state halaman favorit.
export const FAVORITES_EMPTY =
  'Belum ada favorit. Pencet ikon hati di nasihat yang paling nempel di hati, nanti dia pindah ke sini. Kayak Arsen yang pindah... ke hati kamu. Eh.';
