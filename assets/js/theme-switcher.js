/* OSB Theme Switcher
   - Hover the side panel to open (also clickable on mobile)
   - Allows changing background and text colors (6 presets each)
   - Prevents selecting identical background & text colors
   - Persists settings to localStorage
*/
(function () {
  "use strict";

  const STORAGE_KEY = "osb_theme_v1";

  const root = document.documentElement;
  const panel = document.getElementById("theme-panel");
  const handle = document.getElementById("theme-handle");
  const resetBtn = document.getElementById("theme-reset");
  const warnEl = document.getElementById("theme-warning");

  if (!panel) return;

  // allow click toggle for touch devices
  handle?.addEventListener("click", function () {
    panel.classList.toggle("open");
  });

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  function hexToRgb(hex) {
    const h = String(hex || "").replace("#", "").trim();
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    if (h.length === 6) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }

  function rgbToHex(rgb) {
    const toHex = (v) => v.toString(16).padStart(2, "0");
    return "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
  }

  function mix(hexA, hexB, amountB) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    if (!a || !b) return hexA;
    const t = clamp01(amountB);
    const r = Math.round(a.r * (1 - t) + b.r * t);
    const g = Math.round(a.g * (1 - t) + b.g * t);
    const b2 = Math.round(a.b * (1 - t) + b.b * t);
    return rgbToHex({ r, g, b: b2 });
  }

  function luminance(hex) {
    const c = hexToRgb(hex);
    if (!c) return 0.0;
    // sRGB relative luminance
    const srgb = [c.r, c.g, c.b].map(v => v / 255).map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  const initial = {
    body: getComputedStyle(root).getPropertyValue("--body").trim() || "#060606",
    bg: getComputedStyle(root).getPropertyValue("--bg").trim() || "#171914",
    bg2: getComputedStyle(root).getPropertyValue("--bg-2").trim() || "#060606",
    header: getComputedStyle(root).getPropertyValue("--header").trim() || "#ffffff",
    text: getComputedStyle(root).getPropertyValue("--text").trim() || "#C1C1C1"
  };

  let state = { bg: initial.body, text: initial.header };

  function showWarning(msg) {
    if (!warnEl) return;
    warnEl.textContent = msg || "";
    if (msg) {
      warnEl.classList.add("show");
      window.clearTimeout(showWarning._t);
      showWarning._t = window.setTimeout(() => {
        warnEl.classList.remove("show");
        warnEl.textContent = "";
      }, 1800);
    } else {
      warnEl.classList.remove("show");
    }
  }

  function applyState(save = true) {
    const bg = state.bg;
    const txt = state.text;

    // derived colors so sections still have hierarchy
    const lum = luminance(bg);
    const sectionBg = lum > 0.7 ? mix(bg, "#000000", 0.06) : mix(bg, "#ffffff", 0.06);
    const bg2 = bg;

    // muted text blends with bg for better readability
    const muted = mix(txt, bg, 0.45);

    root.style.setProperty("--body", bg);
    root.style.setProperty("--bg-2", bg2);
    root.style.setProperty("--bg", sectionBg);
    root.style.setProperty("--header", txt);
    root.style.setProperty("--text", muted);

    if (save) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }

    setActiveSwatches();
  }

  function setActiveSwatches() {
    panel.querySelectorAll(".theme-swatches").forEach(group => {
      const type = group.getAttribute("data-type");
      group.querySelectorAll(".swatch").forEach(btn => {
        const c = (btn.getAttribute("data-color") || "").toUpperCase();
        const cur = (type === "bg" ? state.bg : state.text).toUpperCase();
        btn.classList.toggle("active", c === cur);
        btn.style.background = btn.getAttribute("data-color") || "#000";
      });
    });
  }

  function setBg(color) {
    if (!color) return;
    if (String(color).toUpperCase() === String(state.text).toUpperCase()) {
      showWarning("Background dan warna tulisan tidak boleh sama.");
      return;
    }
    state.bg = color;
    applyState(true);
  }

  function setText(color) {
    if (!color) return;
    if (String(color).toUpperCase() === String(state.bg).toUpperCase()) {
      showWarning("Background dan warna tulisan tidak boleh sama.");
      return;
    }
    state.text = color;
    applyState(true);
  }

  function loadSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        if (saved.bg) state.bg = saved.bg;
        if (saved.text) state.text = saved.text;
      }
    } catch (e) {}
  }

  panel.addEventListener("click", function (e) {
    const btn = e.target.closest(".swatch");
    if (!btn) return;
    const group = btn.closest(".theme-swatches");
    if (!group) return;
    const type = group.getAttribute("data-type");
    const color = btn.getAttribute("data-color");
    if (type === "bg") setBg(color);
    if (type === "text") setText(color);
  });

  resetBtn?.addEventListener("click", function () {
    state = { bg: initial.body, text: initial.header };
    root.style.removeProperty("--body");
    root.style.removeProperty("--bg");
    root.style.removeProperty("--bg-2");
    root.style.removeProperty("--header");
    root.style.removeProperty("--text");
    setActiveSwatches();
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    showWarning("");
  });

  loadSaved();
  applyState(false);
})();
