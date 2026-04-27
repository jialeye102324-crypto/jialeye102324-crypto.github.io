/* ============================================
   叶家乐个人网站 — Main JavaScript
   SplitText · ScrollReveal · SpotlightCard · Nav
   ============================================ */

(function () {
  'use strict';

  // --- SplitText: Hero 标题逐字入场 ---
  function initSplitText() {
    const title = document.getElementById('heroTitle');
    if (!title) return;
    const text = title.textContent.trim();
    title.textContent = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? ' ' : char;
      span.style.animationDelay = `${0.4 + i * 0.08}s`;
      title.appendChild(span);
    });
  }

  // --- Scroll Reveal ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // --- Navigation: 滚动后加背景 ---
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- SpotlightCard: 鼠标跟随聚光灯 ---
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }

  // --- Smooth Anchor Scroll ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // --- Active Nav Link Highlight ---
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.style.color =
                link.getAttribute('href') === '#' + id
                  ? 'var(--c-dark-text-primary)'
                  : '';
            });
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // --- Init All ---
  document.addEventListener('DOMContentLoaded', () => {
    initSplitText();
    initScrollReveal();
    initNavScroll();
    initMobileMenu();
    initSpotlightCards();
    initSmoothScroll();
    initActiveNav();
  });
})();
