# IMPLEMENTATION PLAN: LANDING PAGE PORTOFOLIO "PEMBURU PERTALITE"

**Dokumen Acuan:** [BRIEF.md](file:///c:/Users/Aldo%20Saman/Documents/TUGAS/SEMESTER%203/PEMROGRAMAN%20WEB/UTS/BRIEF.md) (v2.0 Final Approved Specification)  
**Status:** Rencana Kerja Bertahap (Awaiting Execution Approval)  
**Arsitektur:** Web Statis Modular (HTML5 Semantik, Tailwind CSS CDN + CSS Variables, Vanilla JS ES6+)

---

## Ringkasan Prinsip Implementasi

1. **Dependency-First:** Fondasi dan token arsitektur diselesaikan terlebih dahulu sebelum membangun komponen dan antarmuka interaktif.
2. **Atomic Verification:** Setiap langkah memiliki mekanisme pengujian terpisah (*isolated testing*) untuk memastikan tidak ada regresi fungsi.
3. **Strict Risk Awareness:** Modul dengan kompleksitas tinggi (manajemen state modal, aksesibilitas trap-focus, dan alur validasi formulir) ditandai secara eksplisit beserta mitigasi risikonya.

---

## Daftar Langkah Implementasi

### Fase 1: Fondasi Arsitektur & Sistem Desain (Foundations)

#### Langkah 1: Perancangan Struktur Direktori & Berkas Awal
* **Deskripsi:** Membuat berkas modular awal: `index.html`, `style.css`, `script.js`, dan folder `assets/`. Menyiapkan boilerplate HTML5 semantik, meta viewport responsif, tautan Google Fonts (*Inter* & *JetBrains Mono*), skrip Tailwind CSS (CDN), serta tautan ke `style.css` dan `script.js`.
* **Kriteria Pengujian (Testing):** Buka `index.html` di browser; pastikan tidak ada pesan error `404` pada panel console browser, font ter-load dengan benar, dan Tailwind CDN aktif.
* **Tingkat Risiko:** **Rendah** (Scaffolding standar).

---

#### Langkah 2: Konfigurasi Design Tokens & Variabel CSS Dual-Theme
* **Deskripsi:** Mendefinisikan seluruh variabel CSS di `style.css` untuk Light Mode dan Dark Mode (`--bg-canvas`, `--bg-surface`, `--border-subtle`, `--text-primary`, `--accent-solid`, dll.) sesuai tabel token di `BRIEF.md`. Mengonfigurasi utilitas Tailwind agar terikat dengan variabel tersebut.
* **Kriteria Pengujian (Testing):** Tambahkan kartu uji sederhana di markup. Ganti kelas `.dark` secara manual pada elemen `<html>` via Developer Tools; pastikan seluruh token warna latar, teks, dan garis batas berganti serentak tanpa *glitch*.
* **Tingkat Risiko:** **Sedang** *(Perlu memastikan prioritas styling antara Tailwind utility classes dan CSS custom variables tidak saling menimpa secara inkonsisten).*

---

#### Langkah 3: Implementasi Logika Theme Toggle & Persistensi `localStorage`
* **Deskripsi:** Menulis fungsi JavaScript pada `script.js` untuk mendeteksi preferensi tema bawaan sistem operasi (`prefers-color-scheme`), membaca status yang tersimpan di `localStorage`, dan mengaktifkan kelas `.dark` pada `<html>`. Menyediakan fungsi saklar (*toggle handler*).
* **Kriteria Pengujian (Testing):** Klik tombol toggle uji coba; tema harus berganti seketika. Muat ulang (*refresh*) halaman atau buka di tab penyamaran (*incognito*); tema terakhir yang dipilih harus tetap bertahan.
* **Tingkat Risiko:** **Rendah**.

---

### Fase 2: Kerangka Navigasi & Shell Aplikasi

#### Langkah 4: Implementasi Sticky Navbar & Navigasi Responsif
* **Deskripsi:** Membangun komponen `<header>` dan `<nav>` dengan efek `backdrop-blur` persisten di posisi atas. Berisi: Logo teks `PEMBURU PERTALITE` dengan status dot hijau, tautan navigasi desktop (*smooth scroll*), tombol `Theme-Toggle` dengan ikon SVG Sun/Moon, dan tombol menu hamburger untuk perangkat mobile. Menambahkan logika JS untuk menu *dropdown slide-down* pada resolusi `< 768px`.
* **Kriteria Pengujian (Testing):** 
  1. Uji di desktop: klik link navigasi, pastikan halaman bergulir halus ke target id.
  2. Uji di mobile (< 768px): klik hamburger, pastikan dropdown muncul meluncur ke bawah (*slide-down*), dan otomatis menutup saat salah satu tautan ditekan.
* **Tingkat Risiko:** **Rendah**.

---

### Fase 3: Seksi Konten Statis & Profil

#### Langkah 5: Implementasi Hero Section (`screen-home`)
* **Deskripsi:** Membangun viewport pembuka dengan kontras tinggi: Status badge tim (*"● Software Engineering Team • Available for Collaboration"*), judul H1 geometris tebal, paragraf pernyataan misi teknis, tombol primer CTA `Button-Solid` ("Jelajahi Proyek" -> anchor ke `#projects`), dan tombol sekunder `Button-Ghost` ("Hubungi Tim" -> anchor ke `#contact`).
* **Kriteria Pengujian (Testing):** Periksa keterbacaan teks dan rasio kontras pada Light Mode dan Dark Mode. Pastikan kedua tombol aksi mengarah ke seksi yang benar secara presisi.
* **Tingkat Risiko:** **Rendah**.

---

#### Langkah 6: Implementasi Seksi Tentang Kami (`screen-about`)
* **Deskripsi:** Membangun seksi narasi tim dengan judul H2, teks pengantar, dan grid 3 kartu pilar rekayasa perangkat lunak (*System Architecture*, *Code Quality & Standards*, *Agile Execution*). Menggunakan komponen `Card-Container` dengan border tipis dan efek *hover border highlight*.
* **Kriteria Pengujian (Testing):** Uji tampilan kartu di 1 kolom (mobile), 2 kolom (tablet), dan 3 kolom (desktop). Pastikan ketinggian antar-kartu sejajar (*uniform height*).
* **Tingkat Risiko:** **Rendah**.

---

#### Langkah 7: Implementasi Seksi Tim (`screen-team`) dengan Avatar Monogram
* **Deskripsi:** Membangun grid 5 profil anggota kelompok. Tiap kartu memuat: **Avatar Monogram Geometris** (inisial nama 2 huruf berlatar kontras tinggi), Nama Lengkap, Nomor Identitas (NIM), Peran Teknis spesifik, dan daftar badge keahlian. Layout disusun 3 kartu di baris atas dan 2 kartu terpusat rapi di baris bawah pada layar desktop.
* **Kriteria Pengujian (Testing):** Pastikan 2 kartu di baris kedua pada layar desktop terpusat secara simetris (*balanced alignment*), serta tidak ada teks peran yang terpotong pada layar mobile.
* **Tingkat Risiko:** **Rendah**.

---

### Fase 4: Fitur Interaktif Kompleks & Validasi (Critical Path)

#### Langkah 8: Implementasi Seksi Katalog Proyek (`screen-projects`)
* **Deskripsi:** Menyusun grid 3 kartu proyek rekayasa perangkat lunak (Enterprise Task Engine, Algorithmic Code Visualizer, Distributed Metric Dashboard). Setiap kartu menampilkan tag kategori mono, judul proyek, ringkasan arsitektur, tech stack badges, dan tombol interaktif "Lihat Detail →" yang menyimpan ID proyek (`data-project-id`).
* **Kriteria Pengujian (Testing):** Pastikan seluruh atribut data tersemat dengan tepat pada tombol tiap kartu.
* **Tingkat Risiko:** **Rendah**.

---

#### Langkah 9: [BERISIKO TINGGI] Implementasi Modal Dialog Proyek Dinamis (`Modal-Project-Detail`)
* **Deskripsi:** Membangun komponen dialog pop-up monokromatik di `script.js` dan `index.html`. Saat tombol "Lihat Detail →" diklik, modal menampilkan data proyek lengkap: Judul, Kategori, Deskripsi Solusi, Daftar Fitur Utama, Tech Stack Badges, serta tombol tautan "Live Demo" dan "Source Code".
* **Mengapa Berisiko Tinggi:**
  1. **Scrollbar Jump & Body Locking:** Penguncian scroll latar belakang (`overflow: hidden`) sering menimbulkan pergeseran tata letak horizontal (*layout shift*) jika kompensasi lebar scrollbar tidak ditangani dengan teliti.
  2. **Accessibility & Trap Focus:** Modal harus mematuhi standar aksesibilitas (`role="dialog"`, `aria-modal="true"`), mengunci fokus navigasi keyboard di dalam modal, serta wajib merespons 3 metode penutupan: tombol silang (`X`), klik area backdrop gelap luar, dan tombol keyboard `Escape`.
* **Kriteria Pengujian (Testing):**
  - Klik kartu 1, 2, dan 3: pastikan isi modal berganti sesuai data proyek yang diklik.
  - Tekan tombol `Escape`: pastikan modal tertutup dan scroll halaman kembali normal.
  - Klik area gelap di luar modal: pastikan modal tertutup tanpa memicu klik pada elemen di bawahnya.
* **Tingkat Risiko:** 🔴 **TINGGI** (State management, DOM rendering dinamis, keyboard events, & UI locking).

---

#### Langkah 10: [BERISIKO SEDANG/TINGGI] Implementasi Formulir Kontak (`screen-contact`) & Logika Simulasi Asynchronous
* **Deskripsi:** Membangun formulir kontak dengan input Nama Lengkap, Alamat Email, dan Pesan. Menulis logika validasi sisi klien (JS) dan transisi 4 kondisi antarmuka (*state*):
  1. *Normal State:* Input siap diisi.
  2. *Error State:* Validasi input gagal (nama kosong, format email salah via regex, pesan < 10 karakter); garis border berubah merah tegas (`--state-error`) dengan pesan kesalahan spesifik di bawah field.
  3. *Loading State:* Tombol dinonaktifkan (`disabled`), memunculkan indikator spinner dan teks *"Mengirim..."* selama 1 detik (simulasi async).
  4. *Success State:* Menampilkan kotak notifikasi konfirmasi sukses monokromatis dan me-reset seluruh isi form.
* **Mengapa Berisiko:**
  1. Penanganan event `submit` harus dicegah dari reload halaman bawaan (`e.preventDefault()`).
  2. Mencegah potensi *double-submission* jika pengguna menekan tombol berkali-kali secara cepat.
  3. Validasi regex email harus akurat tanpa menolak format email yang valid.
* **Kriteria Pengujian (Testing):**
  - Kirim form kosong: pastikan border merah muncul dan pesan tidak terkirim.
  - Masukkan format email salah (misal: `test@`): pastikan error muncul.
  - Kirim data valid: pastikan tombol disable, teks berubah *"Mengirim..."* selama ~1 detik, lalu muncul kotak notifikasi sukses dan form bersih kembali.
* **Tingkat Risiko:** 🟡 **SEDANG / TINGGI** (State machine, validasi regex, async timing, error feedback).

---

### Fase 5: Penutup, Aksesibilitas, & Audit Mutu

#### Langkah 11: Implementasi Footer & Navigasi Scroll to Top
* **Deskripsi:** Membangun seksi `<footer>` dengan logo teks ringkas, teks hak cipta resmi "Pemburu Pertalite", tautan repositori proyek, dan tombol pintas gulir kembali ke atas halaman (*Back to Top*).
* **Kriteria Pengujian (Testing):** Pastikan footer rapi di layar mobile maupun desktop, dan tombol scroll to top mengembalikan viewport ke paling atas secara halus.
* **Tingkat Risiko:** **Rendah**.

---

#### Langkah 12: Audit Komprehensif Aksesibilitas, Kontras, & Lintas Resolusi
* **Deskripsi:** Pengujian akhir menyeluruh:
  1. Aksesibilitas keyboard (menjelajahi seluruh tombol dan tautan dengan tombol `Tab`).
  2. Uji kontras warna WCAG AAA pada kedua tema (Light & Dark).
  3. Pengujian responsivitas pada breakpoint: Mobile (375px/414px), Tablet (768px), dan Desktop (1024px/1440px).
  4. Verifikasi console browser bersih dari warning dan error.
* **Kriteria Pengujian (Testing):** Semua fungsi berjalan tanpa cela, tidak ada layout pecah, dan tema bertahan sempurna di semua kondisi pengujian.
* **Tingkat Risiko:** **Rendah** (Quality Assurance).
