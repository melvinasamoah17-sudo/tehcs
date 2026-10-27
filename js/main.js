/* =============================================
   TEHCS — Shared JavaScript
============================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── NAV SCROLL SHADOW + PROGRESS LINE ── */
    var nav = document.getElementById('nav');
    var bar = document.querySelector('.scroll-progress');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 50);
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    /* ── ACTIVE NAV LINK (works with or without ".html" in the URL) ── */
    function slug(p) {
      p = (p || '').split('?')[0].split('#')[0].split('/').pop().replace(/\.html$/, '');
      return p === '' ? 'index' : p;
    }
    var here = slug(window.location.pathname);
    document.querySelectorAll('.nav-links a, .nav-cta').forEach(function (a) {
      if (slug(a.getAttribute('href')) === here) a.classList.add('active');
    });

    /* ── MOBILE MENU ── */
    var burger = document.querySelector('.burger');
    var mobileNav = null;

    function closeMenu() {
      if (mobileNav) { mobileNav.remove(); mobileNav = null; }
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }

    if (burger) {
      burger.addEventListener('click', function () {
        if (mobileNav) { closeMenu(); return; }

        mobileNav = document.createElement('div');
        mobileNav.id = 'mobile-menu';
        mobileNav.className = 'mobile-menu';

        [
          ['index.html',   'Home'],
          ['services.html','Services'],
          ['about.html',   'About Us'],
          ['process.html', 'Our Process'],
          ['contact.html', 'Contact Us']
        ].forEach(function (pair, i) {
          var a = document.createElement('a');
          a.href = pair[0]; a.textContent = pair[1];
          a.style.animationDelay = (i * 45) + 'ms';
          if (i === 4) a.className = 'm-cta';
          if (slug(pair[0]) === here) a.classList.add('active');
          a.addEventListener('click', closeMenu);
          mobileNav.appendChild(a);
        });

        document.body.appendChild(mobileNav);
        burger.setAttribute('aria-expanded', 'true');
      });

      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
      window.addEventListener('resize', function () { if (window.innerWidth > 900) closeMenu(); });
    }

    /* ── COUNT-UP NUMBERS (e.g. 100%) ── */
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var counters = [];
    document.querySelectorAll('.hstat-n, .fb-big, .stb-pct, .ss-n').forEach(function (el) {
      var t = el.textContent.trim();
      var mt = t.match(/^(\d+)(%|\+)?$/);
      if (mt && parseInt(mt[1], 10) >= 10) counters.push({ el: el, end: parseInt(mt[1], 10), suffix: mt[2] || '' });
    });
    function runCounter(c) {
      if (reduce) return;
      var dur = 1400, t0 = null;
      c.el.textContent = '0' + c.suffix;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        c.el.textContent = Math.round(c.end * eased) + c.suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var c = counters.find(function (x) { return x.el === e.target; });
          if (c) runCounter(c);
          cio.unobserve(e.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c.el); });
    }

    /* ── SCROLL REVEAL ── */
    var revEls = document.querySelectorAll('.rv, .rv-l, .rv-r');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var delay = parseInt(e.target.dataset.delay || 0, 10);
          setTimeout(function () { e.target.classList.add('on'); }, delay);
          io.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

      revEls.forEach(function (el, i) {
        if (!el.dataset.delay) el.dataset.delay = (i % 5) * 70;
        io.observe(el);
      });
    } else {
      revEls.forEach(function (el) { el.classList.add('on'); });
    }

    /* ── PRE-FILL CONTACT FORM FROM ?service= ── */
    var svcSelect = document.getElementById('service');
    if (svcSelect && window.URLSearchParams) {
      var want = new URLSearchParams(window.location.search).get('service');
      if (want) {
        Array.prototype.some.call(svcSelect.options, function (o) {
          if (o.text.trim().toLowerCase() === want.toLowerCase()) { svcSelect.value = o.value || o.text; return true; }
        });
      }
    }

    /* ── FAQ ACCORDION (Process page) ── */
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.parentElement;
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });

    /* ── CONTACT FORM ── */
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.submit-btn');
        var orig = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#1a9648';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3500);
      });
    }

  });
})();
