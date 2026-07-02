/* ============================================================
   CAR RENTAL SYSTEM — THEME.JS
   Dark / Light Mode Toggle with localStorage Persistence
   ============================================================ */

'use strict';

const Theme = (() => {

  const STORAGE_KEY = 'car-rental-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /* ---- Get saved or system-preferred theme ---- */
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    // Respect OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }

    return LIGHT;
  }

  /* ---- Apply theme to <html> ---- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleIcons(theme);
  }

  /* ---- Update all toggle button icons ---- */
  function updateToggleIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === DARK ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  /* ---- Toggle theme ---- */
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || LIGHT;
    const next = current === DARK ? LIGHT : DARK;

    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /* ---- Get current theme ---- */
  function getCurrent() {
    return document.documentElement.getAttribute('data-theme') || LIGHT;
  }

  /* ---- Set specific theme ---- */
  function set(theme) {
    if (theme !== DARK && theme !== LIGHT) return;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /* ---- Initialize ---- */
  function init() {
    // Apply theme immediately (before paint)
    applyTheme(getPreferredTheme());

    // Bind toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });

    // Listen for OS preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? DARK : LIGHT);
        }
      });
    }
  }

  // Apply theme immediately (before DOMContentLoaded) to prevent flash
  applyTheme(getPreferredTheme());

  // Bind listeners after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    init,
    toggle,
    getCurrent,
    set,
    DARK,
    LIGHT,
  };

})();
