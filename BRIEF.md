# DESIGN BRIEF & TECHNICAL SPECIFICATION: PORTOFOLIO "PEMBURU PERTALITE"

**Status:** FINAL APPROVED SPECIFICATION  
**Versi:** 2.0 (Post-Clarification)  
**Peran:** Senior Product Designer & Lead Frontend Engineer  
**Proyek:** Landing Page Portofolio Tim Software Engineering "Pemburu Pertalite" (5 Anggota)  
**Arah Desain:** *Clean Monochrome / Minimalist High-Contrast* (Terinspirasi dari estetika `antigravity.google`, Vercel Design System, dan Linear — fungsional, industrial, tajam, profesional).

---

## 1. Design Principles (3 Aturan Wajib)

1. **Radical Clarity over Decoration:** Setiap elemen visual harus memiliki fungsi struktural yang jelas. Menghindari ornamen grafis atau ilustrasi abstrak tanpa fungsi teknis. Estetika dibangun dari ketelitian sistem grid, kontras tajam, dan tipografi struktural.
2. **High-Contrast Monolith (Dual-Theme):** Memaksimalkan kontras antara hitam dan putih secara ekstrem baik pada mode Terang (*Light Mode*) maupun Gelap (*Dark Mode*). Menciptakan pengalaman visual yang tegas, ergonomis untuk mata pengembang, dan mencerminkan perangkat lunak kelas enterprise.
3. **Developer-First Ergonomics:** Tata letak dan alur navigasi dirancang menyerupai dokumentasi teknis atau platform pengembang modern (bersih, terstruktur, berbasis grid tegas), mencerminkan identitas tim rekayasa perangkat lunak profesional independen.

---

## 2. Visual Direction & Tone of Voice

* **Mood:** Profesional, industrial, minimalis tajam, modern, presisi, dan terstruktur.
* **Tone of Voice:** Sepenuhnya formal, teknis, dan berorientasi standar rekayasa perangkat lunak industri (tanpa atribut institusi akademik dan tanpa analogi kasual/humor bahan bakar).
* **Referensi Utama:** `antigravity.google`, Vercel Design System, Linear, dan dokumentasi Stripe.
* **Yang Dilarang / Dihindari:**
  * Efek gradien warna-warni yang mencolok (pastel, neon, pelangi).
  * Ilustrasi kartun/vektor bergaya startup generik.
  * Radius sudut yang terlalu bulat (*rounded-3xl* atau elips berlebihan).
  * Efek bayangan kabur (*blurry shadow*) yang kotor; pemisahan kontainer wajib mengandalkan garis border 1px yang tegas.

---

## 3. Tech Stack & Arsitektur Berkas

Proyek ini dibangun menggunakan arsitektur web statis modular yang bersih dan terpisah:

```text
UTS/
├── index.html              # Struktur markup semantik HTML5 utama
├── style.css               # Styling kustom, variabel CSS, overrides, & animasi
├── script.js               # Logika DOM: Theme toggle, Modal controller, Mobile menu, Form validation
└── assets/                 # Aset pendukung (ikon SVG, favicon, dll.)
```

* **Framework CSS:** Tailwind CSS (via CDN) dengan ekstensi kelas utilitas dan variabel CSS native.
* **Tipografi:** Google Fonts — *Inter* atau *Plus Jakarta Sans* (Sans-serif geometris modern) dipadukan *JetBrains Mono* / *Fira Code* untuk elemen kode/tag teknis.
* **JavaScript:** Vanilla JS murni (ES6+) tanpa dependensi pihak ketiga, mengelola:
  * Saklar tema Dark/Light dengan persistensi `localStorage`.
  * Dialog modal proyek lengkap dengan interaksi keyboard (`Escape`) dan klik backdrop.
  * Navigasi mobile dropdown slide-down responsif.
  * Validasi formulir kontak dan simulasi pengiriman pesan asynchronous.

---

## 4. Design Tokens (Dual-Theme System)

Token warna dirancang dengan sistem CSS Variables yang bertransisi dinamis antara Light Mode dan Dark Mode:

### A. Palet Warna (Color System)

| Token Name | Light Mode (Default) | Dark Mode (`.dark`) | Fungsi / Penggunaan |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#FFFFFF` | `#09090B` | Latar belakang dasar halaman utama |
| `--bg-surface` | `#FAFAFA` | `#121214` | Latar kartu, container sekunder, dan input |
| `--bg-surface-hover` | `#F4F4F5` | `#18181B` | Efek hover pada kartu dan container interaktif |
| `--border-subtle` | `#E4E4E7` | `#27272A` | Garis pembatas grid, separator, dan outline kartu |
| `--border-strong` | `#18181B` | `#FAFAFA` | Garis border saat status hover/fokus aktif |
| `--text-primary` | `#09090B` | `#FAFAFA` | Tipografi judul (H1-H3), teks utama, label form |
| `--text-secondary` | `#71717A` | `#A1A1AA` | Paragraf deskripsi, metadata, dan teks keterangan |
| `--accent-solid` | `#18181B` | `#FAFAFA` | Tombol utama (CTA) dan badge aktif |
| `--accent-contrast` | `#FFFFFF` | `#09090B` | Warna teks di atas tombol `--accent-solid` |
| `--state-error` | `#EF4444` | `#F87171` | Garis border dan pesan saat input formulir tidak valid |
| `--state-success` | `#10B981` | `#34D399` | Indikator status berhasil pada notifikasi pesan |

### B. Tipografi & Hierarki Skala

* **Font Family:** 
  * Utama: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  * Monospace / Code: `'JetBrains Mono', 'Fira Code', monospace`
* **Skala Tipografi:**
  * *Display / H1:* `48px` (Mobile: `36px`) | Line-height: `1.1` | Weight: `800` (Bold)
  * *H2 (Section Header):* `32px` (Mobile: `26px`) | Line-height: `1.2` | Weight: `700` (Bold)
  * *H3 (Card Title / Subhead):* `20px` | Line-height: `1.4` | Weight: `600` (Semibold)
  * *Body Text:* `16px` | Line-height: `1.6` | Weight: `400` (Regular)
  * *Caption / Label:* `13px` | Line-height: `1.5` | Weight: `500` (Medium)
  * *Code / Mono Tag:* `12px` | Line-height: `1.4` | Weight: `600` (Semibold)

### C. Spacing, Radius, & Elevation

* **Grid & Spacing:** Skala 8pt (`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px`).
* **Border Radius:**
  * `rounded-none` (0px) untuk pemisah arsitektural dan section wrapper.
  * `rounded-md` (6px) untuk tombol, input form, badge, dan kartu kontainer.
* **Elevation / Bayangan:**
  * `shadow-none` secara default; kedalaman ruang diciptakan oleh hierarki warna latar `--bg-surface` dan garis border 1px `--border-subtle`.
  * Khusus Modal Dialog: Shadow monokromatik halus berdensitas tinggi (`0 20px 25px -5px rgba(0, 0, 0, 0.3)`).

---

## 5. Screen Inventory & Struktur Halaman

Halaman berupa **Single Page Application (SPA) Statis** dengan sistem navigasi *smooth anchor scroll*:

1. **Sticky Navbar:** Navigasi atas persisten dengan logo teks kelompok, tautan navigasi seksi, saklar tema Dark/Light, dan tombol pemicu menu mobile.
2. **Hero Section (`screen-home`):** Viewport pembuka dengan status badge tim, tajuk H1 kontras tinggi, pernyataan misi teknis, dan sepasang tombol aksi (Primary CTA & Secondary Ghost).
3. **Tentang Kami (`screen-about`):** Penjelasan esensi teknis tim dengan grid 3 kartu pilar rekayasa perangkat lunak (Arsitektur Sistem, Kualitas Kode, Kolaborasi Agile).
4. **Katalog Proyek (`screen-projects`):** Grid kartu portofolio yang memamerkan 3 proyek rekayasa perangkat lunak terpilih, dilengkapi tombol aksi pemicu Modal Detail Proyek.
5. **Profil Tim (`screen-team`):** Grid 5 kartu anggota kelompok dengan avatar monogram inisial geometris, nama, nomor identitas (NIM), peran teknis spesifik, dan daftar keahlian.
6. **Formulir Kontak (`screen-contact`):** Modul interaksi pengunjung berupa formulir input terstruktur lengkap dengan penanganan status validasi dan simulasi pengiriman pesan.
7. **Footer:** Penutup halaman dengan identitas tim, hak cipta, dan tautan repositori kode.

---

## 6. Spesifikasi Interaksi & Alur Kerja (User Flows)

### A. Alur Pergantian Tema (Dark / Light Mode)
1. Sistem mengecek preferensi tersimpan di `localStorage.getItem('portfolio-theme')`.
2. Jika belum ada, sistem membaca preferensi OS pengguna melalui `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Pengguna dapat menekan tombol `Theme-Toggle` pada Navbar kapan saja.
4. Kelas `.dark` ditambahkan/dihapus pada elemen `<html>` secara instan dengan transisi warna halus. Preferensi baru disimpan ke `localStorage`.

### B. Alur Navigasi Mobile (Dropdown Slide-down)
1. Pada resolusi layar `< 768px`, tautan navigasi horizontal desktop disembunyikan.
2. Tombol hamburger (ikon garis 3 minimalis) muncul di sisi kanan navbar.
3. Saat diklik, menu dropdown meluncur ke bawah (*slide-down*) tepat di bawah bar navigasi dengan latar belakang `--bg-surface` padat dan border bawah tegas.
4. Menekan tautan seksi akan menutup menu secara otomatis dan melakukan *smooth scroll* ke seksi target.

### C. Alur Modal Dialog Proyek (Pop-up Detail Lengkap)
1. Pengguna menekan tombol "Lihat Detail →" pada salah satu kartu proyek di `screen-projects`.
2. Modal terbuka dengan animasi pudar lembut (*fade-in*). Latar belakang halaman diburamkan dan digelapkan (*backdrop overlay*), serta scroll body dinonaktifkan (`overflow: hidden`).
3. Modal memuat data proyek lengkap:
   * Header: Judul Proyek & Kategori/Tipe Sistem.
   * Deskripsi Komprehensif: Latar belakang dan arsitektur pemecahan masalah.
   * Daftar Fitur Utama: Bullet list terstruktur dengan ikon centang monokrom.
   * Tech Stack Badges: Tag teknologi (misal: *JavaScript*, *Tailwind*, *PostgreSQL*, *REST API*).
   * Tombol Aksi: Tautan menuju "Live Demo" dan "Source Code / GitHub".
4. Pengguna dapat menutup modal dengan 3 cara:
   * Menekan tombol silang (`X`) di sudut kanan atas modal.
   * Mengklik area latar luar (*backdrop click*).
   * Menekan tombol keyboard `Escape` (`Esc`).

### D. Alur Formulir Kontak & Simulasi Pengiriman
1. Pengguna mengisi kolom: Nama Lengkap, Alamat Email, dan Pesan Teknis.
2. Saat menekan tombol "Kirim Pesan":
   * **Validasi Input:** Script memeriksa kekosongan kolom dan format valid email via regex. Jika tidak valid, border kolom berubah merah (`--state-error`) dan teks pesan kesalahan tampil di bawah kolom yang bersangkutan.
   * **Loading State:** Jika input valid, tombol kirim dinonaktifkan (`disabled`), teks berubah menjadi *"Mengirim..."*, dan ikon putar (*spinner*) minimalis berputar selama 1 detik (simulasi asinkron).
   * **Success State:** Formulir disembunyikan sementara atau diganti dengan kotak notifikasi monokromatik tegas bertuliskan *"Pesan Anda telah berhasil terkirim. Tim kami akan segera meninjau pesan tersebut."* Form di-reset ke kondisi awal.

---

## 7. Data Inventory (Spesifikasi Konten Placeholder)

### A. Profil 5 Anggota Tim (`screen-team`)
Setiap anggota ditampilkan dalam kartu terstruktur dengan **Monogram Avatar Geometris** (kotak/lingkaran dengan inisial nama 2 huruf berlatar kontras tinggi):

1. **Anggota 1:**
   * Nama: `Aldo Saman` (NIM: `2301010001` - Placeholder)
   * Role: `Lead Architect & Fullstack Engineer`
   * Keahlian: `System Architecture, JavaScript (ES6+), Database Design`
   * Inisial Avatar: `AS`
2. **Anggota 2:**
   * Nama: `Anggota Tim 2` (NIM: `2301010002` - Placeholder)
   * Role: `Frontend UI/UX Specialist`
   * Keahlian: `Modern CSS/Tailwind, Semantic HTML, Responsive Design`
   * Inisial Avatar: `AT`
3. **Anggota 3:**
   * Nama: `Anggota Tim 3` (NIM: `2301010003` - Placeholder)
   * Role: `Backend & API Developer`
   * Keahlian: `RESTful API, State Handling, Asynchronous JS`
   * Inisial Avatar: `AB`
4. **Anggota 4:**
   * Nama: `Anggota Tim 4` (NIM: `2301010004` - Placeholder)
   * Role: `Quality Assurance & Security`
   * Keahlian: `Client Validation, Testing, Accessibility (WCAG AAA)`
   * Inisial Avatar: `AQ`
5. **Anggota 5:**
   * Nama: `Anggota Tim 5` (NIM: `2301010005` - Placeholder)
   * Role: `Technical Writer & Scrum Master`
   * Keahlian: `Documentation, Workflow Optimization, Asset Optimization`
   * Inisial Avatar: `AT`

### B. 3 Kartu Proyek Rekayasa Perangkat Lunak (`screen-projects`)
1. **Proyek 1: Enterprise Task Engine**
   * Kategori: `Productivity & Workflow System`
   * Ringkasan: Sistem manajemen alur kerja berbasis antrean dengan kapabilitas pelacakan metrik performa real-time.
   * Tech Stack: `HTML5`, `Tailwind CSS`, `Vanilla JS`, `LocalStorage API`
2. **Proyek 2: Algorithmic Code Visualizer**
   * Kategori: `Educational & Developer Tool`
   * Ringkasan: Platform visualisasi struktur data dan algoritma traversal graf secara interaktif langkah-demi-langkah.
   * Tech Stack: `JavaScript`, `Canvas API`, `CSS Grid`, `Data Structures`
3. **Proyek 3: Distributed Metric Dashboard**
   * Kategori: `Infrastructure Monitoring`
   * Ringkasan: Antarmuka pemantauan telemetri server ringan dengan latensi ultra-rendah dan visualisasi log monokromatik.
   * Tech Stack: `WebSockets Mock`, `DOM Manipulation`, `Tailwind CSS`, `Micro-Charts`

---

## 8. Component Library & Class Specs

* **`Navbar`:**
  * Kontainer: `fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-canvas/80 border-b border-subtle h-16`
  * Logo: Teks tebal monospace/sans `PEMBURU PERTALITE` dengan indikator status dot hijau kecil.
  * Nav-Link: `text-sm font-medium text-secondary hover:text-primary transition-colors`
* **`Button-Solid`:**
  * `h-11 px-6 rounded-md bg-accent-solid text-accent-contrast font-medium text-sm inline-flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-[0.98]`
* **`Button-Ghost`:**
  * `h-11 px-6 rounded-md bg-transparent border border-subtle text-primary font-medium text-sm inline-flex items-center justify-center transition-all duration-200 hover:bg-surface-hover hover:border-strong`
* **`Card-Container`:**
  * `bg-surface border border-subtle rounded-md p-6 transition-all duration-200 hover:border-strong`
* **`Avatar-Monogram`:**
  * `w-14 h-14 rounded-md bg-accent-solid text-accent-contrast font-bold text-lg inline-flex items-center justify-center border border-subtle select-none tracking-wider`
* **`Modal-Project-Detail`:**
  * Backdrop: `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity`
  * Dialog: `bg-surface border border-subtle rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative`
* **`Form-Input` & `Textarea`:**
  * `w-full rounded-md border border-subtle bg-surface px-4 py-3 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-strong transition-colors`
* **`Badge-Tag`:**
  * `inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-surface border border-subtle text-secondary`

---

## 9. Responsive Breakpoints

* **Mobile (`< 768px`):**
  * Layout: Single-column (`grid-cols-1`).
  * Navigasi: Menu hamburger dengan slide-down dropdown menu.
  * Padding: Padding horizontal kontainer `px-4` atau `px-6`.
  * Grid Tim: 5 kartu disusun vertikal dengan ukuran proporsional.
* **Tablet (`768px` s/d `1024px`):**
  * Layout: Grid proyek 2 kolom (`grid-cols-2`).
  * Grid Tim: 2 kolom dengan kartu ke-5 memanjang atau terpusat rapi.
  * Padding horizontal: `px-8`.
* **Desktop (`> 1024px`):**
  * Layout: Kontainer terpusat dengan batasan lebar `max-w-7xl mx-auto px-8`.
  * Grid Proyek: 3 kolom sejajar (`grid-cols-3`).
  * Grid Tim: Baris atas 3 kolom dan baris bawah 2 kolom terpusat (`flex justify-center gap-6`), menciptakan keseimbangan visual optimal untuk 5 anggota.

---

## 10. Accessibility (Aksesibilitas) & Kualitas

* **Rasio Kontras WCAG AAA:** Kombinasi warna teks utama dan latar belakang memiliki kontras rasio minimal `12:1` baik pada Light Mode maupun Dark Mode.
* **Keyboard Navigation:** Seluruh elemen interaktif dapat dijelajahi menggunakan tombol `Tab`. Indikator garis fokus aktif menggunakan `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary`.
* **Atribut Aksesibilitas (ARIA):**
  * Tombol menu mobile dilengkapi `aria-expanded` dan `aria-label="Toggle menu"`.
  * Saklar tema dilengkapi `aria-label="Toggle dark mode"`.
  * Modal dialog menggunakan `role="dialog"`, `aria-modal="true"`, dan `aria-labelledby="modal-title"`.
* **SEO & Semantik HTML5:** Penggunaan hirarki tag yang benar (`<header>`, `<nav>`, `<main>`, `<section id="...">`, `<article>`, `<footer>`, satu `<h1>` per halaman).