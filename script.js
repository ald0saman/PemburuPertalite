/**
 * PEMBURU PERTALITE — SOFTWARE ENGINEERING PORTFOLIO
 * Main JavaScript Controller
 * Step 3: Theme Management & LocalStorage Persistence
 * Step 4: Responsive Mobile Navigation & Sticky Header Controller
 * Step 9: Dynamic Project Detail Modal & Focus Trap Controller
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA REPOSITORY: 3 PROYEK REKAYASA PERANGKAT LUNAK (Step 8 & 9)
  // ==========================================================================
  const PROJECTS_DATA = {
    'proj-task-engine': {
      id: 'proj-task-engine',
      title: 'Enterprise Task Engine',
      category: 'Productivity & Workflow System',
      version: 'v1.2.4',
      status: 'Active Build',
      description: 'Enterprise Task Engine adalah sistem orkestrasi alur kerja modern yang dirancang untuk mengatasi bottlenecks pada penjadwalan tugas tim rekayasa perangkat lunak. Menggunakan sistem antrean prioritas berbasis bobot beban dan isolasi data lokal persisten, sistem ini mampu menjaga konsistensi state tanpa ketergantungan library eksternal yang berat.',
      features: [
        'Manajemen antrean tugas dengan kalkulasi prioritas adaptif (High, Medium, Low).',
        'Pelacakan throughput dan metrik performa eksekusi secara real-time.',
        'Penyimpanan lokal persisten berbasis LocalStorage API dengan isolasi state aman.',
        'Penyaringan status kustom (Pending, In-Progress, Completed) dengan nol latensi render.'
      ],
      techStack: ['HTML5 Semantic', 'Tailwind CSS', 'Vanilla JavaScript (ES6+)', 'LocalStorage API', 'CSS Grid'],
      demoUrl: '#demo-task-engine',
      repoUrl: 'https://github.com/ald0saman/PemburuPertalite'
    },
    'proj-algo-visualizer': {
      id: 'proj-algo-visualizer',
      title: 'Algorithmic Code Visualizer',
      category: 'Educational & Developer Tool',
      version: 'v2.0.1',
      status: 'Stable',
      description: 'Algorithmic Code Visualizer merupakan perkakas interaktif untuk memahami cara kerja struktur data kompleks dan algoritma graf tingkat lanjut. Algoritma dieksekusi secara bertahap langkah-demi-langkah dengan penyorotan kode (*step-by-step state highlighting*) dan animasi kanvas 60 FPS untuk memudahkan analisis kompleksitas waktu (Big-O).',
      features: [
        'Visualisasi algoritma traversal graf mendalam: Breadth-First Search (BFS), Depth-First Search (DFS), dan Dijkstra.',
        'Mesin animasi state kanvas 60 FPS dengan kontrol interaktif (Play, Pause, Step-Forward, Speed Slider).',
        'Pencatatan riwayat call stack dan tabel nilai variabel secara real-time saat simulasi berjalan.',
        'Dukungan konfigurasi bobot edge dan pembuatan graf acak berorientasi kasus uji.'
      ],
      techStack: ['JavaScript (ES6+)', 'HTML5 Canvas API', 'CSS Grid', 'Data Structures', 'Algorithms'],
      demoUrl: '#demo-algo-visualizer',
      repoUrl: 'https://github.com/ald0saman/PemburuPertalite'
    },
    'proj-metric-dashboard': {
      id: 'proj-metric-dashboard',
      title: 'Distributed Metric Dashboard',
      category: 'Infrastructure Monitoring',
      version: 'v0.9.8',
      status: 'High-Throughput',
      description: 'Distributed Metric Dashboard adalah antarmuka pemantauan telemetri server ringan dengan filosofi developer-first. Mengedepankan efisiensi konsumsi memori dan latensi pembaruan ultra-rendah, dashboard ini menyajikan visualisasi log monokromatik berdensitas tinggi untuk lingkungan microservices modern.',
      features: [
        'Simulasi koneksi telemetri real-time berbasis streaming event dan polling asinkron.',
        'Visualisasi grafik mini (micro-charts) berbasis SVG interaktif tanpa dependensi pustaka chart eksternal.',
        'Panel agregasi log sistem dengan pencarian teks cepat dan pemfilteran level severity (Info, Warn, Critical).',
        'Desain antarmuka monokromatik high-contrast yang ramah bagi mata insinyur DevOps/SRE saat monitoring intensif.'
      ],
      techStack: ['WebSockets Mock', 'SVG Micro-Charts', 'Tailwind CSS', 'DOM Manipulation', 'Event-Driven JS'],
      demoUrl: '#demo-metric-dashboard',
      repoUrl: 'https://github.com/ald0saman/PemburuPertalite'
    }
  };

  // ==========================================================================
  // 2. THEME MANAGEMENT (Step 3)
  // ==========================================================================
  const STORAGE_KEY = 'portfolio-theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
  }

  function applyTheme(theme) {
    const isDark = theme === THEME_DARK;
    if (isDark) {
      document.documentElement.classList.add(THEME_DARK);
    } else {
      document.documentElement.classList.remove(THEME_DARK);
    }

    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap');
      
      const labelText = btn.querySelector('[data-theme-label]');
      if (labelText) {
        labelText.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
      }

      const sunIcons = btn.querySelectorAll('[data-theme-icon-sun]');
      const moonIcons = btn.querySelectorAll('[data-theme-icon-moon]');
      
      sunIcons.forEach(icon => {
        if (isDark) icon.classList.remove('hidden');
        else icon.classList.add('hidden');
      });

      moonIcons.forEach(icon => {
        if (isDark) icon.classList.add('hidden');
        else icon.classList.remove('hidden');
      });
    });
  }

  function toggleTheme() {
    const isCurrentlyDark = document.documentElement.classList.contains(THEME_DARK);
    const newTheme = isCurrentlyDark ? THEME_LIGHT : THEME_DARK;
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  // ==========================================================================
  // 3. MOBILE NAVIGATION CONTROLLER (Step 4)
  // ==========================================================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (!menuToggle || !mobileMenu) return;

    const iconOpen = menuToggle.querySelector('[data-menu-icon-open]');
    const iconClose = menuToggle.querySelector('[data-menu-icon-close]');

    function openMenu() {
      mobileMenu.classList.remove('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
      if (iconOpen) iconOpen.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      if (iconOpen) iconOpen.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    }

    function isMenuOpen() {
      return !mobileMenu.classList.contains('hidden');
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    const navLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      const navbar = document.querySelector('header');
      if (isMenuOpen() && navbar && !navbar.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isMenuOpen()) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // 4. MODAL PROJECT DETAIL CONTROLLER (Step 9 - High Risk)
  // ==========================================================================
  let lastFocusedElement = null;

  /**
   * Mengunci scrolling body tanpa menyebabkan layout jump (kompensasi lebar scrollbar)
   */
  function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      const navbar = document.querySelector('header');
      if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
  }

  /**
   * Mengembalikan scrolling body ke kondisi normal
   */
  function unlockScroll() {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    const navbar = document.querySelector('header');
    if (navbar) navbar.style.paddingRight = '';
  }

  /**
   * Membuka modal dialog proyek dan menginjeksi data dinamis
   * @param {string} projectId
   */
  function openProjectModal(projectId) {
    const project = PROJECTS_DATA[projectId];
    if (!project) {
      console.warn(`[Modal] Proyek dengan ID "${projectId}" tidak ditemukan.`);
      return;
    }

    const modalBackdrop = document.querySelector('[data-project-modal]');
    if (!modalBackdrop) return;

    // Simpan elemen yang sebelumnya memegang fokus untuk dikembalikan saat modal tutup
    lastFocusedElement = document.activeElement;

    // 1. Injeksi Data ke DOM Modal
    const titleEl = modalBackdrop.querySelector('[data-modal-title]');
    const categoryEl = modalBackdrop.querySelector('[data-modal-category]');
    const statusEl = modalBackdrop.querySelector('[data-modal-status]');
    const versionEl = modalBackdrop.querySelector('[data-modal-version]');
    const descEl = modalBackdrop.querySelector('[data-modal-description]');
    const featuresListEl = modalBackdrop.querySelector('[data-modal-features]');
    const techStackEl = modalBackdrop.querySelector('[data-modal-tech]');
    const repoBtn = modalBackdrop.querySelector('[data-modal-repo]');

    if (titleEl) titleEl.textContent = project.title;
    if (categoryEl) categoryEl.textContent = project.category;
    if (statusEl) statusEl.textContent = project.status;
    if (versionEl) versionEl.textContent = project.version;
    if (descEl) descEl.textContent = project.description;

    // Render daftar fitur utama
    if (featuresListEl) {
      featuresListEl.innerHTML = '';
      project.features.forEach((feat) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2.5 text-xs text-secondary leading-relaxed';
        li.innerHTML = `
          <svg class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>${feat}</span>
        `;
        featuresListEl.appendChild(li);
      });
    }

    // Render badge tech stack
    if (techStackEl) {
      techStackEl.innerHTML = '';
      project.techStack.forEach((tech) => {
        const span = document.createElement('span');
        span.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-canvas border border-subtle text-secondary';
        span.textContent = tech;
        techStackEl.appendChild(span);
      });
    }

    // Tautkan repo link
    if (repoBtn) {
      repoBtn.href = project.repoUrl;
    }

    // 2. Tampilkan Modal & Kunci Scroll
    modalBackdrop.classList.remove('hidden');
    modalBackdrop.classList.add('flex');
    lockScroll();

    // 3. Fokuskan tombol tutup untuk aksesibilitas
    const closeBtn = modalBackdrop.querySelector('[data-modal-close]');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  /**
   * Menutup modal dialog proyek
   */
  function closeProjectModal() {
    const modalBackdrop = document.querySelector('[data-project-modal]');
    if (!modalBackdrop || modalBackdrop.classList.contains('hidden')) return;

    modalBackdrop.classList.add('hidden');
    modalBackdrop.classList.remove('flex');
    unlockScroll();

    // Kembalikan fokus ke elemen pemicu awal
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  /**
   * Menginisialisasi event listener untuk Modal Dialog
   */
  function initProjectModal() {
    const modalBackdrop = document.querySelector('[data-project-modal]');
    if (!modalBackdrop) return;

    const modalDialog = modalBackdrop.querySelector('[data-modal-dialog]');

    // 1. Delegasi klik untuk tombol pembuka modal pada kartu proyek
    document.addEventListener('click', (e) => {
      const triggerBtn = e.target.closest('[data-project-id]');
      if (triggerBtn) {
        e.preventDefault();
        const projectId = triggerBtn.getAttribute('data-project-id');
        openProjectModal(projectId);
      }
    });

    // 2. Tutup jika tombol silang (X) atau tombol tutup bawah diklik
    modalBackdrop.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        closeProjectModal();
        return;
      }

      // 3. Tutup jika pengguna mengklik area backdrop gelap di luar kotak dialog
      if (modalDialog && !modalDialog.contains(e.target)) {
        closeProjectModal();
      }
    });

    // 4. Penanganan Keyboard: Escape & Trap Focus
    document.addEventListener('keydown', (e) => {
      if (modalBackdrop.classList.contains('hidden')) return;

      // Tutup modal jika tombol Escape ditekan
      if (e.key === 'Escape') {
        e.preventDefault();
        closeProjectModal();
        return;
      }

      // Trap focus di dalam modal menggunakan Tab & Shift+Tab
      if (e.key === 'Tab' && modalDialog) {
        const focusableElements = modalDialog.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // ==========================================================================
  // 5. CONTACT FORM CONTROLLER & ASYNC SIMULATION (Step 10 - Medium/High Risk)
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const successNotice = document.getElementById('contact-success-notice');
    const resetBtn = document.getElementById('contact-reset-btn');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    function clearFieldError(input, errorEl) {
      if (!input || !errorEl) return;
      input.classList.remove('input-error');
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }

    function setFieldError(input, errorEl, message) {
      if (!input || !errorEl) return;
      input.classList.add('input-error');
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }

    // Real-time error clearing saat pengguna mengetik
    if (nameInput && nameError) {
      nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
    }
    if (emailInput && emailError) {
      emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
    }
    if (messageInput && messageError) {
      messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      // 1. Validasi Nama
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        setFieldError(nameInput, nameError, 'Nama lengkap wajib diisi.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else if (nameVal.length < 2) {
        setFieldError(nameInput, nameError, 'Nama minimal terdiri dari 2 karakter.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else {
        clearFieldError(nameInput, nameError);
      }

      // 2. Validasi Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        setFieldError(emailInput, emailError, 'Alamat email wajib diisi.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else if (!emailRegex.test(emailVal)) {
        setFieldError(emailInput, emailError, 'Format email tidak valid (contoh: dev@domain.com).');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else {
        clearFieldError(emailInput, emailError);
      }

      // 3. Validasi Pesan
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        setFieldError(messageInput, messageError, 'Pesan teknis tidak boleh kosong.');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageVal.length < 10) {
        setFieldError(messageInput, messageError, 'Pesan terlalu singkat (minimal 10 karakter).');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else {
        clearFieldError(messageInput, messageError);
      }

      // Jika ada input invalid, arahkan fokus ke field pertama yang salah
      if (!isValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      // 4. Loading State: Cegah double-submission
      if (submitBtn) submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.classList.remove('hidden');
      if (submitText) submitText.textContent = 'Mengirim...';

      // 5. Simulasi Pengiriman Asinkron (~1 detik)
      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.classList.add('hidden');
        if (submitText) submitText.textContent = 'Kirim Pesan';

        form.reset();
        clearFieldError(nameInput, nameError);
        clearFieldError(emailInput, emailError);
        clearFieldError(messageInput, messageError);

        // Transisi ke Success State
        form.classList.add('hidden');
        if (successNotice) {
          successNotice.classList.remove('hidden');
          if (resetBtn) resetBtn.focus();
        }
      }, 1000);
    });

    // 6. Reset Form untuk mengirim pesan lainnya
    if (resetBtn && successNotice) {
      resetBtn.addEventListener('click', () => {
        successNotice.classList.add('hidden');
        form.classList.remove('hidden');
        if (nameInput) nameInput.focus();
      });
    }
  }

  // ==========================================================================
  // 6. INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Terapkan tema awal
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // 2. Pasang delegasi event listener saklar tema
    document.addEventListener('click', (event) => {
      const toggleBtn = event.target.closest('[data-theme-toggle]');
      if (toggleBtn) {
        event.preventDefault();
        toggleTheme();
      }
    });

    // 3. Pasang listener perubahan preferensi tema OS
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });

    // 4. Inisialisasi navigasi mobile responsif
    initMobileMenu();

    // 5. Inisialisasi controller modal proyek dinamis (Step 9)
    initProjectModal();

    // 6. Inisialisasi formulir kontak interaktif (Step 10)
    initContactForm();

    // 7. Tombol Scroll Kembali ke Atas (Step 11)
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    console.log(`[System] Initialized. Active theme: ${initialTheme}`);
  });

  // Ekspos fungsi ke global scope untuk pengujian programatis
  window.PortfolioApp = {
    theme: {
      get: getPreferredTheme,
      apply: applyTheme,
      toggle: toggleTheme,
    },
    modal: {
      open: openProjectModal,
      close: closeProjectModal,
      data: PROJECTS_DATA,
    }
  };
})();

