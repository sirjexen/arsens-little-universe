// Koleksi surat rahasia untuk Livia. Hangat dan tulus, tanpa ngarang-ngarang
// kenangan/tanggal/event spesifik. Aman dibaca kapan pun.
// Setiap surat punya atmosfer sendiri (rain/sunset/stars) dan satu kejutan
// tersembunyi. Anchor anotasi HARUS substring persis dari salah satu paragraf.

export type LetterAtmosphere = 'rain' | 'sunset' | 'stars';

export interface LetterAnnotation {
  anchor: string; // exact substring of one paragraph
  note: string;
}

export interface Letter {
  id: 'hari-berat' | 'kangen' | 'tanpa-alasan';
  title: string;
  subtitle: string;
  atmosphere: LetterAtmosphere;
  sealColor: string; // hex untuk segel lilin
  paragraphs: string[];
  sign: string;
  annotations: LetterAnnotation[];
  surprise: { hint: string; reveal: string };
}

export const LETTERS: Letter[] = [
  {
    id: 'hari-berat',
    title: 'Untuk hari yang berat',
    subtitle: 'dibaca pelan-pelan, sambil tarik napas',
    atmosphere: 'rain',
    sealColor: '#8f76cc',
    paragraphs: [
      'Hai, Lili. Kalau hari ini rasanya berat banget, taruh dulu semuanya. Tugas, pikiran, ekspektasi orang-orang — taruh di lantai. Nggak bakal kabur kok.',
      'Lili nggak harus kuat terus. Hari ini boleh istirahat dulu, besok baru gas lagi. Dunia nggak akan runtuh cuma karena kamu rebahan.',
      'Dan kalau kamu butuh yang dengerin, Arsen di sini. Versi aslinya mungkin lagi jauh, tapi telinganya selalu nyala buat kamu.',
      'Oh iya, satu lagi: kamu udah ngelewatin hari-hari seberat ini sebelumnya, dan kamu masih di sini. Itu artinya kamu lebih kuat dari hari berat mana pun.',
    ],
    sign: 'Dari Arsen, payung bocor tapi tetap usaha',
    annotations: [
      {
        anchor: 'istirahat dulu',
        note: 'catatan tangan Arsen: rebahan itu strategi, bukan menyerah.',
      },
      {
        anchor: 'telinganya selalu nyala',
        note: 'kecuali pas Arsen ketiduran. Itu doang.',
      },
    ],
    surprise: {
      hint: 'ketuk awannya sekali',
      reveal: 'Habis hujan, langitnya selalu bersih lagi. Kamu juga.',
    },
  },
  {
    id: 'kangen',
    title: 'Kalau lagi kangen',
    subtitle: 'obat kangen darurat, versi surat',
    atmosphere: 'sunset',
    sealColor: '#e0709c',
    paragraphs: [
      'Lagi kangen ya, Lili? Ketahuan. Tenang, Arsen juga kangen kok. Ini pengumuman resmi, bukan cuma perasaan kamu doang.',
      'Jarak emang nyebelin. Tapi dengerin: hati kita nggak LDR. Hati kita mah tetanggaan, pagarnya doang yang agak jauh.',
      'Sambil nunggu ketemu, simpen kangennya baik-baik. Nanti kita tukerin pas ketemu. Kursnya lagi bagus: satu kangen sama dengan sepuluh pelukan.',
      'Jadi tahan dikit ya, Lili. Nanti kalau udah ketemu, Arsen yang pertama nyamperin. Janji.',
    ],
    sign: 'Dari Arsen, yang kangennya juga nggak kalah',
    annotations: [
      {
        anchor: 'satu kangen sama dengan sepuluh pelukan',
        note: 'kurs resmi, tidak bisa ditawar. Sudah disahkan Arsen.',
      },
      {
        anchor: 'Arsen yang pertama nyamperin',
        note: 'kecuali kamu yang nyamperin duluan. Itu juga boleh banget.',
      },
    ],
    surprise: {
      hint: 'ketuk mataharinya sekali',
      reveal: 'Mataharinya tenggelam, tapi besok terbit lagi. Kayak kita: pisah bentar, ketemu lagi.',
    },
  },
  {
    id: 'tanpa-alasan',
    title: 'Nggak ada alasan khusus',
    subtitle: 'cuma pengen nulis aja',
    atmosphere: 'stars',
    sealColor: '#f0a06a',
    paragraphs: [
      'Surat ini nggak ada alasan khususnya. Arsen cuma pengen nulis aja. Kadang sayang itu nggak butuh momen, cuma butuh niat. Dan pulpen.',
      'Kamu tahu nggak, kamu itu kayak wifi: nggak kelihatan, tapi kalau nggak ada, hidup Arsen langsung lemot.',
      'Makasih ya udah jadi kamu. Yang ketawanya ngawur, yang ceritanya random, yang sabar ngadepin Arsen yang kadang sok sibuk padahal cuma scroll HP.',
      'Udah, itu aja. Balik ke aktivitas masing-masing. Surat selesai, sayangnya lanjut terus.',
    ],
    sign: 'Dari Arsen, tanpa alasan khusus juga',
    annotations: [
      {
        anchor: 'kamu itu kayak wifi',
        note: 'password-nya cuma Arsen yang tahu. Jangan disebar.',
      },
      {
        anchor: 'sayangnya lanjut terus',
        note: 'tidak ada tombol berhentinya. Sudah dicari.',
      },
    ],
    surprise: {
      hint: 'ketuk bintangnya sekali',
      reveal: 'Bintangnya ada banyak, tapi yang paling terang lagi baca surat ini.',
    },
  },
];
