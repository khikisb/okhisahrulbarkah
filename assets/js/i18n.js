/* Simple client-side i18n for the OSB portfolio.
   - Uses data-i18n for innerHTML
   - Uses data-i18n-<attr> for attributes (placeholder, title, aria-label)
   - Persists selection to localStorage (osb_lang)
*/
(function () {
  "use strict";

  const STRINGS = {
    id: {
      "meta.title": "Okhi Sahrul Barkah | Portofolio",
      "preloader.loading": "Memuat",
      "nav.home": "Beranda",
      "nav.about": "Tentang",
      "nav.services": "Layanan",
      "nav.portfolio": "Portofolio",
      "nav.experience": "Pengalaman",
      "nav.contact": "Kontak",
      "nav.hire": "Hubungi Saya",

      "hero.greeting": "Hai!",
      "hero.iam": "Saya",
      "hero.desc": "Fullstack Developer, UI/UX Designer, dan Graphic Designer. Terbiasa membangun solusi digital end-to-end: dari riset & desain antarmuka hingga implementasi frontend dan backend.",
      "hero.btnCv": "Unduh CV",
      "hero.btnPortfolio": "Unduh Portofolio",
      "hero.btnWhatsapp": "Chat WhatsApp",

      "about.kicker": "Tentang Saya",
      "about.title": "Membangun produk digital yang <span>rapi</span>, <span>cepat</span>, dan mudah digunakan",
      "about.desc": "Lulusan Teknik Informatika Universitas Trunojoyo Madura dengan pengalaman 3+ tahun di pengembangan dan desain digital. Menguasai HTML, CSS, JavaScript, PHP, React, Laravel, serta Figma/Photoshop/Adobe XD.",
      "about.cta": "Lihat Portofolio",
      "about.counter1": "Tahun pengalaman",
      "about.counter2": "Proyek terselesaikan",
      "about.counter3": "Pengalaman di 5 perusahaan",

      "services.kicker": "Layanan",
      "services.title": "Apa yang bisa saya bantu",
      "services.s1.title": "Desain UI/UX",
      "services.s1.desc": "Riset ringan, wireframe, prototyping, dan design system agar produk mudah dipakai.",
      "services.s2.title": "Pengembangan Web Fullstack",
      "services.s2.desc": "Membangun web responsif + backend yang efisien (Laravel/PHP/React).",
      "services.s3.title": "Desain Grafis & Branding",
      "services.s3.desc": "Logo, konten sosial media, dan aset visual yang konsisten dengan brand.",
      "services.s4.title": "Bot WhatsApp & Otomasi",
      "services.s4.desc": "Otomasi layanan via WhatsApp bot untuk pelayanan, edukasi, dan administrasi.",

      "portfolio.kicker": "Portofolio",
      "portfolio.title": "Beberapa proyek pilihan",
      "portfolio.viewAll": "Buka Portofolio (PDF)",
      "portfolio.more": "Lihat lainnya",
      "portfolio.moreTag": "Portofolio",

      "exp.kicker": "Pengalaman",
      "exp.title": "Pengalaman kerja & organisasi",
      "exp.workTitle": "Pengalaman Kerja",
      "exp.orgTitle": "Organisasi & Kepanitiaan",

      "awards.kicker": "Penghargaan & Sertifikasi",
      "awards.title": "Penghargaan & sertifikasi",
      "awards.desc": "Daftar penghargaan dan sertifikasi yang saya peroleh dari kompetisi dan pelatihan.",
      "awards.groupAwards": "Penghargaan",
      "awards.groupCerts": "Sertifikasi",

      "contact.kicker": "Kontak",
      "contact.title": "Mari kolaborasi",
      "contact.desc": "Butuh UI/UX, website, atau desain visual? Hubungi saya lewat WhatsApp, email, atau LinkedIn.",
      "contact.quick": "Kontak cepat",
      "contact.address": "Alamat",
      "contact.email": "Email",
      "contact.phone": "Telepon / WhatsApp",
      "contact.linkedin": "LinkedIn",
      "contact.ctaWhatsapp": "Chat WhatsApp",
      "contact.ctaEmail": "Kirim Email",
      "contact.ctaLinkedin": "Buka LinkedIn",
      "contact.formTitle": "Kirim pesan",
      "contact.formSubtitle": "Isi form di bawah ini, atau gunakan tombol WhatsApp untuk respon lebih cepat.",
      "contact.formNote": "Catatan: form ini menggunakan <code>contact.php</code> (template). Jika deploy di GitHub Pages (static), gunakan tombol WhatsApp/Email untuk menghubungi saya.",

      "form.name": "Nama",
      "form.email": "Email",
      "form.message": "Pesan",
      "form.send": "Kirim Pesan",

      "theme.title": "Tampilan",
      "theme.bg": "Latar belakang",
      "theme.text": "Warna teks",
      "theme.reset": "Atur Ulang",

      // typed strings (HTML allowed)
      "hero.typed": [
        '<span class="highlight">Fullstack</span> Developer',
        '<span class="highlight">UI/UX</span> Designer',
        '<span class="highlight">Graphic</span> Designer'
      ]
    },

    en: {
      "meta.title": "Okhi Sahrul Barkah | Portfolio",
      "preloader.loading": "Loading",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.portfolio": "Portfolio",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "nav.hire": "Hire Me",

      "hero.greeting": "Hi!",
      "hero.iam": "I'm",
      "hero.desc": "Fullstack Developer, UI/UX Designer, and Graphic Designer. Experienced in building end-to-end digital solutions: from research & UI design to frontend and backend implementation.",
      "hero.btnCv": "Download CV",
      "hero.btnPortfolio": "Download Portfolio",
      "hero.btnWhatsapp": "Chat on WhatsApp",

      "about.kicker": "About",
      "about.title": "Building digital products that are <span>clean</span>, <span>fast</span>, and easy to use",
      "about.desc": "Computer Science graduate from Universitas Trunojoyo Madura with 3+ years of experience in digital development and design. Skilled in HTML, CSS, JavaScript, PHP, React, Laravel, and Figma/Photoshop/Adobe XD.",
      "about.cta": "View Portfolio",
      "about.counter1": "Years of experience",
      "about.counter2": "Projects completed",
      "about.counter3": "Experience at 5 companies",

      "services.kicker": "Services",
      "services.title": "How I can help",
      "services.s1.title": "UI/UX Design",
      "services.s1.desc": "Light research, wireframes, prototypes, and design systems for usable products.",
      "services.s2.title": "Fullstack Web Development",
      "services.s2.desc": "Responsive web apps with efficient backend (Laravel/PHP/React).",
      "services.s3.title": "Graphic Design & Branding",
      "services.s3.desc": "Logos, social content, and consistent visual assets for your brand.",
      "services.s4.title": "WhatsApp Bot & Automation",
      "services.s4.desc": "Automate services via WhatsApp bots for support, education, and admin tasks.",

      "portfolio.kicker": "Portfolio",
      "portfolio.title": "Selected works",
      "portfolio.viewAll": "Open Portfolio (PDF)",
      "portfolio.more": "See more",
      "portfolio.moreTag": "Portfolio",

      "exp.kicker": "Experience",
      "exp.title": "Work & organization experience",
      "exp.workTitle": "Work Experience",
      "exp.orgTitle": "Organizations & Activities",

      "awards.kicker": "Awards & Certifications",
      "awards.title": "Awards & certifications",
      "awards.desc": "Awards and certificates earned from competitions and courses.",
      "awards.groupAwards": "Awards",
      "awards.groupCerts": "Certifications",

      "contact.kicker": "Contact",
      "contact.title": "Let’s collaborate",
      "contact.desc": "Need UI/UX, a website, or visual design? Reach me via WhatsApp, email, or LinkedIn.",
      "contact.quick": "Quick contact",
      "contact.address": "Address",
      "contact.email": "Email",
      "contact.phone": "Phone / WhatsApp",
      "contact.linkedin": "LinkedIn",
      "contact.ctaWhatsapp": "Chat on WhatsApp",
      "contact.ctaEmail": "Send Email",
      "contact.ctaLinkedin": "Open LinkedIn",
      "contact.formTitle": "Send a message",
      "contact.formSubtitle": "Fill the form below, or use WhatsApp for a faster response.",
      "contact.formNote": "Note: this form uses <code>contact.php</code> (template). If deployed on GitHub Pages (static), use WhatsApp/Email buttons to contact me.",

      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.send": "Send Message",

      "theme.title": "Theme",
      "theme.bg": "Latar belakang",
      "theme.text": "Text color",
      "theme.reset": "Atur Ulang",

      "hero.typed": [
        '<span class="highlight">Fullstack</span> Developer',
        '<span class="highlight">UI/UX</span> Designer',
        '<span class="highlight">Graphic</span> Designer'
      ]
    }
  };


  const LITERAL_STRINGS = {
    "Contact Info": {
        "id": "Info Kontak",
        "en": "Contact Info"
    },
    "Available for freelance & collaboration": {
        "id": "Tersedia untuk freelance & kolaborasi",
        "en": "Available for freelance & collaboration"
    },
    "FULLSTACK DEVELOPMENT": {
        "id": "PENGEMBANGAN FULLSTACK",
        "en": "FULLSTACK DEVELOPMENT"
    },
    "UI/UX DESIGN": {
        "id": "DESAIN UI/UX",
        "en": "UI/UX DESIGN"
    },
    "GRAPHIC DESIGN": {
        "id": "DESAIN GRAFIS",
        "en": "GRAPHIC DESIGN"
    },
    "Website": {
        "id": "Website",
        "en": "Website"
    },
    "Website & Branding": {
        "id": "Website & Branding",
        "en": "Website & Branding"
    },
    "Proyek LMS BNNK Gresik": {
        "id": "Proyek LMS BNNK Gresik",
        "en": "BNNK Gresik LMS Project"
    },
    "Penyimpanan Cloud BNNK Gresik": {
        "id": "Penyimpanan Cloud BNNK Gresik",
        "en": "BNNK Gresik Cloud Storage"
    },
    "Formulir DAST Online BNNK Gresik": {
        "id": "Formulir DAST Online BNNK Gresik",
        "en": "BNNK Gresik Online DAST Form"
    },
    "Form Asesmen WHO - ASSIST V3.1 Online BNNK Gresik": {
        "id": "Form Asesmen WHO - ASSIST V3.1 Online BNNK Gresik",
        "en": "BNNK Gresik Online WHO - ASSIST V3.1 Assessment Form"
    },
    "Private Access": {
        "id": "Akses Privat",
        "en": "Private Access"
    },
    "Website Pemetaan daerah kerawanan BNNK Gresik": {
        "id": "Website Pemetaan daerah kerawanan BNNK Gresik",
        "en": "BNNK Gresik Vulnerability Mapping Website"
    },
    "Website Kader Inti Pemuda Anti Narkoba Kabupaten Gresik": {
        "id": "Website Kader Inti Pemuda Anti Narkoba Kabupaten Gresik",
        "en": "Gresik Regency Anti-Drug Youth Core Cadre Website"
    },
    "Form Online": {
        "id": "Form Online",
        "en": "Online Form"
    },
    "Logo & Visual": {
        "id": "Logo & Visual",
        "en": "Logo & Visual"
    },
    "Logo & Visual Design": {
        "id": "Desain Logo & Visual",
        "en": "Logo & Visual Design"
    },
    "Membangun bot WhatsApp untuk pelayanan & penyuluhan anti-narkoba, dan berhasil diimplementasikan di layanan WhatsApp BNNK Gresik.": {
        "id": "Membangun bot WhatsApp untuk pelayanan & penyuluhan anti-narkoba, dan berhasil diimplementasikan di layanan WhatsApp BNNK Gresik.",
        "en": "Built a WhatsApp bot for anti-drug services and outreach, and successfully implemented it in BNNK Gresik's WhatsApp service."
    },
    "Membuat desain seragam BNNK Gresik.": {
        "id": "Membuat desain seragam BNNK Gresik.",
        "en": "Designed uniforms for BNNK Gresik."
    },
    "Membuat konten untuk social media BNNK Gresik.": {
        "id": "Membuat konten untuk social media BNNK Gresik.",
        "en": "Created content for BNNK Gresik's social media."
    },
    "Melaksanakan penyuluhan tentang bahaya narkoba.": {
        "id": "Melaksanakan penyuluhan tentang bahaya narkoba.",
        "en": "Delivered outreach sessions on the dangers of drugs."
    },
    "UI/UX Design: Re-design 3 fitur aplikasi Sf.Shop dan mendapatkan feedback positif dari user.": {
        "id": "UI/UX Design: Re-design 3 fitur aplikasi Sf.Shop dan mendapatkan feedback positif dari user.",
        "en": "UI/UX Design: Redesigned 3 features of the Sf.Shop app and received positive feedback from users."
    },
    "Mengimplementasikan Design Thinking ke 3 aplikasi baru dan mendapatkan feedback positif.": {
        "id": "Mengimplementasikan Design Thinking ke 3 aplikasi baru dan mendapatkan feedback positif.",
        "en": "Applied Design Thinking to 3 new applications and received positive feedback."
    },
    "Menawarkan kerja sama dengan media partner nasional dan deal dengan 6 media partner nasional dalam 1 bulan.": {
        "id": "Menawarkan kerja sama dengan media partner nasional dan deal dengan 6 media partner nasional dalam 1 bulan.",
        "en": "Secured collaboration deals with 6 national media partners within 1 month."
    },
    "Membuat konten untuk seluruh social media Nexvel Entertainment.": {
        "id": "Membuat konten untuk seluruh social media Nexvel Entertainment.",
        "en": "Created content for all Nexvel Entertainment social media channels."
    },
    "Merancang game baru untuk Nexvel Entertainment dan berhasil diimplementasikan.": {
        "id": "Merancang game baru untuk Nexvel Entertainment dan berhasil diimplementasikan.",
        "en": "Designed a new game for Nexvel Entertainment and successfully implemented it."
    },
    "Memasarkan game hingga mencapai 15.000 unduhan di Play Store.": {
        "id": "Memasarkan game hingga mencapai 15.000 unduhan di Play Store.",
        "en": "Marketed the game until it reached 15,000 downloads on the Play Store."
    },
    "Bekerja sama dengan aparatur desa untuk merekap 5.500 data warga desa.": {
        "id": "Bekerja sama dengan aparatur desa untuk merekap 5.500 data warga desa.",
        "en": "Worked with village officials to compile 5,500 resident records."
    },
    "Digitalisasi pelayanan balai desa dengan website desa (77 menu pembuatan surat + menu lainnya).": {
        "id": "Digitalisasi pelayanan balai desa dengan website desa (77 menu pembuatan surat + menu lainnya).",
        "en": "Digitized village office services with a village website (77 letter-making menus plus other menus)."
    },
    "Membangun dan mengimplementasikan bot WhatsApp untuk meningkatkan pelayanan balai desa.": {
        "id": "Membangun dan mengimplementasikan bot WhatsApp untuk meningkatkan pelayanan balai desa.",
        "en": "Built and implemented a WhatsApp bot to improve village office services."
    },
    "Mengisi sosialisasi dan melatih 3 aparatur desa serta 4 perwakilan terkait penggunaan website & bot WhatsApp.": {
        "id": "Mengisi sosialisasi dan melatih 3 aparatur desa serta 4 perwakilan terkait penggunaan website & bot WhatsApp.",
        "en": "Conducted socialization sessions and trained 3 village officials and 4 representatives on using the website and WhatsApp bot."
    },
    "Mendokumentasikan dan mengedit seluruh social media kelompok KKN.": {
        "id": "Mendokumentasikan dan mengedit seluruh social media kelompok KKN.",
        "en": "Documented and edited all social media content for the KKN group."
    },
    "Product Development: Mengajar 1 kelas (±30 mahasiswa) dengan topik UI, UX, prototyping, digital marketing; tools: Figma & Google Ads.": {
        "id": "Product Development: Mengajar 1 kelas (±30 mahasiswa) dengan topik UI, UX, prototyping, digital marketing; tools: Figma & Google Ads.",
        "en": "Product Development: Taught 1 class (±30 students) on UI, UX, prototyping, and digital marketing using Figma & Google Ads."
    },
    "Staff Komunikasi & Informasi.": {
        "id": "Staff Komunikasi & Informasi.",
        "en": "Communication & Information staff."
    },
    "Core team bidang Academic.": {
        "id": "Core team bidang Academic.",
        "en": "Core team in the Academic division."
    },
    "Divisi akademik.": {
        "id": "Divisi akademik.",
        "en": "Academic division."
    },
    "Anggota muda.": {
        "id": "Anggota muda.",
        "en": "Junior member."
    },
    "Juara 1 Web Design": {
        "id": "Juara 1 Web Design",
        "en": "1st Place Web Design"
    },
    "UKM Triple-C • Penghargaan": {
        "id": "UKM Triple-C • Penghargaan",
        "en": "UKM Triple-C • Award"
    },
    "Juara 2 Lomba UI/UX Design": {
        "id": "Juara 2 Lomba UI/UX Design",
        "en": "2nd Place UI/UX Design Competition"
    },
    "Kompetisi UI/UX • Penghargaan": {
        "id": "Kompetisi UI/UX • Penghargaan",
        "en": "UI/UX Competition • Award"
    },
    "Juara Sayembara Logo": {
        "id": "Juara Sayembara Logo",
        "en": "Logo Contest Winner"
    },
    "Program Studi Teknik Informatika, Universitas Trunojoyo Madura • Penghargaan": {
        "id": "Program Studi Teknik Informatika, Universitas Trunojoyo Madura • Penghargaan",
        "en": "Informatics Engineering Program, Universitas Trunojoyo Madura • Award"
    },
    "Udemy • Sertifikasi": {
        "id": "Udemy • Sertifikasi",
        "en": "Udemy • Certification"
    },
    "Dicoding • Sertifikasi": {
        "id": "Dicoding • Sertifikasi",
        "en": "Dicoding • Certification"
    },
    "Belajar Dasar Pemrograman Web": {
        "id": "Belajar Dasar Pemrograman Web",
        "en": "Learning Basic Web Programming"
    },
    "Have a In Mind? Lets Work": {
        "id": "Punya ide? Mari bekerja",
        "en": "Have a In Mind? Lets Work"
    },
    "TOGETHER": {
        "id": "BERSAMA",
        "en": "TOGETHER"
    },
    "Portfolio": {
        "id": "Portofolio",
        "en": "Portfolio"
    },
    "Bahasa Indonesia": {
        "id": "Bahasa Indonesia",
        "en": "Indonesian"
    },
    "English": {
        "id": "Bahasa Inggris",
        "en": "English"
    },
    "Open portfolio PDF": {
        "id": "Buka PDF portofolio",
        "en": "Open portfolio PDF"
    },
    "Open PT. Multi Makmur": {
        "id": "Buka PT. Multi Makmur",
        "en": "Open PT. Multi Makmur"
    },
    "Open Skripsiplus": {
        "id": "Buka Skripsiplus",
        "en": "Open Skripsiplus"
    },
    "Open Proyek LMS BNNK Gresik": {
        "id": "Buka Proyek LMS BNNK Gresik",
        "en": "Open BNNK Gresik LMS Project"
    },
    "Open Penyimpanan Cloud BNNK Gresik": {
        "id": "Buka Penyimpanan Cloud BNNK Gresik",
        "en": "Open BNNK Gresik Cloud Storage"
    },
    "Open Formulir DAST Online BNNK Gresik": {
        "id": "Buka Formulir DAST Online BNNK Gresik",
        "en": "Open BNNK Gresik Online DAST Form"
    },
    "Open Form Asesmen WHO - ASSIST V3.1 Online BNNK Gresik": {
        "id": "Buka Form Asesmen WHO - ASSIST V3.1 Online BNNK Gresik",
        "en": "Open BNNK Gresik Online WHO - ASSIST V3.1 Assessment Form"
    },
    "Open Website Pemetaan daerah kerawanan BNNK Gresik": {
        "id": "Buka Website Pemetaan daerah kerawanan BNNK Gresik",
        "en": "Open BNNK Gresik Vulnerability Mapping Website"
    },
    "Open Website Kader Inti Pemuda Anti Narkoba Kabupaten Gresik": {
        "id": "Buka Website Kader Inti Pemuda Anti Narkoba Kabupaten Gresik",
        "en": "Open Gresik Regency Anti-Drug Youth Core Cadre Website"
    }
};

  const literalTextBindings = [];
  const literalAttrBindings = [];
  let literalBindingsReady = false;

  function getLiteralTranslation(key, lang) {
    const item = LITERAL_STRINGS[key];
    if (!item) return null;
    return item[lang] != null ? item[lang] : item.id;
  }

  function preserveWhitespace(original, nextValue) {
    const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) return nextValue;
    return `${match[1]}${nextValue}${match[3]}`;
  }

  function shouldSkipLiteralTextNode(node) {
    const parent = node && node.parentElement;
    if (!parent) return true;
    if (parent.closest('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]')) return true;
    if (parent.closest('.type-text, script, style, noscript')) return true;
    if (parent.closest('.txt-loading')) return true;
    if (parent.closest('.experience-items h4, .experience-items h6')) return true;
    if (parent.closest('.client-item .text')) return true;
    return false;
  }

  function initLiteralBindings() {
    if (literalBindingsReady) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node || !node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (shouldSkipLiteralTextNode(node)) return NodeFilter.FILTER_REJECT;
        const key = node.nodeValue.trim();
        if (!LITERAL_STRINGS[key]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let current;
    while ((current = walker.nextNode())) {
      literalTextBindings.push({
        node: current,
        key: current.nodeValue.trim(),
        original: current.nodeValue
      });
    }

    ['title', 'aria-label', 'alt', 'placeholder'].forEach((attr) => {
      document.querySelectorAll(`[${attr}]`).forEach((el) => {
        if (el.hasAttribute(`data-i18n-${attr}`)) return;
        const value = el.getAttribute(attr);
        if (!value) return;
        const key = value.trim();
        if (!LITERAL_STRINGS[key]) return;
        literalAttrBindings.push({ el, attr, key, original: value });
      });
    });

    literalBindingsReady = true;
  }

  function applyLiteralTranslations(lang) {
    initLiteralBindings();

    literalTextBindings.forEach((binding) => {
      const nextValue = getLiteralTranslation(binding.key, lang);
      if (nextValue != null) {
        binding.node.nodeValue = preserveWhitespace(binding.original, nextValue);
      }
    });

    literalAttrBindings.forEach((binding) => {
      const nextValue = getLiteralTranslation(binding.key, lang);
      if (nextValue != null) {
        binding.el.setAttribute(binding.attr, nextValue);
      }
    });
  }
  const STORAGE_KEY = "osb_lang";
  let typedInstance = null;

  function getDict(lang) {
    return STRINGS[lang] || STRINGS.id;
  }

  function setAttrTranslations(dict) {
    const ATTRS = ["placeholder", "title", "aria-label"];
    ATTRS.forEach((attr) => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
        const key = el.getAttribute(`data-i18n-${attr}`);
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });
  }

  function setTextTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) {
        el.innerHTML = dict[key];
      }
    });
  }

  function setActiveLangButton(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function initTyped(dict) {
    const typedEl = document.querySelector(".type-text");
    if (!typedEl || typeof window.Typed === "undefined") return;

    const strings = Array.isArray(dict["hero.typed"]) ? dict["hero.typed"] : [];

    if (typedInstance) {
      try { typedInstance.destroy(); } catch (e) {}
      typedInstance = null;
    }

    typedInstance = new window.Typed(typedEl, {
      strings,
      typeSpeed: 110,
      backSpeed: 60,
      startDelay: 0,
      backDelay: 700,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    });
  }

  function applyLanguage(lang) {
    const dict = getDict(lang);

    document.documentElement.lang = lang === "id" ? "id" : "en";
    if (dict["meta.title"]) document.title = dict["meta.title"];

    setTextTranslations(dict);
    setAttrTranslations(dict);
    applyLiteralTranslations(lang);
    setActiveLangButton(lang);
    initTyped(dict);

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === "id" || saved === "en")) return saved;
    } catch (e) {}

    const nav = (navigator.language || "id").toLowerCase();
    return nav.startsWith("en") ? "en" : "id";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const initial = detectInitialLang();
    applyLanguage(initial);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        applyLanguage(lang);
      });
    });
  });
})();
