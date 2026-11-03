/* =============================================
   TEHCS — Services page
   Builds the category panels from js/catalog.js, then handles
   search, category tabs and #category deep links.
============================================= */
(function () {
  'use strict';

  var CATALOG = window.TEHCS_CATALOG;
  var bookHref = window.TEHCS_BOOK_HREF;
  var list = document.getElementById('svc-list');
  var search = document.getElementById('svc-search');
  var tabs = document.querySelectorAll('.tab-btn');
  var empty = document.getElementById('svc-empty');
  if (!CATALOG || !list || !search) return;

  /* links from older pages / bookmarks */
  var ALIAS = { health: 'homecare' };

  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function count(n) { return n + (n === 1 ? ' service' : ' services'); }

  /* ── build the DOM ── */
  var panels = CATALOG.map(function (cat) {
    var panel = el('div', 'svc-panel ' + cat.cls);
    panel.id = 'panel-' + cat.key;

    var intro = el('div', 'panel-intro');
    intro.innerHTML =
      '<div class="pi-img"><img loading="lazy"></div>' +
      '<div class="pi-copy"><span class="label"></span><h2>' + cat.intro.title + '</h2><p></p></div>';
    var img = intro.querySelector('img');
    img.src = cat.intro.img; img.alt = cat.intro.alt;
    intro.querySelector('.label').textContent = cat.label;
    intro.querySelector('.pi-copy p').textContent = cat.intro.text;
    panel.appendChild(intro);

    var head = el('div', 'panel-head');
    head.innerHTML = '<span class="ph-dot"></span><h3></h3><span class="ph-n"></span>';
    head.querySelector('h3').textContent = cat.label;
    panel.appendChild(head);

    var groups = cat.groups.map(function (g) {
      var wrap = el('section', 'svc-group');
      wrap.style.setProperty('--g', g.color);

      var gh = el('div', 'grp-head');
      gh.appendChild(el('span', 'grp-emoji', g.emoji)).setAttribute('aria-hidden', 'true');
      var gt = gh.appendChild(el('div', 'grp-title'));
      gt.appendChild(el('h4', null, g.name));
      gt.appendChild(el('p', null, g.desc));
      var gn = gh.appendChild(el('span', 'grp-n'));
      wrap.appendChild(gh);

      var grid = wrap.appendChild(el('div', 'svc-cards-grid'));
      var items = g.services.map(function (s) {
        var name = s[0], emoji = s[1], dur = s[2], desc = s[3];
        var card = el('article', 'svc-item');
        card.appendChild(el('span', 'si-ico', emoji)).setAttribute('aria-hidden', 'true');
        var body = card.appendChild(el('div', 'si-body'));
        body.appendChild(el('h5', null, name));
        var d = body.appendChild(el('span', 'si-dur'));
        d.innerHTML = CLOCK; d.appendChild(document.createTextNode(dur));
        body.appendChild(el('p', null, desc));
        var a = card.appendChild(el('a', 'si-book'));
        a.href = bookHref(name);
        a.innerHTML = 'Book<span aria-hidden="true"> →</span>';
        a.setAttribute('aria-label', 'Book ' + name);
        grid.appendChild(card);
        return { el: card, hay: [name, desc, g.name, cat.label].join(' ').toLowerCase() };
      });
      panel.appendChild(wrap);
      return { el: wrap, n: gn, items: items };
    });

    list.appendChild(panel);
    return { key: cat.key, el: panel, intro: intro, head: head, groups: groups };
  });

  /* ── filter ── */
  var state = { tab: 'all', q: '' };

  function apply() {
    var q = state.q.trim().toLowerCase();
    var listing = state.tab === 'all' || q !== '';
    var total = 0;

    panels.forEach(function (p) {
      var inTab = state.tab === 'all' || state.tab === p.key;
      var shownCat = 0;
      p.groups.forEach(function (g) {
        var shown = 0;
        g.items.forEach(function (it) {
          var match = !q || it.hay.indexOf(q) !== -1;
          it.el.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });
        g.el.classList.toggle('is-hidden', shown === 0);
        g.n.textContent = count(shown);
        shownCat += shown;
      });
      var visible = inTab && shownCat > 0;
      p.el.classList.toggle('is-hidden', !visible);
      p.intro.classList.toggle('is-hidden', listing);
      p.head.classList.toggle('show', listing);
      p.head.querySelector('.ph-n').textContent = count(shownCat);
      if (visible) total += shownCat;
    });

    empty.hidden = total > 0;
  }

  function setTab(name) {
    state.tab = name;
    tabs.forEach(function (b) {
      var on = b.dataset.tab === name;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on && b.parentNode.scrollWidth > b.parentNode.clientWidth) {
        b.parentNode.scrollLeft = b.offsetLeft - 16;   /* keep the active tab visible on phones */
      }
    });
    apply();
  }
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      setTab(b.dataset.tab);
      if (history.replaceState) history.replaceState(null, '', b.dataset.tab === 'all' ? location.pathname : '#' + b.dataset.tab);
    });
  });
  search.addEventListener('input', function () { state.q = search.value; apply(); });

  /* ── start: honour #cleaning / #homecare / #medical / #nonmedical / #construction ── */
  function fromHash() {
    var h = (location.hash || '').replace('#', '');
    h = ALIAS[h] || h;
    var known = panels.some(function (p) { return p.key === h; });
    setTab(known ? h : 'all');
  }
  window.addEventListener('hashchange', fromHash);   /* footer links while already on this page */
  fromHash();
})();
