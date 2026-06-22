# Product Requirements Document (PRD)
## Website Grup Roblox

| | |
|---|---|
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 22 Juni 2026 |
| **Pemilik Produk** | BGST (Bagus Sopan Terpelajar ) |
| **Status** | Draft |

---

## 1. Latar Belakang & Ringkasan

Grup Roblox membutuhkan sebuah website resmi untuk menampilkan identitas grup, daftar member, dan avatar Roblox (2D & 3D) dari teman-teman/member grup secara interaktif. Website ini akan menjadi "halaman rumah" digital di luar platform Roblox, dengan tampilan yang **ceria (cheerful)**, **menarik secara visual**, dan **memiliki animasi yang hidup** sehingga tidak terasa membosankan seperti landing page generik.

Website akan dibangun dengan **Next.js + Tailwind CSS**, dan di-deploy ke **Vercel**.

## 2. Tujuan (Goals)

1. Memberikan identitas online resmi untuk grup Roblox.
2. Menampilkan member/teman beserta avatar Roblox mereka (gambar 2D dan model 3D) secara dinamis — bukan gambar statis yang di-upload manual.
3. Menghadirkan pengalaman visual yang ceria, colorful, dan punya animasi/micro-interaction di hampir setiap elemen penting.
4. Mudah di-maintain — menambah/menghapus member tidak butuh deploy ulang seluruh kode (idealnya cukup edit data sederhana).
5. Cepat diakses (performa baik) walau memuat aset 3D.

### Non-Goals (di luar scope versi pertama)
- Sistem login/auth dengan akun Roblox (OAuth) — *opsional untuk fase berikutnya*.
- Forum/komunitas internal (komentar, chat).
- E-commerce/merchandise store.

## 3. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| **Member grup** | Ingin melihat dirinya & teman-teman tampil di website, merasa "diakui" sebagai bagian grup. |
| **Calon member / pengunjung umum** | Ingin tahu grup ini tentang apa, vibe-nya seperti apa, dan cara join. |
| **Admin/owner grup (kamu)** | Ingin website mudah diupdate dan terlihat profesional tapi tetap fun. |

## 4. User Stories

- *Sebagai pengunjung*, saya ingin melihat hero section yang animatif begitu masuk ke website, supaya langsung dapat kesan "fun & alive".
- *Sebagai pengunjung*, saya ingin melihat galeri member dengan avatar Roblox asli mereka (real-time dari Roblox), bukan avatar yang sudah usang.
- *Sebagai pengunjung*, saya ingin bisa klik salah satu member dan melihat avatar 3D-nya yang bisa diputar-putar (rotate/zoom).
- *Sebagai admin*, saya ingin menambah member baru hanya dengan menambahkan Roblox User ID/username ke satu file data, tanpa perlu meng-upload gambar manual.
- *Sebagai pengunjung*, saya ingin tombol "Join Group" yang jelas dan mengarah ke halaman grup Roblox.

## 5. Lingkup Fitur (Functional Requirements)

### 5.1 Landing / Hero Section
- Headline + tagline grup dengan animasi entrance (fade/slide/typing effect).
- Background animatif (gradient bergerak, partikel mengambang, atau blob shape animasi) — tetap ringan secara performa.
- Tombol CTA: "Join Group di Roblox" dan "Lihat Member".
- Statistik singkat (jumlah member, tanggal dibentuk, game favorit grup) dengan animasi *count-up number*.

### 5.2 Galeri Member (Avatar 2D)
- Grid/cards berisi member, masing-masing menampilkan:
  - Avatar headshot/full-body 2D dari Roblox (real-time via API).
  - Username & display name Roblox.
  - Role di grup (Owner, Admin, Member, dll) — bisa badge berwarna.
- Hover effect (scale, glow, tilt 3D ringan) pada setiap card.
- Filter/sort sederhana (berdasarkan role, A-Z, atau "online status" jika memungkinkan).
- Skeleton loading animasi saat avatar masih fetching dari Roblox.

### 5.3 Avatar 3D Viewer
- Saat member card diklik, tampil modal/halaman detail dengan **model 3D avatar Roblox** member tersebut.
- Model bisa di-rotate (drag), zoom (scroll/pinch), menggunakan rendering 3D di browser.
- Auto-rotate idle animation ketika user tidak berinteraksi, supaya tetap "hidup".
- Fallback: jika model 3D gagal dimuat (timeout/limit dari Roblox), tampilkan avatar 2D sebagai pengganti dengan pesan ramah, bukan error mentah.

### 5.4 Tentang Grup
- Deskripsi grup, sejarah singkat, game yang sering dimainkan bersama.
- Galeri screenshot/clip kegiatan grup (opsional, statis dulu).

### 5.5 Footer & Navigasi
- Link sosial (Discord, Roblox Group page, dll).
- Navigasi smooth-scroll antar section dengan animasi indikator aktif.

### 5.6 Halaman Error/Loading
- Halaman 404 & loading state yang tetap mengikuti tone ceria (ilustrasi/animasi lucu, bukan teks polos).

## 6. Desain & Pengalaman Visual (UI/UX Guidelines)

- **Mood**: ceria, playful, warna-warna cerah (kombinasi pastel + accent warna cerah, gradient).
- **Tipografi**: font yang friendly/rounded untuk heading, font yang tetap mudah dibaca untuk body text.
- **Animasi** (gunakan library seperti **Framer Motion** untuk React/Next.js, dan **GSAP** untuk animasi scroll yang lebih kompleks):
  - Scroll-triggered animation (elemen muncul saat di-scroll ke viewport).
  - Hover micro-interactions di button & card.
  - Page transition antar route yang halus.
  - Parallax ringan di background hero.
- **Konsistensi**: tetap pakai design token (warna, spacing, radius) lewat Tailwind config supaya tidak "berantakan ceria" — ceria tapi rapi.
- Disarankan membuat moodboard/referensi visual dulu sebelum development (lihat skill `frontend-design` bila dikerjakan oleh Claude/asisten desain).

## 7. Arsitektur Teknis

### 7.1 Stack
| Layer | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion (UI), GSAP (scroll-based, opsional) |
| Render 3D | `three.js` via `@react-three/fiber` + `@react-three/drei` |
| Hosting | Vercel |
| Data member | JSON/config file di repo, atau database ringan (misal Vercel KV / Supabase) untuk kemudahan update tanpa redeploy |

### 7.2 Integrasi Roblox API — Poin Kritis

Roblox menyediakan API publik (tidak resmi/tidak didokumentasikan penuh oleh Roblox, tapi umum dipakai komunitas) untuk avatar:

| Kebutuhan | Endpoint |
|---|---|
| Avatar 2D (headshot/full body) | `https://thumbnails.roblox.com/v1/users/avatar?userIds={id}&size=420x420&format=Png` |
| Avatar 3D (model + tekstur) | `https://thumbnails.roblox.com/v1/users/avatar-3d?userId={id}` |
| Info user (username → userId) | `https://users.roblox.com/v1/users/{id}` atau endpoint search by username |

**Hal yang harus diperhatikan tim development:**

1. **CORS**: domain `thumbnails.roblox.com` dan `users.roblox.com` umumnya **tidak mengizinkan request langsung dari browser (client-side fetch)** karena kebijakan CORS. Solusinya: buat **Next.js API Route (server-side)** sebagai *proxy* — server Next.js yang fetch ke Roblox, lalu Next.js mengembalikan data ke client. Ini juga membantu menyembunyikan logic dari publik.
2. **Format respons avatar-3d**: endpoint ini biasanya mengembalikan status (`Completed`/`Pending`) dan jika selesai, sebuah URL JSON yang berisi referensi file model (`.obj`), material (`.mtl`), dan tekstur (gambar). File-file ini perlu di-fetch lagi lalu dirender pakai `three.js`/`react-three-fiber` di client. Perlu **polling/retry** jika status masih `Pending`.
3. **Rate limit & downtime**: Roblox bisa membatasi jumlah request per waktu, dan endpoint ini bukan API resmi yang dijamin stabil — sewaktu-waktu bisa berubah/bermasalah. **Wajib ada caching** (misalnya cache di Vercel Edge/ISR dengan revalidate beberapa jam) supaya tidak fetch berulang-ulang dan supaya website tetap jalan walau Roblox API lambat/down.
4. **Fallback UX**: jika fetch gagal/timeout, tampilkan avatar default/skeleton dengan pesan ramah — jangan biarkan layout rusak.
5. Tim disarankan memantau Developer Forum Roblox untuk perubahan endpoint, karena ini API tidak resmi yang bisa berubah tanpa pemberitahuan.

### 7.3 Data Model Member (contoh sederhana)

```json
{
  "members": [
    {
      "robloxUserId": 123456789,
      "role": "Owner",
      "joinDate": "2024-01-10"
    }
  ]
}
```
Username, display name, dan avatar akan di-fetch otomatis dari Roblox API berdasarkan `robloxUserId` — admin tidak perlu input manual data avatar.

### 7.4 Performa
- Lazy-load model 3D (hanya load saat modal/section avatar 3D dibuka, bukan saat page load awal).
- Image avatar 2D pakai `next/image` dengan optimasi otomatis.
- Animasi dibatasi agar tidak menyebabkan jank di device low-end (gunakan `will-change`, hindari animasi berat di banyak elemen sekaligus).

## 8. Non-Functional Requirements

- **Responsif**: mobile-first, tampil baik di HP, tablet, dan desktop.
- **Aksesibilitas**: kontras warna cukup, animasi punya opsi *reduced motion* untuk pengguna yang sensitif terhadap animasi (`prefers-reduced-motion`).
- **SEO dasar**: meta tag, Open Graph image untuk share link grup.
- **Keamanan**: tidak menyimpan data sensitif; hanya menggunakan data publik Roblox (userId, username, avatar).

## 9. Metrik Keberhasilan

- Waktu load awal halaman < 3 detik (di koneksi rata-rata).
- Avatar 2D tampil < 2 detik setelah halaman selesai render dasar.
- Tidak ada error layout meski Roblox API lambat/down (graceful fallback berfungsi).
- Feedback kualitatif dari member: tampilan dirasa "fun" dan representatif.

## 10. Risiko & Asumsi

| Risiko | Mitigasi |
|---|---|
| Roblox API tidak resmi bisa berubah/down sewaktu-waktu | Implementasi caching + fallback UI, monitoring berkala |
| Rate limit saat banyak member di-fetch sekaligus | Batching request, caching server-side, ISR/revalidate |
| Model 3D berat untuk device low-end | Lazy load, opsi toggle "matikan 3D" untuk device lemah |
| Animasi berlebihan justru mengganggu UX | User testing, dukung `prefers-reduced-motion` |

## 11. Roadmap / Fase Pengembangan (usulan)

| Fase | Fokus |
|---|---|
| **Fase 1 — MVP** | Setup Next.js + Tailwind, hero section animatif, galeri member dengan avatar 2D (via proxy API), deploy ke Vercel |
| **Fase 2** | Avatar 3D viewer (three.js/react-three-fiber), modal detail member |
| **Fase 3** | Polish animasi (scroll-trigger, page transition), halaman "Tentang Grup", footer sosial |
| **Fase 4 (opsional)** | Login dengan Roblox OAuth, dashboard admin untuk kelola member tanpa edit kode, integrasi Discord widget |

## 12. Ide Pengembangan Lanjutan (Future Enhancements)

- Leaderboard aktivitas member (jam main bersama, event grup).
- Integrasi live status "siapa yang online di game" via Roblox Presence API.
- Halaman event/pengumuman grup dengan kalender.
- Tema musiman (dekorasi animasi berubah saat hari besar/event Roblox tertentu).

---

*Dokumen ini adalah versi awal dan dapat disesuaikan seiring berkembangnya kebutuhan grup.*
