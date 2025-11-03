console.log("✅ smart-scroll.js loaded (Bootstrap-aware)");

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  // Delay to ensure Bootstrap bindings are initialized
  setTimeout(() => {
    const target = document.querySelector(hash);
    if (!target) {
      console.warn("❌ No target found for", hash);
      return;
    }

    const scrollToEl = (el) =>
      el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Look up the closest callout wrapper
    const callout = target.closest(".callout");
    if (!callout) {
      scrollToEl(target);
      return;
    }

    // Find the header toggle and collapse body
    const headerBtn = callout.querySelector(".callout-header[data-bs-toggle='collapse']");
    const collapseEl = callout.querySelector(".callout-collapse");

    if (collapseEl && !collapseEl.classList.contains("show")) {
      console.log("📂 Expanding callout:", callout);
      if (headerBtn) {
        headerBtn.click(); // simulate user click to trigger Bootstrap’s collapse
        setTimeout(() => scrollToEl(target), 600);
      } else {
        collapseEl.classList.add("show");
        scrollToEl(target);
      }
    } else {
      scrollToEl(target);
    }
  }, 400);
});