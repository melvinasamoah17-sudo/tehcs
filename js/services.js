/* =============================================
   TEHCS — Services page
   Search + category tabs, "Book" buttons that pre-fill the
   contact form, and a swipeable stacked-card carousel for phones.
============================================= */
(function () {
  'use strict';

  var CATS = {
    health:       { cls: 'cat-h', label: 'Home Health Care', emoji: '🩺' },
    construction: { cls: 'cat-c', label: 'Construction',     emoji: '🔧' },
    nonmedical:   { cls: 'cat-n', label: 'Non-Medical',      emoji: '🏡' }
  };

  /* card title -> option text in the contact form's service dropdown */
  var FORM_OPTION = {
    'professional doctors': 'Doctor Visit',
    'personal care': 'Personal Care',
    'senior care': 'Senior Care',
    'occupational therapy': 'Occupational Therapy',
    'medication & pharmacist': 'Medication Reminders',
    'plumbers': 'Plumbing',
    'electricians': 'Electrical',
    'painters': 'Painting',
    'interior decorators': 'Interior Decoration',
    'building constructors': 'Building',
    'gardeners': 'Gardening',
    'housekeepers': 'Housekeeping',
    'nursing (nannies)': 'Nanny / Childcare',
    'cooks / chefs': 'Cook / Chef',
    'laundry services': 'Laundry',
    'drivers & ushers': 'Driver',
    'stay home we deliver': 'Other',
    'office cleaners': 'Office Cleaning'
  };
  var EMOJI = [
    [/doctor/i, '🩺'], [/personal care/i, '🤲'], [/senior/i, '👵'], [/occupational/i, '🧩'], [/medication/i, '💊'],
    [/plumb/i, '🔧'], [/electric/i, '⚡'], [/paint/i, '🎨'], [/interior/i, '🛋️'], [/building/i, '🏗️'], [/garden/i, '🌿'],
    [/housekeep/i, '🧹'], [/nann|nursing/i, '👶'], [/cook|chef/i, '🍳'], [/laundry/i, '🧺'], [/driver/i, '🚗'],
    [/stay home/i, '📦'], [/office/i, '🏢']
  ];
  function emojiFor(title, cat) {
    for (var i = 0; i < EMOJI.length; i++) if (EMOJI[i][0].test(title)) return EMOJI[i][1];
    return CATS[cat].emoji;
  }
  function bookHref(title) {
    var opt = FORM_OPTION[title.toLowerCase()];
    return 'contact.html' + (opt ? '?service=' + encodeURIComponent(opt) : '');
  }

  var search = document.getElementById('svc-search');
  var tabs = document.querySelectorAll('.tab-btn');
  var empty = document.getElementById('svc-empty');
  var car = document.getElementById('svc-carousel');
  if (!search || !car) return;

  /* ── collect data from the existing markup ── */
  var panels = [];
  Object.keys(CATS).forEach(function (key) {
    var el = document.getElementById('panel-' + key);
    if (!el) return;
    var grid = el.querySelector('.svc-cards-grid');
    var cards = [].slice.call(el.querySelectorAll('.svc-card')).map(function (card) {
      var title = card.querySelector('h3').textContent.trim();
      var desc = card.querySelector('p').textContent.trim();
      var body = card.querySelector('.svc-card-body');
      var a = document.createElement('a');
      a.className = 'card-book';
      a.href = bookHref(title);
      a.textContent = 'Book This Service';
      body.appendChild(a);
      return { el: card, title: title, desc: desc, cat: key, hay: (title + ' ' + desc + ' ' + CATS[key].label).toLowerCase() };
    });
    var head = document.createElement('div');
    head.className = 'panel-head ' + CATS[key].cls;
    head.innerHTML = '<span class="ph-dot"></span><h3>' + CATS[key].label + '</h3><span class="ph-n"></span>';
    el.insertBefore(head, grid);
    panels.push({ key: key, el: el, intro: el.querySelector('.panel-intro'), head: head, cards: cards });
  });

  var state = { tab: 'all', q: '' };
  var slides = [], idx = 0;

  function apply() {
    var q = state.q.trim().toLowerCase();
    var listing = state.tab === 'all' || q !== '';
    var total = 0;
    slides = [];

    panels.forEach(function (p) {
      var inTab = state.tab === 'all' || state.tab === p.key;
      var shown = 0;
      p.cards.forEach(function (c) {
        var match = !q || c.hay.indexOf(q) !== -1;
        c.el.classList.toggle('is-hidden', !match);
        if (match && inTab) { shown++; slides.push(c); }
      });
      var visible = inTab && shown > 0;
      p.el.style.display = visible ? 'grid' : 'none';
      if (p.intro) p.intro.classList.toggle('is-hidden', listing);
      p.head.classList.toggle('show', listing && visible);
      p.head.querySelector('.ph-n').textContent = shown + (shown === 1 ? ' service' : ' services');
      total += shown;
    });

    empty.hidden = total > 0;
    idx = 0;
    renderCarousel();
  }

  /* ── tabs ── */
  function setTab(name) {
    state.tab = name;
    tabs.forEach(function (b) {
      var on = b.dataset.tab === name;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    apply();
  }
  tabs.forEach(function (b) { b.addEventListener('click', function () { setTab(b.dataset.tab); }); });
  search.addEventListener('input', function () { state.q = search.value; apply(); });

  /* ── carousel ── */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function renderCarousel(dir) {
    if (!slides.length) { car.hidden = true; car.innerHTML = ''; return; }
    car.hidden = false;
    var s = slides[idx], cat = CATS[s.cat];
    var title = state.q.trim() ? 'Search results' : (state.tab === 'all' ? 'All Services' : cat.label + ' Services');

    var dots = '';
    if (slides.length <= 8) {
      for (var i = 0; i < slides.length; i++) dots += '<i class="' + (i === idx ? 'on' : '') + '"></i>';
    }

    car.className = 'svc-carousel ' + cat.cls;
    car.innerHTML =
      '<div class="car-head"><div><h3>' + title + '</h3><p>Swipe or use the arrows to browse. Tap a card to book.</p></div>' +
      '<div class="car-dots" aria-hidden="true">' + dots + '</div></div>' +
      '<div class="car-stage">' +
        '<a class="car-card' + (dir ? ' go-' + dir : '') + '" href="' + bookHref(s.title) + '" aria-label="Book ' + s.title + '">' +
          '<span class="car-num">' + pad(idx + 1) + '</span>' +
          '<span class="car-emoji" aria-hidden="true">' + emojiFor(s.title, s.cat) + '</span>' +
          '<h4></h4><p></p>' +
          '<span class="car-foot"><span class="car-chip">Book now</span><span class="car-arrow" aria-hidden="true">→</span></span>' +
        '</a>' +
      '</div>' +
      '<div class="car-ctrl"><button class="car-btn" data-d="-1" aria-label="Previous service">‹</button>' +
      '<span class="car-count">' + (idx + 1) + ' / ' + slides.length + '</span>' +
      '<button class="car-btn" data-d="1" aria-label="Next service">›</button></div>';

    /* set text via textContent so descriptions can contain any characters */
    car.querySelector('h4').textContent = s.title;
    car.querySelector('.car-card p').textContent = s.desc;
  }

  function go(d) {
    if (slides.length < 2) return;
    idx = (idx + d + slides.length) % slides.length;
    renderCarousel(d > 0 ? 'next' : 'prev');
  }

  car.addEventListener('click', function (e) {
    var btn = e.target.closest('.car-btn');
    if (btn) go(parseInt(btn.dataset.d, 10));
  });

  var x0 = null, y0 = null;
  car.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  car.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  }, { passive: true });
  car.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });

  /* ── start: honour #health / #construction / #nonmedical from the home page ── */
  var hash = (window.location.hash || '').replace('#', '');
  setTab(CATS[hash] ? hash : 'all');
})();
