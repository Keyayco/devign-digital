/* ============================================================
   DEVIGN DIGITAL — script.js
   Handles: Nav scroll, mobile menu, WhatsApp CTAs, scroll reveal
============================================================ */

(function () {
  "use strict";

  /* ======= CONFIG ======= */
  const WA_NUMBER = "27814637827";
  const WA_MESSAGE = encodeURIComponent("Hi Devign Digital! I'd like to discuss a web project for my business.");

  /* ======= DOM READY ======= */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initMobileMenu();
    initWhatsApp();
    initScrollReveal();
    initTickerPause();
  });

  /* ======= NAV: SCROLL STATE ======= */
  function initNav() {
    const nav = document.getElementById("site-nav");
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ======= MOBILE MENU ======= */
  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-label", "Open menu");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });
  }

  /* ======= WHATSAPP CTA ======= */
  function initWhatsApp() {
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

    // All buttons with [data-wa]
    document.querySelectorAll("[data-wa]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      });
    });
  }

  /* ======= SCROLL REVEAL ======= */
  function initScrollReveal() {
    // Mark elements for reveal
    const targets = [
      ".work-card",
      ".service-card",
      ".campaign-strip",
      ".cta-inner",
      ".section-header",
    ];

    targets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add("reveal");
      });
    });

    // Stagger children in grids
    const grids = document.querySelectorAll(".work-grid, .services-grid");
    grids.forEach(grid => {
      grid.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.12}s`;
      });
    });

    // IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  /* ======= TICKER PAUSE ON HOVER ======= */
  function initTickerPause() {
    const track = document.querySelector(".ticker-track");
    if (!track) return;

    track.parentElement.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    track.parentElement.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });
  }

})();
