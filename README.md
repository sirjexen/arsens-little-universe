# Arsen's Little Universe

Website kado interaktif bergaya storybook — hadiah digital dari **Arsen** untuk **Livia**.
Berisi Mesin Nasihat Arsen™, Tombol Darurat Kangen, Kebun Livia, Letters for Livia (3 surat),
Mesin Pengukur Kegemesan, dan easter egg tersembunyi. Seluruh teks berbahasa Indonesia kasual.

**Live:** https://sirjexen.github.io/arsens-little-universe/

## Revisi 2 — "Letters for Livia"

- Hampir semua emoji dihapus dari situs; digantikan sistem ikon SVG `Glyph`
  (`src/components/icons.tsx`, 31 ikon konsisten gaya hand-drawn).
- "Surat Rahasia" menjadi **Letters for Livia**: 3 surat ("Untuk hari yang berat",
  "Kalau lagi kangen", "Nggak ada alasan khusus"), masing-masing dengan atmosfer
  animasinya sendiri (hujan / senja / bintang), koreografi amplop (terlipat buka →
  surat meluncur → kertas terbentang → tinta muncul), anotasi tulisan tangan
  interaktif, dan kejutan tersembunyi di tiap surat.
- Maskot bunga kini bernama **Livia** (tetap bengkok, tetap gemes) dengan goyangan
  idle; penamaan "Bunga Bengkok" diganti "Livia" di seluruh situs.
- **Mode tenang**: mematikan koreografi & animasi ambien (tersimpan, menghormati
  `prefers-reduced-motion`).

## Cara menjalankan

Butuh Node.js 18+ (disarankan 20+).

```bash
npm ci          # install dependencies (lockfile disertakan)
npm run dev     # jalan di http://localhost:5173
```

## Build & cek

```bash
npx tsc -p tsconfig.app.json --noEmit  # type check (wajib 0 error)
npm run build                          # output ke dist/
npm run preview                        # pratinjau hasil build
```

> Catatan: `npx tsc --noEmit` polos adalah no-op di repo ini (root `tsconfig.json`
> memakai `"files": []`). Selalu pakai `tsc -p tsconfig.app.json`.

## Deploy ke GitHub Pages

Repo ini sudah dikonfigurasi untuk deploy otomatis via GitHub Actions:

1. Push repo ini ke GitHub (nama repo disarankan `arsens-little-universe`).
2. Di GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push ke branch `main` (atau jalankan workflow manual dari tab **Actions**).
4. Situs live di `https://<username>.github.io/arsens-little-universe/`.

> **Catatan deploy aktual:** deployment live saat ini memakai branch `gh-pages`
> (berisi hasil `npm run build`) karena token OAuth GitHub CLI tidak memiliki
> scope `workflow` sehingga file `.github/workflows/deploy.yml` tidak bisa
> di-push via CLI. File workflow tetap ada di repo ini — cukup upload satu file
> itu lewat web GitHub (Add file → Upload files) untuk mengaktifkan jalur
> Actions, atau push dari mesin dengan token ber-scope `workflow`.

`vite.config.ts` memakai `base: '/arsens-little-universe/'` agar semua path aset
benar di bawah subpath. Kalau nama repo diganti, sesuaikan `base` menjadi
`'/<nama-repo>/'` lalu rebuild.

## Mengedit konten (untuk Arsen)

Semua tulisan terpusat di `src/content/` — tidak perlu ngerti React:

| File                 | Isi                                      |
| -------------------- | ---------------------------------------- |
| `src/content/advice.ts`  | 70+ nasihat Mesin Nasihat (per kategori mood) |
| `src/content/letter.ts`  | 3 surat Letters for Livia (judul, paragraf, anotasi, kejutan — semua editable) |
| `src/content/garden.ts`  | Celotehan kebun (siram, matahari, peluk…) |
| `src/content/emergency.ts` | Peringatan & penghibur tombol darurat   |
| `src/content/meter.ts`   | Hasil lucu Mesin Pengukur Kegemesan      |
| `src/content/misc.ts`    | Sapaan welcome & pencapaian rahasia      |
| `src/content/moods.ts`   | Daftar kategori mood (+ ikon Glyph)      |

Panduan lengkap (ditulis untuk non-programmer, bahasa Indonesia):
baca **`CONTENT_GUIDE.md`**. Aturan penting: jangan hapus tanda kutip/koma,
setiap pesan harus unik, dan `id` nasihat tidak boleh diubah setelah difavoritkan.

## Struktur proyek

```
src/
  content/      # semua teks (editable)
  components/   # Arsen (maskot SVG), Bunga (Livia si bunga), icons (sistem Glyph),
                # Ambience (animasi suasana surat), ui kit
  scenes/       # Welcome, Nasihat, Darurat, Kebun, Surat, Meteran
  easter/       # sistem pencapaian rahasia + lapisan hotspot tersembunyi
  lib/          # sfx WebAudio mungil (default MATI, opt-in)
  App.tsx       # router scene + navigasi
  index.css     # design system (Tailwind v4 @theme)
```

## Detail teknis

- React 18 + TypeScript + Vite 5 + Tailwind CSS v4, tanpa UI framework berat.
- Maskot & ilustrasi 100% SVG/CSS — tanpa aset berbayar.
- Persistensi: `localStorage` (`alu:favorites`, `alu:fav-reacts`, `alu:garden`, `alu:eggs`,
  `alu:sound`, `alu:emergency-count`, `alu:letters-read`, `alu:calm-mode`). Tidak ada backend.
- Mobile-first (320px+), `prefers-reduced-motion` dihormati, suara default mati.
- Font: Baloo 2 (display), Nunito (body), Caveat (tulisan tangan) via Google Fonts.
