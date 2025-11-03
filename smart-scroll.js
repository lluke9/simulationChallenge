console.log("✅ smart-scroll.js loaded");

// Wait until both DOM and Bootstrap collapse behavior are ready
window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  // Give Bootstrap a short moment to finish binding events
  setTimeout(() => {
    const target = document.querySelector(hash);
    if (!target) {
      console.warn("❌ No target found for", hash);
      return;
    }

    // Helper to scroll smoothly
    const scrollToEl = (el) =>
      el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Detect enclosing callout
    const callout = target.closest(".callout");
    if (!callout) {
      scrollToEl(target);
      return;
    }

    const collapseEl = callout.querySelector(".callout-collapse");
    const headerBtn = callout.querySelector("[data-bs-toggle='collapse']");

    // Only open if collapsed
    if (collapseEl && collapseEl.classList.contains("collapse")) {
      console.log("📂 Expanding callout for", hash);
      if (headerBtn) {
        headerBtn.click(); // trigger Bootstrap expand
        // Wait for transition (Bootstrap anim ~300 ms)
        setTimeout(() => scrollToEl(target), 500);
      } else {
        // Fallback: just scroll
        scrollToEl(target);
      }
    } else {
      scrollToEl(target);
    }
  }, 300); // delay to ensure Bootstrap is initialized
});