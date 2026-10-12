import type { Advice } from './moods';

// 70 nasihat total, 10 per mood. id harus unik: "<mood>-<nomor>".

export const ADVICE: Advice[] = [
  // ---------- SEDIH ----------
  {
    id: 'sedih-1',
    mood: 'sedih',
    text: 'Kalau hari ini berat, istirahat dulu ya. Dunia nggak bakal kabur. Kalau kabur, nanti Arsen kejar pake sandal.',
  },
  {
    id: 'sedih-2',
    mood: 'sedih',
    text: 'Nangis boleh, kok. Itu bukan tanda lemah — itu tanda kamu manusia. Beda sama Arsen yang kadang kayak robot kalau lagi bengong.',
  },
  {
    id: 'sedih-3',
    mood: 'sedih',
    text: 'Kamu nggak harus selalu kuat. Sesekali jadi lemes juga nggak apa-apa. Yang penting jangan lupa makan.',
  },
  {
    id: 'sedih-4',
    mood: 'sedih',
    text: 'Sedih itu kayak hujan: deras di awal, terus reda sendiri. Arsen janji bakal jadi payungnya... payung yang agak bocor dikit, tapi tetap usaha.',
  },
  {
    id: 'sedih-5',
    mood: 'sedih',
    text: 'Kalau kamu butuh bahu buat sandaran, bahu Arsen selalu ready. Tinggal booking aja, tanpa antre.',
  },
  {
    id: 'sedih-6',
    mood: 'sedih',
    text: 'Nggak apa-apa kalau hari ini nggak produktif. Nilai kamu nggak dihitung dari to-do list, kok.',
  },
  {
    id: 'sedih-7',
    mood: 'sedih',
    text: 'Semua perasaan sedih itu valid. Kecuali sedih karena nggak bisa buka toples. Itu biasanya cuma butuh Arsen.',
  },
  {
    id: 'sedih-8',
    mood: 'sedih',
    text: 'Ingat: kamu pernah melewati hari-hari berat sebelumnya, dan kamu masih di sini. Kamu tuh kuat, cuma lagi lupa aja.',
  },
  {
    id: 'sedih-9',
    mood: 'sedih',
    text: 'Kalau kamu sedih, Arsen ikut sedih. Kalau kamu nangis, Arsen bingung mau ngapain... tapi Arsen tetap di sini. Itu yang penting.',
  },
  {
    id: 'sedih-10',
    mood: 'sedih',
    text: 'Pelan-pelan ya. Nggak ada deadline buat sembuh. Yang ada deadline cuma kerjaan Arsen, dan itu juga sering telat.',
  },

  // ---------- CAPEK ----------
  {
    id: 'capek-1',
    mood: 'capek',
    text: 'Capek? Rebahan dulu. Dunia bisa nunggu. Deadline bisa nego. Tapi badan kamu nggak bisa diganti.',
  },
  {
    id: 'capek-2',
    mood: 'capek',
    text: 'Tubuh kamu tuh kayak HP: kalau baterai 2% terus dipaksa, yang ada mati total. Cas dulu, gih.',
  },
  {
    id: 'capek-3',
    mood: 'capek',
    text: 'Kamu udah kerja keras hari ini. Sekarang giliran kasur yang kerja keras nemenin kamu.',
  },
  {
    id: 'capek-4',
    mood: 'capek',
    text: 'Istirahat itu bukan malas. Malas itu rebahan sambil ngerasa bersalah. Kamu? Kamu rebahan sambil bangga. Beda.',
  },
  {
    id: 'capek-5',
    mood: 'capek',
    text: 'Mandi air hangat, makan yang enak, terus tidur. Itu resep dokter... dokter Arsen, spesialis rebahan.',
  },
  {
    id: 'capek-6',
    mood: 'capek',
    text: 'Kalau capek fisik, tidur. Kalau capek hati, cerita ke Arsen. Kalau capek dua-duanya, tidur sambil dipeluk Arsen. Win-win.',
  },
  {
    id: 'capek-7',
    mood: 'capek',
    text: 'Jangan maksain diri terus. Kamu bukan charger KW yang harus nyala 24 jam.',
  },
  {
    id: 'capek-8',
    mood: 'capek',
    text: 'Besok masih ada. Hari ini cukup sampai sini. Kamu udah hebat, titik.',
  },
  {
    id: 'capek-9',
    mood: 'capek',
    text: 'Pijit? Arsen bisa pijit... walaupun skill-nya setara tukang urut abal-abal. Tapi niatnya tulus.',
  },
  {
    id: 'capek-10',
    mood: 'capek',
    text: 'Minum air putih dulu. Kadang kita ngerasa capek banget, ternyata cuma dehidrasi dan kurang dipeluk.',
  },

  // ---------- NGAMBEK ----------
  {
    id: 'ngambek-1',
    mood: 'ngambek',
    text: 'Ngambek boleh, tapi jangan lupa makan. Perut kenyang, hati ikut adem. Itu sains. Sains menurut Arsen.',
  },
  {
    id: 'ngambek-2',
    mood: 'ngambek',
    text: 'Arsen tahu kamu ngambek. Arsen juga tahu kamu tetap sayang. Jadi kita skip drama-nya, langsung ke bagian baikan, ya?',
  },
  {
    id: 'ngambek-3',
    mood: 'ngambek',
    text: 'Kalau ngambeknya gara-gara Arsen, maaf ya. Arsen janji bakal mikir dulu sebelum ngomong. Kadang. Sering. Oke, selalu berusaha.',
  },
  {
    id: 'ngambek-4',
    mood: 'ngambek',
    text: 'Ngambek itu kayak wifi lemot: bikin kesel, tapi biasanya sembuh sendiri. Apalagi kalau ada yang minta maaf duluan. (Arsen.)',
  },
  {
    id: 'ngambek-5',
    mood: 'ngambek',
    text: 'Kamu ngambek mukanya tetap lucu, tahu nggak? Makanya Arsen kadang... eh, nggak jadi. Lanjut ngambek aja.',
  },
  {
    id: 'ngambek-6',
    mood: 'ngambek',
    text: 'Boleh ngambek seharian. Tapi besok harus baikan, soalnya Arsen nggak bisa tidur kalau kamu masih ngambek.',
  },
  {
    id: 'ngambek-7',
    mood: 'ngambek',
    text: 'Arsen siap disuruh-suruh sebagai denda. Mau disuruh beli seblak? Siap. Disuruh diam? ...Siap juga, walaupun berat.',
  },
  {
    id: 'ngambek-8',
    mood: 'ngambek',
    text: 'Ngambek-ngambek gini, inget nggak sih kita sayang-sayangan? Ingat dong. Ya udah, baikan.',
  },
  {
    id: 'ngambek-9',
    mood: 'ngambek',
    text: 'Kalau kamu butuh waktu sendiri, Arsen kasih. Tapi pintunya jangan dikunci rapat-rapat, sisain celah buat Arsen nyelip.',
  },
  {
    id: 'ngambek-10',
    mood: 'ngambek',
    text: 'Senyum dikit dong. Nih Arsen kasih senyum duluan: 🙂. Sekarang giliran kamu.',
  },

  // ---------- OVERTHINKING ----------
  {
    id: 'overthinking-1',
    mood: 'overthinking',
    text: 'Jangan overthinking terus. Otak kamu juga butuh liburan. Masa dia lembur terus nggak digaji?',
  },
  {
    id: 'overthinking-2',
    mood: 'overthinking',
    text: '90% yang kamu khawatirin nggak akan kejadian. 10% sisanya? Nanti kita hadapi bareng. Itu namanya teamwork.',
  },
  {
    id: 'overthinking-3',
    mood: 'overthinking',
    text: 'Stop replay skenario di kepala. Itu bukan Netflix, nggak usah ditonton berulang-ulang.',
  },
  {
    id: 'overthinking-4',
    mood: 'overthinking',
    text: 'Kamu mikir terlalu jauh sampai ke tahun 2030. Balik dulu ke hari ini. Hari ini kamu aman, dan Arsen ada di sini.',
  },
  {
    id: 'overthinking-5',
    mood: 'overthinking',
    text: 'Overthinking itu kayak baca komentar netizen: makin dibaca makin pusing. Mending tutup, terus makan.',
  },
  {
    id: 'overthinking-6',
    mood: 'overthinking',
    text: 'Kalau pikiranmu lagi rame, cerita ke Arsen. Biar rame-nya pindah ke Arsen aja. Arsen kuat kok. ...Kebanyakan sih enggak.',
  },
  {
    id: 'overthinking-7',
    mood: 'overthinking',
    text: 'Satu per satu ya. Masalah nggak bisa diselesaikan semuanya jam 2 pagi. Jam 2 pagi itu waktunya tidur, bukan sidang.',
  },
  {
    id: 'overthinking-8',
    mood: 'overthinking',
    text: 'Kamu nggak harus punya semua jawaban sekarang. Bahkan Google aja kadang bilang "tidak ditemukan".',
  },
  {
    id: 'overthinking-9',
    mood: 'overthinking',
    text: 'Tarik napas. Hembuskan. Sekali lagi. Nah, kan masih bisa napas. Berarti masih aman.',
  },
  {
    id: 'overthinking-10',
    mood: 'overthinking',
    text: 'Ingat: kamu udah pernah overthinking soal hal-hal lain sebelumnya, dan semuanya baik-baik aja. Track record kamu bagus.',
  },

  // ---------- KANGEN ----------
  {
    id: 'kangen-1',
    mood: 'kangen',
    text: 'Kalau kamu kangen Arsen, tenang. Arsen juga kangen. Ini bukan nasihat, ini pengumuman resmi.',
  },
  {
    id: 'kangen-2',
    mood: 'kangen',
    text: 'Kangen itu tanda sayang yang lagi antre ketemu. Sabar ya, antreannya bentar lagi sampai.',
  },
  {
    id: 'kangen-3',
    mood: 'kangen',
    text: 'Jarak cuma angka. Yang penting hatinya nggak LDR. Hati kita mah tetanggaan.',
  },
  {
    id: 'kangen-4',
    mood: 'kangen',
    text: 'Kalau kangen, video call aja. Muka Arsen memang nggak seberapa, tapi lumayan buat obat kangen darurat.',
  },
  {
    id: 'kangen-5',
    mood: 'kangen',
    text: 'Arsen juga lagi mikirin kamu nih. Berarti kita lagi mikir bareng. Itu namanya telepati, versi hemat.',
  },
  {
    id: 'kangen-6',
    mood: 'kangen',
    text: 'Kangen berat? Bayangin Arsen lagi peluk kamu. Pelukannya anget. Agak bau keringet dikit, tapi anget.',
  },
  {
    id: 'kangen-7',
    mood: 'kangen',
    text: 'Nggak lama lagi ketemu kok. Waktu tuh kayak macet: berasa lama, tapi pasti jalan juga.',
  },
  {
    id: 'kangen-8',
    mood: 'kangen',
    text: 'Kamu kangen Arsen yang mana? Yang ganteng, yang lucu, atau yang nyebelin? ...Semuanya satu paket, nggak bisa milih.',
  },
  {
    id: 'kangen-9',
    mood: 'kangen',
    text: 'Simpan kangennya, nanti tukerin pas ketemu. Kurs-nya menguntungkan: 1 kangen = 10 pelukan.',
  },
  {
    id: 'kangen-10',
    mood: 'kangen',
    text: 'Kalau malam susah tidur gara-gara kangen, inget: Arsen juga lagi susah tidur. Kita begadang bareng, beda kasur.',
  },

  // ---------- SENENG ----------
  {
    id: 'seneng-1',
    mood: 'seneng',
    text: 'Lagi seneng? Pertahankan! Senyum kamu tuh kayak wifi gratis: bikin semua orang di sekitar ikut happy.',
  },
  {
    id: 'seneng-2',
    mood: 'seneng',
    text: 'Yes! Hari yang bagus buat kamu. Arsen ikut seneng. Ini namanya bahagia berjamaah.',
  },
  {
    id: 'seneng-3',
    mood: 'seneng',
    text: 'Kamu happy, Arsen happy, dunia happy. Semua happy. Pokoknya happy.',
  },
  {
    id: 'seneng-4',
    mood: 'seneng',
    text: 'Momen seneng gini harus dirayakan. Minimal dengan jajan. Maksimal dengan traktir Arsen.',
  },
  {
    id: 'seneng-5',
    mood: 'seneng',
    text: 'Lihat, kan? Hal baik datang ke orang baik. Kamu buktinya.',
  },
  {
    id: 'seneng-6',
    mood: 'seneng',
    text: 'Simpan rasa seneng ini baik-baik. Nanti kalau lagi sedih, tinggal buka lagi kayak buka tabungan.',
  },
  {
    id: 'seneng-7',
    mood: 'seneng',
    text: 'Kamu ketawa, Arsen ikut ketawa. Kamu senyum, Arsen ikut senyum. Kamu traktir, Arsen... ikut makan.',
  },
  {
    id: 'seneng-8',
    mood: 'seneng',
    text: 'Hari ini milikmu. Nikmatin sampai tetes terakhir, kayak es teh manis pas lagi haus.',
  },
  {
    id: 'seneng-9',
    mood: 'seneng',
    text: 'Seneng-seneng gini jangan lupa bersyukur. Terus jangan lupa bilang makasih ke Arsen. ...Bercanda. Atau enggak.',
  },
  {
    id: 'seneng-10',
    mood: 'seneng',
    text: 'Tetap jadi kamu yang ceria ya. Dunia butuh lebih banyak orang kayak kamu. Arsen juga.',
  },

  // ---------- NGAWUR ----------
  {
    id: 'ngawur-1',
    mood: 'ngawur',
    text: 'Nasihat hari ini: jangan percaya nasihat dari website yang dibikin pacarmu jam 2 pagi.',
  },
  {
    id: 'ngawur-2',
    mood: 'ngawur',
    text: 'Kalau hidup kasih kamu lemon, bikin es teh. Kalau hidup kasih kamu masalah, kasih ke Arsen. Arsen tampung.',
  },
  {
    id: 'ngawur-3',
    mood: 'ngawur',
    text: 'Ingat: kamu itu 70% air. Jadi secara teknis, kamu itu aqua galon yang bisa jalan.',
  },
  {
    id: 'ngawur-4',
    mood: 'ngawur',
    text: 'Jangan lupa minum air putih. Ginjal kamu udah kerja keras, kasih dia apresiasi.',
  },
  {
    id: 'ngawur-5',
    mood: 'ngawur',
    text: 'Kata orang, cinta itu buta. Makanya Arsen nggak sadar kalau kamu nyebelin. Eh.',
  },
  {
    id: 'ngawur-6',
    mood: 'ngawur',
    text: 'Hari ini ramalan bintangmu: bakal ketemu orang ganteng. Spoiler: itu Arsen, di website ini.',
  },
  {
    id: 'ngawur-7',
    mood: 'ngawur',
    text: 'Kalau kamu baca ini sambil rebahan, selamat! Kamu resmi jadi anggota rebahaners se-Indonesia.',
  },
  {
    id: 'ngawur-8',
    mood: 'ngawur',
    text: 'Tips hemat: kalau kangen Arsen, lihat foto. Kalau masih kangen, video call. Kalau masih kangen juga, ya udah ketemuan aja.',
  },
  {
    id: 'ngawur-9',
    mood: 'ngawur',
    text: 'Fakta menarik: gurita punya 3 jantung. Kamu cuma punya 1, tapi semuanya buat Arsen. Hemat.',
  },
  {
    id: 'ngawur-10',
    mood: 'ngawur',
    text: 'Jangan terlalu serius. Hidup udah serius sendiri. Kamu tugasnya ketawa.',
  },
];
