// Auto-open a callout if it's the link target, then scroll to it
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    if (!hash) return;
  
    const target = document.querySelector(hash);
    if (!target) return;
  
    const scrollToEl = (el) =>
      el.scrollIntoView({ behavior: "smooth", block: "start" });
  
    // Case 1: target is inside a collapsed callout
    const detailsParent = target.closest("details.callout");
    if (detailsParent && !detailsParent.open) {
      detailsParent.open = true;           // expand it
      // give the browser a beat to lay it out before scrolling
      setTimeout(() => scrollToEl(target), 150);
    } else {
      // Case 2: target is visible (either open or outside)
      scrollToEl(target);
    }
  });