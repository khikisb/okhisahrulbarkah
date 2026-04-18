/* Make entire project cards clickable.
   - Uses data-href on .project-items
   - Keeps inner links working normally
   - Adds keyboard support (Enter/Space)
*/
(function () {
  "use strict";

  function openLink(card) {
    const href = card.getAttribute("data-href");
    if (!href) return;
    const target = (card.getAttribute("data-target") || "").toLowerCase();
    if (target === "_blank") {
      window.open(href, "_blank", "noopener");
    } else {
      window.location.href = href;
    }
  }

  document.querySelectorAll(".project-items[data-href]").forEach(function (card) {
    // click anywhere except on an existing link/button inside
    card.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      openLink(card);
    });

    // keyboard support
    card.addEventListener("keydown", function (e) {
      const key = e.key || e.code;
      if (key === "Enter" || key === " " || key === "Spacebar") {
        e.preventDefault();
        openLink(card);
      }
    });
  });
})();