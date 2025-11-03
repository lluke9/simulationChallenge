console.log("✅ smart-scroll.js loaded (force-open version)");

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  // Wait a little to let Quarto's DOM settle
  setTimeout(() => {
    const target = document.querySelector(hash);
    if (!target) {
      console.warn("❌ Target not found for", hash);
      return;
    }

    const scrollToEl = (el) =>
      el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Look for enclosing callout
    const callout = target.closest(".callout");
    if (!callout) {
      scrollToEl(target);
      return;
    }

    // Try normal Bootstrap toggle first
    const header = callout.querySelector(".callout-header[data-bs-toggle='collapse']");
    const collapse = callout.querySelector(".callout-collapse");

    if (collapse && !collapse.classList.contains("show")) {
      console.log("📂 Forcing open callout for:", hash);

      // Try clicking first (for Bootstrap)
      if (header) header.click();

      // Fallback: manually show if click didn't work
      setTimeout(() => {
        if (!collapse.classList.contains("show")) {
          collapse.classList.add("show");
          collapse.style.height = "auto";
        }
        scrollToEl(target);
      }, 600);
    } else {
      scrollToEl(target);
    }
  }, 600);
});