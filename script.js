// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile menu (your existing code) =====
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== Theme toggle =====
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement; // <html>
  const STORAGE_KEY = "theme"; // "light" | "dark"

  if (!themeBtn) return;

  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const getActiveTheme = () => {
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    return getSystemTheme();
  };

  const updateToggleUI = () => {
    const icon = themeBtn.querySelector("i");
    const active = getActiveTheme();

    // If active theme is dark -> show SUN (switch to light)
    if (icon) {
      icon.classList.remove("fa-moon", "fa-sun");
      icon.classList.add(active === "dark" ? "fa-sun" : "fa-moon");
    }

    themeBtn.setAttribute(
      "aria-label",
      active === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeBtn.setAttribute(
      "title",
      active === "dark" ? "Light mode" : "Dark mode"
    );
  };

  const setTheme = (theme) => {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleUI();
  };

  // Load saved preference (if any). Otherwise follow OS.
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    updateToggleUI();
  }

  // Toggle on click
  themeBtn.addEventListener("click", () => {
    const active = getActiveTheme();
    setTheme(active === "dark" ? "light" : "dark");
  });

  // If user didn't force theme, keep icon synced with OS changes
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq && mq.addEventListener) {
    mq.addEventListener("change", () => {
      if (!root.classList.contains("light") && !root.classList.contains("dark")) {
        updateToggleUI();
      }
    });
  }
});
