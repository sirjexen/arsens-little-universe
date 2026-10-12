# Panduan Edit Konten — Arsen's Little Universe 🌸

Halo Arsen! File ini buat kamu kalau mau ganti-ganti tulisan di website tanpa ngoding. Semua teks website disimpan di folder:

```
src/content/
```

## File apa buat apa

| File | Isi |
|---|---|
| `moods.ts` | Daftar 7 mood di Mesin Nasihat (label, emoji, hint). Jangan hapus mood yang ada — cukup ganti tulisannya. |
| `advice.ts` | 70 nasihat Mesin Nasihat (10 per mood). Ini file yang paling sering kamu edit. |
| `letter.ts` | Surat rahasia (judul, paragraf, tanda tangan). |
| `garden.ts` | Kalimat-kalimat kebun bunga bengkok (disiram, dijemur, diajak ngobrol, dipeluk, didekor, lagi idle). |
| `emergency.ts` | Teks tombol darurat kangen (peringatan heboh, kalimat penenang, celetukan maskot). |
| `meter.ts` | 10 hasil lucu pengukur kegemesan. |
| `misc.ts` | Sapaan welcome, achievement rahasia (easter egg), dan teks kalau halaman favorit masih kosong. |
| `content.ts` | Cuma pintu masuk — **jangan edit file ini.** |

## Cara edit yang aman

1. Buka file-nya, cari teks yang mau diganti (diapit tanda kutip `"..."` atau `'...'`).
2. Ganti **isi** teksnya aja. Jangan ubah yang lain.
3. Simpan, selesai. Refresh website-nya.

Contoh — mau nambah nasihat baru di `advice.ts`, tinggal tiru polanya:

```ts
{
  id: 'ngawur-11',   // id harus unik, format: <nama-mood>-<nomor>
  mood: 'ngawur',    // harus salah satu: sedih, capek, ngambek, overthinking, kangen, seneng, ngawur
  text: 'Tulis nasihat barumu di sini.',
},
```

Tempel di dalam daftar mood yang sesuai (cari komentar `// ---------- NGAWUR ----------`), sebelum kurung tutup `];` paling bawah.

## ⚠️ Peringatan: jangan sampai rusak

- **Tanda kutip harus berpasangan.** Setiap teks dibuka dan ditutup kutip. Kalau kutipnya jomblo satu, website-nya error.
- **Koma jangan hilang.** Setiap baris diakhiri koma `,`. Kalau ada yang kehapus, error.
- **Kurung kurawal `{ }` dan siku `[ ]` harus seimbang.** Jangan hapus yang tutupannya.
- Kalau ada teks yang pakai kutip satu di dalamnya (misal `Arsen's`), pastikan teksnya dibungkus kutip dua `"..."` — atau tanya Marven dulu.
- **Jangan ubah `id`** di easter egg (`misc.ts`) kalau achievement-nya udah pernah kebuka — progress-nya bisa ke-reset.
- Kalau ragu, edit satu teks dulu, simpan, cek website-nya. Kalau aman, lanjut.

## Tips nulis ala Arsen

- Bahasa santai kayak lagi chat, bukan kayak pidato.
- Boleh ngawur, tapi jangan jahat. Tujuannya bikin dia senyum, bukan bikin dia bete beneran.
- Kalau topiknya sedih/capai/overthinking: empati dulu, becanda kemudian.
- Jangan pakai kata "sayang" di tiap kalimat — sekali-sekali aja biar nggak basi.
