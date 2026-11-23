/* Hasilkan en/index.html dari index.html + kamus EN di js/i18n.js
   Jalankan setiap kali mengubah teks di index.html atau i18n.js:
       node tools/build-en.js                                              */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8'), ctx);
const EN = ctx.I18N.en;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const DOMAIN = 'https://www.contoh-domain.com';   // samakan dengan index.html

let h = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1) teks statis
h = h.replace(/(<(\w+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
  (m, open, tag, key, inner, close) => EN[key] === undefined ? m : open + esc(EN[key]) + close);

// 2) atribut i18n (aria-label dll.)
h = h.replace(/(<[^>]*?)data-i18n-attr="([^"]+)"([^>]*>)/g, (m, a, spec, b) => {
  let out = a + 'data-i18n-attr="' + spec + '"' + b;
  spec.split(';').forEach(p => {
    const [at, key] = p.split(':');
    if (at && key && EN[key]) out = out.replace(new RegExp('(\\s' + at.trim() + '=")[^"]*(")'), '$1' + attr(EN[key]) + '$2');
  });
  return out;
});

// 3) meta & head
const rep = (re, to) => { if (!re.test(h)) throw new Error('pola tidak ketemu: ' + re); h = h.replace(re, to); };
rep(/<html lang="id">/, '<html lang="en">');
rep(/<title>[\s\S]*?<\/title>/, '<title>' + esc(EN['meta.title']) + '</title>');
rep(/(<meta name="description" content=")[^"]*(")/, '$1' + attr(EN['meta.description']) + '$2');
rep(/(<meta name="keywords" content=")[^"]*(")/, '$1website design for SMEs, small business website, landing page, company profile website, online store website, multilingual website, SEO-ready website, web developer Indonesia$2');
rep(/(<link rel="canonical" href=")[^"]*(")/, '$1' + DOMAIN + '/en/$2');
rep(/(<meta property="og:url" content=")[^"]*(")/, '$1' + DOMAIN + '/en/$2');
rep(/(<meta property="og:title" content=")[^"]*(")/, '$1' + attr(EN['meta.ogTitle']) + '$2');
rep(/(<meta property="og:description" content=")[^"]*(")/, '$1' + attr(EN['meta.ogDescription']) + '$2');
rep(/(<meta property="og:locale" content=")[^"]*(")/, '$1en_US$2');
rep(/<meta property="og:locale:alternate" content="en_US">/, '<meta property="og:locale:alternate" content="id_ID">');
rep(/(<meta name="twitter:title" content=")[^"]*(")/, '$1' + attr(EN['meta.ogTitle']) + '$2');
rep(/(<meta name="twitter:description" content=")[^"]*(")/, '$1' + attr(EN['meta.ogDescription']) + '$2');
rep(/<body data-page-lang="id" data-root="">/, '<body data-page-lang="en" data-root="../">');
rep(/Jasa pembuatan website profesional untuk UMKM: landing page, company profile, toko online, dan sistem custom\. Dibuat dari nol, multi-bahasa, ramah SEO\./,
    'Professional website services for SMEs: landing pages, company profiles, online stores, and custom systems. Built from scratch, multilingual, SEO-ready.');
h = h.replace(/"name": "(?:Layanan Pembuatan Website|NEXORA Studio — Website Development)"/, '"name": "NEXORA Studio — Website Development"');

// 4) path aset -> ../
h = h.replace(/(href|src)="(css|js|assets)\//g, '$1="../$2/');
// 5) lang switch: tandai EN aktif
h = h.replace('data-lang="id" aria-pressed="true"', 'data-lang="id" aria-pressed="false"').replace('data-lang="en" aria-pressed="false"', 'data-lang="en" aria-pressed="true"');

fs.mkdirSync(path.join(root, 'en'), { recursive: true });
fs.writeFileSync(path.join(root, 'en/index.html'), h);
console.log('en/index.html dibuat (' + h.length + ' byte)');
