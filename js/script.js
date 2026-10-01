/* ============================================================
   DEVIGN DIGITAL — script.js
   Mobile menu, scroll reveal, contact form (mailto handoff only)
============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initReveal();
    initContactForm();
  });

  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const panel = document.getElementById("mobile-panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    const targets = document.querySelectorAll(".case, .service-row, .process-step, .section-head");
    targets.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* Contact form has no backend. On submit, build a mailto: with the
     visitor's details pre-filled so their email client sends it directly.
     No fake "message sent" confirmation is shown. */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const business = form.business.value.trim();
      const email = form.email.value.trim();
      const type = form.type.value;
      const message = form.message.value.trim();

      const bodyLines = [
        `Name: ${name}`,
        `Business: ${business}`,
        `Project type: ${type}`,
        "",
        message
      ];

      const subject = encodeURIComponent(`New project enquiry — ${business || name}`);
      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailto = `mailto:hello@devigndigital.co.za?subject=${subject}&body=${body}&reply-to=${encodeURIComponent(email)}`;

      window.location.href = mailto;
    });
  }
})();
