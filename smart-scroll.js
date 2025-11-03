// --- smart-scroll.js ---
// Auto-expand callouts when navigating to a section inside them
// Works on both page load and Quarto anchor clicks

function handleSmartScroll(hash) {
    if (!hash) hash = window.location.hash;
    if (!hash) return;
  
    const target = document.querySelector(hash);
    if (!target) return;
  
    const callout = target.closest(".callout");
    const collapse = callout?.querySelector(".callout-collapse");
  
    if (collapse && !collapse.classList.contains("show")) {
      if (window.bootstrap?.Collapse) {
        const bsCollapse = new window.bootstrap.Collapse(collapse, { toggle: false });
        bsCollapse.show();
      } else {
        collapse.classList.add("show");
        collapse.style.height = "auto";
      }
    }
  
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }
  
  // Run when page first loads
  window.addEventListener("load", () => handleSmartScroll());
  
  // Also run when clicking any in-page anchor
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const hash = a.getAttribute("href");
    if (!hash || hash.length < 2) return;
    setTimeout(() => handleSmartScroll(hash), 100);
  });