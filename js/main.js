/* =============================================
   TEHCS — Shared JavaScript
============================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── NAV SCROLL SHADOW ── */
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* ── ACTIVE NAV LINK ── */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* ── MOBILE MENU ── */
    var burger = document.querySelector('.burger');
    var mobileNav = null;

    if (burger) {
      burger.addEventListener('click', function () {
        if (mobileNav) { mobileNav.remove(); mobileNav = null; return; }

        mobileNav = document.createElement('div');
        mobileNav.style.cssText = [
          'position:fixed', 'top:70px', 'left:0', 'right:0', 'z-index:998',
          'background:rgba(16,29,63,.98)', 'backdrop-filter:blur(18px)',
          'padding:16px 24px 24px', 'border-bottom:2px solid rgba(245,166,35,.2)',
          'display:flex', 'flex-direction:column', 'gap:3px',
          'animation:slideDown .25s ease'
        ].join(';');

        [
          ['index.html',   'Home'],
          ['services.html','Services'],
          ['about.html',   'About Us'],
          ['process.html', 'Our Process'],
          ['contact.html', 'Contact Us']
        ].forEach(function (pair) {
          var a = document.createElement('a');
          a.href = pair[0]; a.textContent = pair[1];
          a.style.cssText = [
            'display:block', 'padding:12px 16px',
            'color:rgba(255,255,255,.72)',
            "font-family:'Barlow Condensed',sans-serif",
            'font-size:1rem', 'font-weight:700',
            'letter-spacing:.08em', 'text-transform:uppercase',
            'text-decoration:none', 'border-radius:8px', 'transition:all .2s'
          ].join(';');
          a.addEventListener('mouseover',  function(){ a.style.color='#F5A623'; a.style.background='rgba(245,166,35,.08)'; });
          a.addEventListener('mouseout',   function(){ a.style.color='rgba(255,255,255,.72)'; a.style.background='transparent'; });
          a.addEventListener('click',      function(){ mobileNav.remove(); mobileNav = null; });
          mobileNav.appendChild(a);
        });

        document.body.appendChild(mobileNav);
      });
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

    /* ── SERVICE TABS (Services page) ── */
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.svc-panel').forEach(function (p) { p.style.display = 'none'; });
        btn.classList.add('active');
        var target = document.getElementById('panel-' + btn.dataset.tab);
        if (target) target.style.display = 'grid';
      });
    });

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
