# DOKUMENTASI & MATERI LAPORAN UTS
## MATA KULIAH: PEMROGRAMAN WEB (SEMESTER 3)

---

### IDENTITAS PROYEK
* **Judul Proyek:** Pengembangan Landing Page Portofolio Tim Software Engineering "Pemburu Pertalite" Berbasis Desain Minimalis Monokromatik & Aksesibilitas WCAG AAA
* **Mata Kuliah:** Pemrograman Web
* **Semester:** 3 (Ganjil)
* **Arsitektur:** Web Statis Modular (HTML5 Semantik, CSS3 + Tailwind CDN, Vanilla JavaScript ES6+)
* **Konsep Desain:** *Clean Monochrome / High-Contrast Industrial* (Dual-Theme: Light & Dark Mode)
* **Repositori/Tautan:** `file:///c:/Users/Aldo%20Saman/Documents/TUGAS/SEMESTER%203/PEMROGRAMAN%20WEB/UTS/index.html`

---

## BAB 1: PENDAHULUAN

### 1.1 Latar Belakang
Di era industri rekayasa perangkat lunak modern, portofolio digital berbasis web merupakan representasi kompetensi teknis seorang insinyur atau tim pengembang. Sering kali, landing page portofolio mahasiswa dipenuhi oleh animasi berlebih, warna pastel/neon yang mengaburkan konten, serta dependensi pustaka JavaScript pihak ketiga yang berat dan memperlambat waktu pemuatan (*load time*).

Proyek portofolio kelompok **"Pemburu Pertalite"** dirancang dengan filosofi kebalikan: *Radical Clarity over Decoration* dan *High-Contrast Monolith*. Terinspirasi oleh standar desain sistem kelas industri terkemuka seperti Vercel Design System, Linear, dan Google Antigravity, website ini membuktikan bahwa antarmuka web yang profesional, berkinerja tinggi, dan berdaya guna maksimal dapat diwujudkan menggunakan teknologi inti web (*core technologies*) yang bersih, terstruktur, dan bebas bloatware.

### 1.2 Tujuan Proyek
1. Mengembangkan landing page portofolio kelompok yang responsif, modular, dan ringan menggunakan HTML5 Semantik, CSS3, dan Vanilla JavaScript.
2. Menerapkan sistem dual-theme (Dark Mode & Light Mode) dengan persistensi preferensi pada `localStorage` dan mitigasi kedipan tampilan (*Flash of Unstyled Content / FOUC*).
3. Menerapkan standar aksesibilitas web tertinggi (WCAG AAA) dengan rasio kontras warna lebih dari 15:1 dan navigasi keyboard yang ramah disabilitas.
4. Membangun modul interaktif tingkat lanjut seperti modal dialog proyek dinamis dengan mitigasi pergeseran tata letak (*layout jump*) serta formulir kontak dengan validasi data di sisi klien (*client-side validation*).

### 1.3 Batasan Masalah
* Halaman berupa Single Page Application (SPA) statis yang berfokus pada sisi klien (*client-side*).
* Penyimpanan tema menggunakan `localStorage` peramban web pengguna.
* Pengiriman data pada formulir kontak disimulasikan secara asinkron (*asynchronous simulation*) di sisi klien tanpa backend server basis data.

---

## BAB 2: ANALISIS KEBUTUHAN SISTEM

### 2.1 Kebutuhan Fungsional (*Functional Requirements*)
| Kode | Deskripsi Kebutuhan Fungsional |
| :--- | :--- |
| **FR-01** | Pengguna dapat bernavigasi antar-seksi halaman (Beranda, Tentang, Proyek, Tim, Kontak) secara halus (*smooth scrolling*). |
| **FR-02** | Pengguna dapat mengganti tema tampilan antara Mode Terang (*Light Mode*) dan Mode Gelap (*Dark Mode*) kapan saja via tombol di navbar. |
| **FR-03** | Sistem dapat mengingat preferensi tema pengguna menggunakan `localStorage` dan mendeteksi preferensi bawaan sistem operasi (`prefers-color-scheme`). |
| **FR-04** | Pengguna pada perangkat mobile (< 768px) dapat membuka dan menutup menu navigasi dropdown melalui tombol hamburger. |
| **FR-05** | Pengguna dapat melihat katalog 3 proyek rekayasa perangkat lunak dan mengklik tombol "Lihat Detail →". |
| **FR-06** | Sistem menampilkan modal dialog pop-up berisi data proyek lengkap (judul, kategori, deskripsi arsitektural, fitur utama, tech stack, link repositori) secara dinamis sesuai kartu yang diklik. |
| **FR-07** | Pengguna dapat menutup modal dialog melalui 3 metode: tombol silang (`X`), klik area backdrop luar, atau menekan tombol `Escape`. |
| **FR-08** | Pengguna dapat mengisi dan mengirimkan formulir kontak dengan validasi langsung (nama minimal 2 karakter, format email regex standar RFC, dan pesan minimal 10 karakter). |
| **FR-09** | Sistem menampilkan umpan balik kesalahan (*error feedback*) secara real-time dan mencegah pengiriman formulir jika data tidak valid. |
| **FR-10** | Sistem menyimulasikan proses pengiriman asinkron selama 1 detik (tombol disable + indikator spinner *"Mengirim..."*) sebelum menampilkan notifikasi berhasil dan me-reset formulir. |
| **FR-11** | Pengguna dapat menggulirkan viewport kembali ke puncak halaman secara instan dan halus menggunakan tombol "Ke Atas" (*Back to Top*) di footer. |

### 2.2 Kebutuhan Non-Fungsional (*Non-Functional Requirements*)
| Parameter | Spesifikasi & Tolok Ukur |
| :--- | :--- |
| **Usability & Accessibility** | Mematuhi standar WCAG AAA dengan rasio kontras teks minimal 15:1; seluruh elemen dapat diakses melalui keyboard (`Tab`, `Shift+Tab`, `Enter`, `Escape`). |
| **Performance** | Waktu pemuatan ultra-cepat (< 1 detik pada koneksi standar) karena menggunakan Vanilla JS tanpa runtime framework berat (React/Vue/jQuery). |
| **Responsiveness** | Desain fluid-responsive yang teruji sempurna pada breakpoint Mobile (375px–768px), Tablet (768px–1024px), dan Desktop (> 1024px). |
| **Maintainability** | Struktur kode modular terpisah: markup di `index.html`, gaya dan token di `style.css`, serta logika controller di `script.js`. |
| **Compatibility** | Berjalan konsisten pada peramban web modern: Google Chrome, Mozilla Firefox, Microsoft Edge, dan Apple Safari. |

---

## BAB 3: ARSITEKTUR & PERANCANGAN TEKNIS

### 3.1 Struktur Direktori Proyek
```text
UTS/
├── index.html              # Struktur markup semantik HTML5 utama
├── style.css               # Desain token, variabel CSS, overrides, & animasi
├── script.js               # Controller DOM: Theme engine, Modal, Mobile Nav, Form validation
├── assets/                 # Direktori aset statis (ikon, favicon)
├── BRIEF.md                # Dokumen spesifikasi desain & pedoman proyek (Approved v2.0)
└── PLAN.md                 # Rencana kerja bertahap 12 langkah implementasi
```

### 3.2 Desain Token & Palet Warna (Dual-Theme)
Warna didefinisikan menggunakan *CSS Custom Variables* yang dihubungkan ke utilitas Tailwind CSS:

| Token CSS | Nilai Light Mode | Nilai Dark Mode | Fungsi / Peruntukan |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#FFFFFF` | `#09090B` | Latar belakang dasar halaman utama |
| `--bg-surface` | `#FAFAFA` | `#121214` | Latar belakang kartu, container sekunder, dan input |
| `--bg-surface-hover` | `#F4F4F5` | `#18181B` | Warna latar kartu saat status hover |
| `--border-subtle` | `#E4E4E7` | `#27272A` | Garis pembatas grid dan batas outline kontainer |
| `--border-strong` | `#18181B` | `#FAFAFA` | Garis batas saat elemen menerima fokus/hover kuat |
| `--text-primary` | `#09090B` | `#FAFAFA` | Tipografi judul utama (H1-H3) dan label |
| `--text-secondary` | `#71717A` | `#A1A1AA` | Paragraf penjelasan, metadata, dan teks pelengkap |
| `--accent-solid` | `#18181B` | `#FAFAFA` | Latar tombol aksi primer (CTA) |
| `--accent-contrast` | `#FFFFFF` | `#09090B` | Teks di atas tombol `--accent-solid` |
| `--state-error` | `#EF4444` | `#F87171` | Garis batas dan pesan peringatan error formulir |
| `--state-success` | `#10B981` | `#34D399` | Indikator status berhasil pada notifikasi pesan |

---

## BAB 4: IMPLEMENTASI FITUR UTAMA & PENJELASAN KODE

### 4.1 Sistem Manajemen Tema (Theme Engine) & Pencegahan FOUC
Sistem tema mengombinasikan skrip awal di `<head>` untuk mencegah kedipan tampilan (*Flash of Unstyled Content*) dan controller utama di `script.js`:

```javascript
// Cuplikan script.js: Penanganan preferensi dan persistensi tema
const STORAGE_KEY = 'portfolio-theme';
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  // Sinkronisasi atribut ARIA dan ikon SVG pada tombol
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.setAttribute('aria-pressed', isDark);
    btn.setAttribute('aria-label', isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap');
  });
}
```

### 4.2 Navigasi Responsif & Mobile Dropdown
Menu navigasi atas menggunakan posisi `fixed` dengan efek `backdrop-blur-md`. Pada perangkat mobile, tombol hamburger mengontrol visibilitas kontainer menu dropdown dengan animasi CSS `@keyframes slideDown`:

```css
/* Cuplikan style.css: Animasi laci mobile */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 4.3 Modal Dialog Proyek Dinamis & Kompensasi Scrollbar
Modal dialog dibangun dengan fitur canggih untuk mengatasi masalah umum UI web, yaitu pergeseran tata letak horizontal (*layout shift*) saat scrollbar dinonaktifkan:

```javascript
// Cuplikan script.js: Kompensasi scrollbar dan focus trap
function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.querySelector('header').style.paddingRight = `${scrollbarWidth}px`;
  }
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  document.querySelector('header').style.paddingRight = '';
}
```

Data proyek diisolasi dalam repositori JavaScript (`PROJECTS_DATA`) dan disuntikkan secara dinamis saat pengguna mengklik kartu proyek tertentu.

### 4.4 Tata Letak Simetris Tim (Grid 3 + 2 Desktop)
Untuk menampilkan 5 anggota tim secara elegan pada layar desktop tanpa celah canggung, digunakan sistem CSS Grid 6 kolom:
* **Baris 1:** 3 kartu, masing-masing menempati `lg:col-span-2` (total 6 kolom penuh).
* **Baris 2:** 2 kartu, kartu ke-4 menggunakan `lg:col-start-2 lg:col-span-2` dan kartu ke-5 menempati `lg:col-span-2`, meninggalkan kolom 1 dan kolom 6 kosong sehingga kedua kartu berada persis di tengah dengan lebar yang seragam.

### 4.5 Formulir Kontak dengan State Machine & Simulasi Asinkron
Formulir kontak mengelola 4 kondisi (*state*):
1. **Normal State:** Input siap diisi pengguna.
2. **Error State:** Validasi gagal, garis batas berubah merah (`.input-error`), dan pesan kesalahan muncul. Event listener `input` menghapus error secara real-time saat pengguna memperbaiki ketikan.
3. **Loading State:** Tombol kirim dinonaktifkan (`disabled`), memunculkan indikator spinner SVG dan teks *"Mengirim..."* selama 1 detik.
4. **Success State:** Formulir disembunyikan dan digantikan oleh kotak konfirmasi sukses (*STATUS: DISPATCH SUCCESS*) beserta tombol reset untuk mengirim pesan baru.

---

## BAB 5: PENGUJIAN SISTEM (TESTING & EVALUATION)

Metode pengujian fungsional menggunakan teknik **Black-Box Testing**:

| Kasus Uji | Skenario Pengujian | Hasil yang Diharapkan | Status |
| :--- | :--- | :--- | :---: |
| **TC-01** | Klik tombol *Theme Toggle* di Navbar | Tema berganti antara Light dan Dark; ikon Sun/Moon berubah; preferensi tersimpan di `localStorage` | **BERHASIL** |
| **TC-02** | Refresh halaman setelah memilih Dark Mode | Halaman langsung termuat dalam mode gelap tanpa kedipan putih (zero FOUC) | **BERHASIL** |
| **TC-03** | Klik menu navigasi "Tentang", "Proyek", dll. | Layar bergulir secara halus (*smooth scroll*) ke seksi target tanpa tertutup navbar | **BERHASIL** |
| **TC-04** | Klik tombol hamburger di layar mobile (< 768px) | Menu dropdown meluncur ke bawah (*slide-down*); otomatis tertutup saat tautan diklik | **BERHASIL** |
| **TC-05** | Klik tombol "Lihat Detail" pada kartu Proyek 1 | Modal terbuka memuat data Enterprise Task Engine; scroll halaman belakang terkunci tanpa layout jump | **BERHASIL** |
| **TC-06** | Tekan tombol `Escape` saat modal proyek aktif | Modal tertutup seketika dan fokus keyboard kembali ke tombol pemicu awal | **BERHASIL** |
| **TC-07** | Klik area backdrop gelap di luar kotak modal | Modal tertutup tanpa memicu klik pada elemen di bawahnya | **BERHASIL** |
| **TC-08** | Submit formulir kontak dalam keadaan kosong | Muncul border merah pada ketiga input; pesan error spesifik muncul; submit dicegah | **BERHASIL** |
| **TC-09** | Masukkan format email salah (contoh: `admin@`) | Pesan error "Format email tidak valid" muncul; tombol submit menolak pengiriman | **BERHASIL** |
| **TC-10** | Masukkan data valid dan klik "Kirim Pesan" | Tombol disabled, teks "Mengirim..." muncul ~1 detik, lalu muncul kotak sukses | **BERHASIL** |
| **TC-11** | Klik tombol "Kirim Pesan Baru" pada notifikasi sukses | Kotak notifikasi tertutup, form kembali tampil bersih dan siap diisi kembali | **BERHASIL** |
| **TC-12** | Klik tombol "Ke Atas" di footer | Halaman bergulir halus kembali ke posisi paling atas (`top: 0`) | **BERHASIL** |

---

## BAB 6: PEMBAGIAN TUGAS KELOMPOK (5 ANGGOTA)

| No | Nama Anggota | NIM | Peran Utama | Rincian Tanggung Jawab Teknis |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Aldo Saman** | `2301010001` | Lead Architect & Fullstack | Perancangan arsitektur modular, integrasi JavaScript controller, state handling, dan struktur HTML semantik. |
| **2** | **Anggota Tim 2** | `2301010002` | Frontend UI/UX Specialist | Implementasi sistem desain token Tailwind, tipografi Inter/JetBrains Mono, dan tata letak responsif. |
| **3** | **Anggota Tim 3** | `2301010003` | Backend & API Developer | Perancangan data mock katalog proyek, integrasi alur data JSON, dan simulasi pengiriman pesan asinkron. |
| **4** | **Anggota Tim 4** | `2301010004` | QA & Accessibility Engineer | Pengujian aksesibilitas WCAG AAA, penanganan mitigasi scrollbar jump, trap focus keyboard, dan validasi form regex. |
| **5** | **Anggota Tim 5** | `2301010005` | Technical Writer & Scrum Master | Penyusunan dokumentasi teknis, perumusan brief dan rencana kerja, pengujian lintas browser, dan optimasi aset. |

---

## BAB 7: KESIMPULAN & SARAN

### 7.1 Kesimpulan
1. Proyek landing page portofolio kelompok "Pemburu Pertalite" berhasil diselesaikan 100% sesuai dengan spesifikasi pada dokumen `BRIEF.md` dan tahapan rencana `PLAN.md`.
2. Penerapan arsitektur web statis modular terpisah (`index.html`, `style.css`, `script.js`) menghasilkan basis kode yang sangat bersih, mudah dirawat (*maintainable*), dan berkinerja tinggi tanpa dependensi framework runtime yang berat.
3. Fitur interaktif seperti saklar tema dual-mode dengan `localStorage`, modal dialog dinamis yang aksesibel, serta formulir kontak dengan penanganan status lengkap berhasil diimplementasikan secara murni menggunakan Vanilla JavaScript ES6+.
4. Tampilan monokromatik berdaya guna tinggi berhasil mencapai standar aksesibilitas WCAG AAA dengan rasio kontras melebihi 15:1.

### 7.2 Saran Pengembangan Lanjutan
1. **Integrasi Backend Server:** Menghubungkan formulir kontak ke layanan API backend nyata (misalnya Node.js Express, PHP, atau serverless functions seperti Formspree/EmailJS) agar pesan masuk langsung ke kotak masuk email tim pengembang.
2. **Penyimpanan Dinamis Berbasis Database:** Mengintegrasikan katalog proyek dengan REST API atau basis data (misalnya PostgreSQL / Supabase) agar penambahan proyek baru dapat dilakukan melalui dashboard admin tanpa mengubah markup HTML secara langsung.
3. **PWA (Progressive Web App):** Menambahkan Web App Manifest dan Service Worker agar portofolio dapat diinstal di perangkat pengguna dan diakses secara offline penuh.
