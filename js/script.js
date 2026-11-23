/* =====================================================================
   script.js — teks ID/EN, tautan WhatsApp, render paket/portofolio/testimoni/
   blog/pembayaran, mata uang, formulir kontak, menu mobile, animasi.
   Tidak perlu diedit untuk update rutin: edit js/config.js dan js/i18n.js.
   ===================================================================== */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG;
  var DICT = window.I18N;
  var DEFAULT_LANG = 'id';
  var OG_LOCALE = { id: 'id_ID', en: 'en_US' };
  var BODY = document.body;

  // Bahasa ditentukan oleh halaman (/ = ID, /en/ = EN) — baik untuk SEO.
  var lang = BODY.getAttribute('data-page-lang') || DEFAULT_LANG;
  var ROOT = BODY.getAttribute('data-root') || '';
  var activeFilter = 'all';
  var currency = detectCurrency();

  /* ---------- helpers ---------- */
  function detectCurrency() {
    try {
      var c = localStorage.getItem('currency');
      if (c === 'IDR' || c === 'USD') return c;
    } catch (e) { /* storage bisa diblokir */ }
    return CFG.currencyByLang[lang] || 'IDR';
  }

  function t(key, vars) {
    var str = (DICT[lang] && DICT[lang][key]) || (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.split('{' + k + '}').join(vars[k]);
      });
    }
    return str;
  }

  function L(obj) { return obj ? (obj[lang] || obj[DEFAULT_LANG] || '') : ''; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function waLink(text) { return 'https://wa.me/' + CFG.whatsapp.number + '?text=' + encodeURIComponent(text); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- WhatsApp statis: data-wa="general|consult|service:N" ---------- */
  function resolveWa(spec) {
    var parts = spec.split(':');
    if (parts[0] === 'service') return t('wa.service', { name: t('services.' + parts[1] + '.t') });
    if (parts[0] === 'consult') return t('wa.consult');
    return t('wa.general');
  }

  function applyWaLinks() {
    $$('[data-wa]').forEach(function (a) { a.setAttribute('href', waLink(resolveWa(a.getAttribute('data-wa')))); });
    $$('[data-wa-display]').forEach(function (el) { el.textContent = CFG.whatsapp.display; });
  }

  /* ---------- teks statis ---------- */
  function applyStaticText() {
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    $$('[data-brand]').forEach(function (el) { el.textContent = CFG.brand.name; });
    var ce = $('#contactEmail');
    if (ce && CFG.brand.email) { ce.textContent = CFG.brand.email; ce.setAttribute('href', 'mailto:' + CFG.brand.email); }
  }

  function setMeta(selector, value) { var el = $(selector); if (el) el.setAttribute('content', value); }

  function applyMeta() {
    document.documentElement.setAttribute('lang', lang);
    if (BODY.hasAttribute('data-no-meta')) return;   // halaman artikel punya meta sendiri
    document.title = t('meta.title');
    setMeta('meta[name="description"]', t('meta.description'));
    setMeta('meta[property="og:title"]', t('meta.ogTitle'));
    setMeta('meta[property="og:description"]', t('meta.ogDescription'));
    setMeta('meta[property="og:locale"]', OG_LOCALE[lang]);
    setMeta('meta[name="twitter:title"]', t('meta.ogTitle'));
    setMeta('meta[name="twitter:description"]', t('meta.ogDescription'));
  }

  /* ---------- paket harga ---------- */
  function renderPackages() {
    var grid = $('#pricingGrid');
    if (!grid) return;
    grid.innerHTML = CFG.packages.map(function (p) {
      var name = L(p.name);
      var priceHtml = p.price
        ? '<p class="price-tag">' + esc(L(p.priceTag)) + '</p><p class="price">' + esc(p.price[currency] || p.price.IDR) + '</p>'
        : '<p class="price price-text">' + esc(L(p.priceText)) + '</p>';
      var feats = p.features.map(function (f) { return '<li>' + esc(L(f)) + '</li>'; }).join('');
      return (
        '<article class="card price-card' + (p.featured ? ' featured' : '') + '">' +
          (p.featured ? '<span class="ribbon">' + esc(t('pricing.featured')) + '</span>' : '') +
          '<h3>' + esc(name) + '</h3>' +
          '<p class="price-desc">' + esc(L(p.desc)) + '</p>' +
          (p.bestFor ? '<div class="price-bestfor"><strong>' + esc(t('pricing.bestFor')) + '</strong><span>' + esc(L(p.bestFor)) + '</span></div>' : '') +
          priceHtml +
          '<p class="price-note">' + esc(L(p.priceNote)) + '</p>' +
          '<ul class="feature-list">' + feats + '</ul>' +
          '<a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="' + esc(waLink(t('wa.package', { name: name }))) + '">' + esc(t('pricing.cta')) + '</a>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- metode pembayaran ---------- */
  function renderPayments() {
    var box = $('#payBlock');
    if (!box) return;
    function chips(list) {
      return list.map(function (m) {
        var label = esc(t('pay.' + m.key));
        return m.url
          ? '<li><a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + label + '</a></li>'
          : '<li><span>' + label + '</span></li>';
      }).join('');
    }
    box.innerHTML =
      '<h3>' + esc(t('pay.title')) + '</h3>' +
      '<div class="pay-groups">' +
        '<div><p class="pay-label">' + esc(t('pay.local')) + '</p><ul class="pay-chips">' + chips(CFG.payments.local) + '</ul></div>' +
        '<div><p class="pay-label">' + esc(t('pay.intl')) + '</p><ul class="pay-chips">' + chips(CFG.payments.international) + '</ul></div>' +
      '</div>';
  }

  /* ---------- portofolio + filter ---------- */
  function categoriesInUse() {
    var order = ['landing', 'company', 'store', 'custom'];
    var used = {};
    CFG.portfolio.forEach(function (it) { it.categories.forEach(function (c) { used[c] = true; }); });
    return order.filter(function (c) { return used[c]; });
  }

  function renderFilters() {
    var wrap = $('#portfolioFilters');
    if (!wrap) return;
    var cats = ['all'].concat(categoriesInUse());
    if (cats.indexOf(activeFilter) === -1) activeFilter = 'all';
    wrap.innerHTML = cats.map(function (c) {
      return '<button type="button" class="filter-btn" data-filter="' + c + '" aria-pressed="' + (c === activeFilter) + '">' + esc(t('cat.' + c)) + '</button>';
    }).join('');
  }

  function mockup(it) {
    if (it.image) {
      return '<img src="' + esc(ROOT + it.image) + '" alt="' + esc(L(it.imageAlt) || (t('portfolio.preview') + ' ' + it.domain)) + '" loading="lazy" decoding="async" width="800" height="500">';
    }
    var a = it.accent || ['#2f5bea', '#0b1f3a'];
    return (
      '<div class="mock" style="--a:' + esc(a[0]) + ';--b:' + esc(a[1]) + '" aria-hidden="true">' +
        '<div class="mock-bar"><i></i><i></i><i></i><em>' + esc(it.domain) + '</em></div>' +
        '<div class="mock-body"><div class="mock-hero"></div><div class="mock-row"><span></span><span></span><span></span></div></div>' +
      '</div>'
    );
  }

  function ensurePortfolioModal() {
    if ($('#portfolioModal')) return;
    var modal = document.createElement('div');
    modal.id = 'portfolioModal';
    modal.className = 'portfolio-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '<div class="portfolio-modal-backdrop" data-modal-close></div><section class="portfolio-modal-panel" role="dialog" aria-modal="true" aria-labelledby="portfolioModalTitle"><button class="portfolio-modal-close" type="button" aria-label="' + esc(t('portfolio.close')) + '" data-modal-close>&times;</button><div class="portfolio-modal-content"></div></section>';
    document.body.appendChild(modal);
  }


  function openPortfolioDetails(id) {
    var it = CFG.portfolio.find(function (item) { return item.id === id; });
    if (!it) return;
    ensurePortfolioModal();
    var modal = $('#portfolioModal');
    var content = $('.portfolio-modal-content', modal);
    var feats = it.features.map(function (f) { return '<li>' + esc(L(f)) + '</li>'; }).join('');
    content.innerHTML =
      (it.image ? '<div class="portfolio-modal-image"><img src="' + esc(ROOT + it.image) + '" alt="' + esc(L(it.imageAlt) || t('portfolio.preview')) + '" decoding="async"></div>' : '') +
      '<p class="tag">' + esc(L(it.type)) + '</p>' +
      '<h2 id="portfolioModalTitle">' + esc(it.domain) + '</h2>' +
      '<p class="case-business"><strong>' + esc(t('portfolio.business')) + ':</strong> ' + esc(L(it.business) || L(it.type)) + '</p>' +
      '<section class="case-block"><h3>' + esc(t('portfolio.goal')) + '</h3><p>' + esc(L(it.goal)) + '</p></section>' +
      '<section class="case-block"><h3>' + esc(t('portfolio.solution')) + '</h3><p>' + esc(L(it.solution) || L(it.goal)) + '</p></section>' +
      '<section class="case-block"><h3>' + esc(t('portfolio.features')) + '</h3><ul class="feature-list">' + feats + '</ul></section>' +
      '<p class="case-disclaimer">' + esc(t('portfolio.disclaimer')) + '</p>' +
      '<div class="portfolio-modal-actions"><a class="btn btn-primary" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' + esc(t('portfolio.live')) + '</a><a class="btn btn-wa" href="' + esc(waLink(t('wa.portfolio', { site: it.domain }))) + '" target="_blank" rel="noopener noreferrer">' + esc(t('portfolio.order')) + '</a></div>';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    BODY.classList.add('modal-open');
    var close = $('.portfolio-modal-close', modal);
    if (close) close.focus();
  }

  function closePortfolioModal() {
    var modal = $('#portfolioModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    BODY.classList.remove('modal-open');
  }

  function renderPortfolio() {
    var grid = $('#portfolioGrid');
    if (!grid) return;
    var items = CFG.portfolio.filter(function (it) { return activeFilter === 'all' || it.categories.indexOf(activeFilter) > -1; });
    if (!items.length) { grid.innerHTML = '<p class="empty">' + esc(t('portfolio.empty')) + '</p>'; return; }
    grid.innerHTML = items.map(function (it) {
      var feats = it.features.map(function (f) { return '<li>' + esc(L(f)) + '</li>'; }).join('');
      return (
        '<article class="card portfolio-card">' +
          '<div class="thumb-wrap"><a class="thumb" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(t('portfolio.live') + ' — ' + it.domain) + '">' + mockup(it) + '<span class="thumb-overlay"><span>' + esc(t('portfolio.live')) + ' <span aria-hidden="true">↗</span></span></span></a></div>' +
          '<div class="portfolio-body">' +
            '<p class="tag">' + esc(L(it.type)) + '</p>' +
            '<h3>' + esc(it.domain) + '</h3>' +
            '<p class="case-business"><strong>' + esc(t('portfolio.business')) + ':</strong> ' + esc(L(it.business) || L(it.type)) + '</p>' +
            '<p class="portfolio-summary">' + esc(L(it.goal)) + '</p>' +
            '<div class="portfolio-actions">' +
              '<a class="btn btn-primary btn-sm" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' + esc(t('portfolio.live')) + '</a>' +
              '<button class="btn btn-outline btn-sm" type="button" data-portfolio-details="' + esc(it.id) + '">' + esc(t('portfolio.details')) + '</button>' +
              '<a class="btn btn-wa btn-sm" href="' + esc(waLink(t('wa.portfolio', { site: it.domain }))) + '" target="_blank" rel="noopener noreferrer">' + esc(t('portfolio.order')) + '</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    ensurePortfolioModal();
  }

  /* ---------- testimoni ---------- */
  function renderTestimonials() {
    var grid = $('#testiGrid');
    if (!grid) return;
    var section = $('#testimoni');
    if (!CFG.testimonials || !CFG.testimonials.length) {
      grid.innerHTML = '';
      if (section) section.hidden = true;
      return;
    }
    if (section) section.hidden = false;
    grid.innerHTML = CFG.testimonials.map(function (x) {
      var name = L(x.name);
      var stars = new Array((x.rating || 5) + 1).join('★');
      return (
        '<figure class="card testi">' +
          '<div class="stars" role="img" aria-label="' + esc((x.rating || 5) + ' / 5') + '">' + stars + '</div>' +
          '<blockquote><p>' + esc(L(x.text)) + '</p></blockquote>' +
          '<figcaption><span class="avatar" aria-hidden="true">' + (x.avatar
              ? '<img src="' + esc(ROOT + x.avatar) + '" alt="" width="42" height="42" loading="lazy" decoding="async">'
              : esc(name.charAt(0).toUpperCase())) + '</span>' +
            '<span><strong>' + esc(name) + '</strong><small>' + esc(L(x.role)) + '</small></span></figcaption>' +
        '</figure>'
      );
    }).join('');
    var note = $('#testiNote');
    if (note) note.hidden = !CFG.testimonialsAreSamples;
  }

  /* ---------- blog ---------- */
  function renderBlog() {
    var sec = $('#artikel');
    var grid = $('#blogGrid');
    if (!sec || !grid) return;
    var posts = CFG.blog.filter(function (p) { return p.lang === lang; });
    sec.hidden = !posts.length;
    grid.innerHTML = posts.map(function (p) {
      return (
        '<article class="card post">' +
          (p.image ? '<img class="card-media" src="' + esc(ROOT + p.image) + '" alt="" width="800" height="420" loading="lazy" decoding="async">' : '') +
          '<h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
        '<a class="link-arrow" href="' + esc(ROOT + p.href) + '">' + esc(t('blog.read')) + '</a></article>'
      );
    }).join('');
  }

  /* ---------- sosial & email footer ---------- */
  function renderSocial() {
    var ul = $('#socialList');
    if (ul) {
      ul.innerHTML = CFG.social.filter(function (s) { return s.url; }).map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener me" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' + esc(s.short) + '</a></li>';
      }).join('');
    }
    var mail = $('#footerEmail');
    if (mail && CFG.brand.email) {
      mail.hidden = false;
      mail.innerHTML = '<a href="mailto:' + esc(CFG.brand.email) + '">' + esc(CFG.brand.email) + '</a>';
    }
  }

  /* ---------- terapkan semua ---------- */
  function applyLang() {
    applyMeta();
    applyStaticText();
    renderFilters();
    renderPackages();
    renderPayments();
    renderPortfolio();
    renderTestimonials();
    renderBlog();
    applyWaLinks();
    $$('#currencySwitch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-currency') === currency));
    });
    $$('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  /* ---------- ganti bahasa = pindah ke halaman bahasa lain ---------- */
  function goLang(next) {
    if (next === lang) return;
    var alt = BODY.getAttribute('data-alt-' + next);   // artikel punya padanan sendiri
    window.location.href = alt || (ROOT + CFG.pages[next]);
  }

  /* ---------- formulir kontak ---------- */
  function initContactForm() {
    var form = $('#contactForm');
    if (!form) return;
    var nameEl = $('#cf-name'), emailEl = $('#cf-email'), svcEl = $('#cf-service'), msgEl = $('#cf-message');
    var status = $('#formStatus');

    function vals() {
      var svc = svcEl.value ? svcEl.options[svcEl.selectedIndex].text : t('contact.unsure');
      return { name: nameEl.value.trim(), email: emailEl.value.trim(), service: svc, message: msgEl.value.trim() };
    }
    function say(msg, ok) { status.textContent = msg; status.className = 'form-status ' + (ok ? 'ok' : 'err'); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.website && form.elements.website.value) return;   // honeypot anti-spam
      emailEl.required = true;
      var valid = form.reportValidity();
      emailEl.required = false;
      if (!valid) return;
      var v = vals();
      var endpoint = CFG.contactForm && CFG.contactForm.endpoint;

      if (endpoint) {
        say(t('contact.sending'), true);
        var fd = new FormData(form);
        fd.set('service', v.service);
        fd.set('_subject', t('contact.subject', { name: v.name }));
        fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(r.status); say(t('contact.ok'), true); form.reset(); })
          .catch(function () { say(t('contact.err'), false); });
      } else {
        var subject = t('contact.subject', { name: v.name });
        var body = t('contact.body', v).replace(/\\n/g, '\n');
        say(t('contact.mailto', { email: CFG.brand.email }), true);
        window.location.href = 'mailto:' + CFG.brand.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }
    });

    $('#cfWa').addEventListener('click', function () {
      if (!nameEl.reportValidity() || !msgEl.reportValidity()) return;
      var v = vals();
      window.open(waLink(t('wa.form', v)), '_blank', 'noopener');
    });
  }

  /* ---------- UI ---------- */
  function initMenu() {
    var btn = $('#menuBtn'), nav = $('#primaryNav');
    if (!btn || !nav) return;
    function close() { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); BODY.classList.remove('no-scroll'); }
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      BODY.classList.toggle('no-scroll', open);
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) close(); });
  }

  function initHeaderShadow() {
    var header = $('.site-header');
    if (!header) return;
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('click', function (e) {
    var lb = e.target.closest('.lang-switch button');
    if (lb) { goLang(lb.getAttribute('data-lang')); return; }
    var cb = e.target.closest('#currencySwitch button');
    if (cb) {
      currency = cb.getAttribute('data-currency');
      try { localStorage.setItem('currency', currency); } catch (x) { /* abaikan */ }
      applyLang();
      return;
    }
    var fb = e.target.closest('.filter-btn');
    if (fb) { activeFilter = fb.getAttribute('data-filter'); renderFilters(); renderPortfolio(); }
  });

  function initPortfolioInteractions() {
    document.addEventListener('click', function (event) {
      var details = event.target.closest('[data-portfolio-details]');
      if (details) { openPortfolioDetails(details.getAttribute('data-portfolio-details')); return; }
      if (event.target.closest('[data-modal-close]')) closePortfolioModal();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closePortfolioModal();
    });
  }


  function init() {
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
    renderSocial();
    applyLang();
    initContactForm();
    initPortfolioInteractions();
    initMenu();
    initHeaderShadow();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
