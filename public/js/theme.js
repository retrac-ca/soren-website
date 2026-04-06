/**
 * theme.js — Dark / Light Mode Toggle
 * =====================================
 * Runs immediately (before page paint) to prevent flash of wrong theme.
 * Saves preference to localStorage under the key "soren-theme".
 *
 * Usage:
 *   - The <html> element gets data-theme="dark" or data-theme="light"
 *   - CSS variables in variables.css handle all color changes
 *   - The toggle button (#theme-toggle) flips between themes
 */

(function () {
  // ── Restore saved theme immediately (before render) ──────────────────────
  const saved = localStorage.getItem("soren-theme");

  // Default to dark if no preference saved and system prefers dark (or no signal)
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);

  // ── Wire up the toggle button after DOM is ready ─────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next    = current === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("soren-theme", next);

      // Brief animation on the button
      toggleBtn.style.transform = "scale(0.85) rotate(180deg)";
      setTimeout(() => { toggleBtn.style.transform = ""; }, 200);
    });
  });
})();
