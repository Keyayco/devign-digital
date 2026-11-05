/* ============================================================
   DEVIGN DIGITAL — script.js
   Mobile menu, scroll reveal, contact form (mailto handoff only)
============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initReveal();
    initShots();
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

  /* Scale live iframes down so the whole page design is visible (no cropping or stretching) */
  function initShots() {
    const shots = document.querySelectorAll(".shot");
    if (!shots.length) return;
    const fit = () => shots.forEach((el) => {
      const f = el.querySelector("iframe");
      const cw = el.clientWidth, ch = el.clientHeight;
      if (!f || !cw || !ch) return;
      const base = parseInt(el.dataset.base, 10) || (cw < 520 ? 400 : 1280);
      const s = cw / base;
      f.style.width = base + "px";
      f.style.height = ch / s + "px";
      f.style.transform = "scale(" + s + ")";
    });
    fit();
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(fit);
      shots.forEach((el) => ro.observe(el));
    } else {
      window.addEventListener("resize", fit);
    }
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
