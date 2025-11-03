console.log("✅ smart-scroll.js loaded");

// Auto-open callout if link target is inside one, then scroll to it
document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const scrollToEl = (el) =>
    el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Find nearest callout container
  const callout = target.closest(".callout");
  if (callout) {
    const collapseEl = callout.querySelector(".callout-collapse");
    const headerBtn = callout.querySelector("[data-bs-toggle='collapse']");

    // Only expand if it's currently collapsed
    if (collapseEl && collapseEl.classList.contains("collapse")) {
      // Simulate click to open via Bootstrap
      if (headerBtn) headerBtn.click();

      // Wait a bit for the animation to finish, then scroll
      setTimeout(() => scrollToEl(target), 400);
      return;
    }
  }

  // Fallback: just scroll normally
  scrollToEl(target);
});
