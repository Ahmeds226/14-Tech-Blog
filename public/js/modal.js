document.addEventListener("DOMContentLoaded", () => {
  // Open modal function:
  function openModal($el) {
    $el.classList.add("is-active");
  }

  // Close modal function
  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  // Close all modals:
  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // When something is clicked it will open its resepctive modal:
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Added a click event so that some child elements will close the parent modal when opened:
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Escape key will close all modals:
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      closeAllModals();
    }
  });
});
