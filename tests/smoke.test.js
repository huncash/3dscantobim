const test = require('node:test');
const http = require('http');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), '3dscantobim-'));
const TOKEN = 'teszt-admin-jelszo-123456';

process.env.DATA_FILE = path.join(tmp, 'leads.sqlite');
process.env.DATABASE_URL = '';
process.env.ADMIN_TOKEN = TOKEN;
process.env.SESSION_SECRET = 'teszt-session-titok-123456';
process.env.SITE_URL = 'http://127.0.0.1:7000';
process.env.SITE_NAME = '3dscantobim';
process.env.CONTACT_EMAIL = 'ertesites@example.com';
process.env.CONTACT_PHONE = '+36 30 667 2510';
process.env.SMTP_HOST = '';
process.env.PORT = '7000';
process.env.BIND_HOST = '127.0.0.1';
process.env.TRUST_PROXY = '0';
process.env.NODE_ENV = 'test';

const { createApp } = require('../src/server');
const { resolveSeo } = require('../src/seo');

let server;
let base;
let db;
let config;

test.before(async () => {
  const created = createApp();
  db = created.db;
  config = created.config;
  server = created.app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  db.close();
  fs.rmSync(tmp, { recursive: true, force: true });
});

function leadBody(extra = {}) {
  return new URLSearchParams({
    partner_name: 'Minta Tervezőiroda',
    contact_name: 'Kiss Anna',
    email: 'anna@example.com',
    phone: '+36 30 111 2233',
    company: 'Minta Tervezőiroda Kft.',
    project_type: 'Épületfelmérés és pontfelhő',
    building_type: 'Irodaépület',
    location: 'Budapest, XI. kerület',
    schedule: 'egyeztetendő',
    output_request: 'E57 pontfelhő',
    software: 'Revit',
    coordinate_system: 'A partner által megadott helyi rendszer',
    accuracy: 'A felhasználás szerint, a briefben rögzítve',
    file_size: '5–20 GB',
    comment: 'A földszint és az első emelet kell a saját sablonhoz.',
    consent: 'igen',
    source_domain: '3dscantobim.hu',
    utm_campaign: 'partner-2026',
    utm_source: 'teszt',
    ...extra,
  });
}

async function text(pathname) {
  const response = await fetch(base + pathname);
  return { response, body: await response.text() };
}

test('a konfiguráció a 7000-es porton és a saját adatfájlon áll', () => {
  assert.equal(config.seoIndex, false);
  assert.equal(config.publicOrigin, 'https://3dscantobim.hu');
  assert.equal(config.port, 7000);
  assert.equal(config.bindHost, '127.0.0.1');
  assert.equal(config.dataFile, path.resolve(process.env.DATA_FILE));
  const nginx = fs.readFileSync(path.join(__dirname, '..', 'deploy', 'nginx-3dscantobim.conf'), 'utf8');
  assert.match(nginx, /server_name 3dscantobim\.hu;/);
  assert.match(nginx, /proxy_pass http:\/\/127\.0\.0\.1:7000;/);
  const compose = fs.readFileSync(path.join(__dirname, '..', 'docker-compose.yml'), 'utf8');
  assert.match(compose, /127\.0\.0\.1:7000:7000/);
});

test('a főoldal a kért üzenetet és a három kiemelést mutatja', async () => {
  const { response, body } = await text('/');
  assert.equal(response.status, 200);
  assert.match(body, /<h1>Ön modellez\. Mi felmérünk\.<\/h1>/);
  assert.match(body, /Terepi 3D felmérés és egyeztetett pontfelhő-átadás a saját tervezési munkafolyamatához\./);
  assert.match(body, /Átadási specifikáció/);
  assert.match(body, /Pontfelhő a saját folyamathoz/);
  assert.match(body, /A modell külön döntés/);
  assert.match(body, /href="#specifikacio"/);
  assert.match(body, /href="\/pontfelho-atadas"/);
  assert.match(body, /2016–2026 \(R\) Minden jog fenntartva\./);
  assert.match(body, /<a href="\/">3dscantobim\.hu<\/a>/);
  assert.match(body, /<a href="\/kapcsolat#projektigeny">Írjon nekünk<\/a>/);
  assert.match(body, /Telefonon: H–P 8:00–19:00/);
  assert.match(body, /<img class="footer-logo" src="\/images\/adp-top-logo\.png" alt="ADP-TOP" width="239" height="108">/);
  assert.doesNotMatch(body, /ADP-TOP Kft|Híradó utca|4712|Főtevékenység/);
  assert.match(body, /https:\/\/bim\.vrgo\.hu\//);
  assert.match(body, /<title>3D felmérés és pontfelhő BIM-hez \| 3D scan to BIM<\/title>/);
  assert.match(body, /class="brand-logo" src="\/images\/logo\.png" alt="3D scan to BIM"/);
  assert.match(body, /class="slip-brand">3D scan to BIM</);
  assert.match(body, /property="og:site_name" content="3D scan to BIM"/);
  assert.match(body, /"name":"3D scan to BIM"/);
  assert.doesNotMatch(body, /3D Scan to BIM|3D SCAN TO BIM/);
  assert.match(body, /Terepi 3D felmérés tervezőirodáknak és BIM-modellezőknek/);
  assert.match(body, /rel="canonical" href="https:\/\/3dscantobim\.hu\/"/);
  assert.match(body, /noindex,nofollow/);
  assert.doesNotMatch(body, /127\.0\.0\.1|localhost|:7000/);
  assert.match(body, /property="og:title"/);
  assert.match(body, /name="twitter:card"/);
  assert.match(body, /application\/ld\+json/);
  assert.match(body, /Projektet egyeztetek/);
  assert.doesNotMatch(body, /Kérjen minta-anyagot/);
  assert.doesNotMatch(body, /500\s?ezer|1 millió pont|2 millió pont|2,2|VZ-600i|RTC360|Trimble X9/);
  assert.doesNotMatch(body, /milliméter pontos/);
  assert.doesNotMatch(body, /garantált pontosság/);
  assert.doesNotMatch(body, /nulla hiba/);
  assert.doesNotMatch(body, /minden helyzetben/);
});

test('a nyilvános oldalak és a cikkek válaszolnak', async () => {
  const paths = [
    '/terepi-felmeres',
    '/pontfelho-atadas',
    '/scan-to-bim',
    '/partneri-egyuttmukodes',
    '/minta-anyagok',
    '/folyamat',
    '/arak',
    '/gyik',
    '/kapcsolat',
    '/adatvedelem',
    '/aszf',
    '/impresszum',
    '/cikkek',
    '/cikkek/mit-varjon-egy-bim-modellezo-a-terepi-felmerestol',
    '/cikkek/pontfelho-ifc-es-revit',
    '/cikkek/hogyan-zajlik-egy-scan-to-bim-egyuttmukodes',
    '/cikkek/milyen-adatok-kellenek-egy-jo-felmeresi-briefhez',
    '/cikkek/mikor-erdemes-kiszervezni-a-terepi-felmerest',
    '/cikkek/hogyan-ellenorizheto-egy-pontfelho-minosege',
    '/healthz',
    '/kapcsolat?igeny=minta',
  ];
  for (const pathname of paths) {
    const { response, body } = await text(pathname);
    assert.equal(response.status, 200, pathname);
    assert.doesNotMatch(body, /milliméter pontos|garantált pontosság|nulla hiba|minden helyzetben/);
  }
  const scan = await text('/scan-to-bim');
  assert.match(scan.body, /nem része automatikusan minden felmérési megbízásnak/);
  assert.doesNotMatch(scan.body, /ADP-TOP Kft|Híradó utca/);
  assert.match(scan.body, /alt="ADP-TOP"/);
  const article = await text('/cikkek/pontfelho-ifc-es-revit');
  assert.doesNotMatch(article.body, /ADP-TOP Kft|Híradó utca/);
  const contact = await text('/kapcsolat');
  assert.match(contact.body, /id="projektigeny"/);
  assert.match(contact.body, /Telefonon hétfőtől péntekig, 8:00 és 19:00 között hívhat\./);
  assert.match(contact.body, /href="tel:\+36306672510"/);
  assert.doesNotMatch(contact.body, /ADP-TOP Kft|Híradó utca|ügyfélfogadás/);
  const terms = await text('/aszf');
  assert.match(terms.body, /Üzemeltető adatai/);
  assert.match(terms.body, /ADP-TOP Kereskedelmi és Szolgáltató Kft\./);
  assert.match(terms.body, /Híradó utca 29/);
  assert.doesNotMatch(terms.body, /4712|Főtevékenység|Iparcikk jellegű vegyes kiskereskedelem/);
  const privacy = await text('/adatvedelem');
  assert.match(privacy.body, /<h2>Adatkezelő<\/h2>/);
  assert.match(privacy.body, /ADP-TOP Kereskedelmi és Szolgáltató Kft\./);
  const sample = await text('/kapcsolat?igeny=minta');
  assert.match(sample.body, /Minta-anyag kérése/);
});

test('a sitemap és a robots a nyilvános címeket kezeli', async () => {
  const site = await text('/sitemap.xml');
  assert.match(site.body, /pontfelho-atadas/);
  assert.match(site.body, /hogyan-ellenorizheto-egy-pontfelho-minosege/);
  assert.match(site.body, /<loc>https:\/\/3dscantobim\.hu\/pontfelho-atadas<\/loc>/);
  assert.match(site.body, /<lastmod>2026-11-17<\/lastmod>/);
  assert.match(site.body, /<lastmod>2026-11-09<\/lastmod>/);
  assert.doesNotMatch(site.body, /\/admin|koszonjuk|127\.0\.0\.1|localhost|:7000/);
  const robots = await text('/robots.txt');
  assert.match(robots.body, /Disallow: \//);
  assert.doesNotMatch(robots.body, /127\.0\.0\.1|Sitemap:/);
});

test('a keresési cím, a canonical és a megosztás nem a helyi hostra mutat', async () => {
  assert.deepEqual(resolveSeo({ siteUrl: 'http://127.0.0.1:7000', nodeEnv: 'production', seoIndex: 'igen' }), {
    publicOrigin: 'https://3dscantobim.hu',
    indexable: false,
  });
  assert.deepEqual(resolveSeo({ siteUrl: 'https://3dscantobim.hu', nodeEnv: 'production', seoIndex: 'igen' }), {
    publicOrigin: 'https://3dscantobim.hu',
    indexable: true,
  });
  assert.equal(resolveSeo({ siteUrl: 'https://3dscantobim.hu', nodeEnv: 'production', seoIndex: '' }).indexable, false);
  const pages = ['/', '/terepi-felmeres', '/pontfelho-atadas', '/scan-to-bim', '/partneri-egyuttmukodes', '/cikkek'];
  const titles = new Set();
  const descriptions = new Set();
  for (const pathname of pages) {
    const { body } = await text(pathname);
    const title = body.match(/<title>([^<]+)<\/title>/)[1];
    const description = body.match(/<meta name="description" content="([^"]+)"/)[1];
    assert.equal(titles.has(title), false, title);
    assert.equal(descriptions.has(description), false, description);
    titles.add(title);
    descriptions.add(description);
    assert.match(body, new RegExp(`rel="canonical" href="https://3dscantobim\\.hu${pathname === '/' ? '/' : pathname}"`));
    assert.match(body, /og:image" content="https:\/\/3dscantobim\.hu\/images\/og\.png"/);
    assert.match(body, /summary_large_image/);
    assert.match(body, /hu_HU/);
    assert.match(body, /og:image:width" content="1200"/);
    assert.doesNotMatch(body, /127\.0\.0\.1|localhost|:7000|openingHours|aggregateRating|Review/);
    assert.equal((body.match(/<h1>/g) || []).length, 1);
  }
  const home = await text('/?utm_source=teszt&utm_campaign=seo');
  assert.match(home.body, /rel="canonical" href="https:\/\/3dscantobim\.hu\/"/);
  assert.doesNotMatch(home.body, /canonical" href="[^"]*utm/);
  const slash = await fetch(base + '/gyik/', { redirect: 'manual' });
  assert.equal(slash.status, 301);
  assert.equal(slash.headers.get('location'), '/gyik');
  const www = await new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: server.address().port,
        path: '/pontfelho-atadas',
        headers: { host: 'www.3dscantobim.hu' },
      },
      (res) => resolve(res)
    );
    req.on('error', reject);
    req.end();
  });
  assert.equal(www.statusCode, 301);
  assert.equal(www.headers.location, 'https://3dscantobim.hu/pontfelho-atadas');
  const missing = await text('/nincs-ilyen-felmeres');
  assert.equal(missing.response.status, 404);
  assert.match(missing.body, /noindex/);
  const icons = ['/favicon.ico', '/favicon.svg', '/favicon-32.png', '/favicon-16.png', '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png', '/images/logo.png', '/images/og.png'];
  for (const icon of icons) {
    const file = await fetch(base + icon);
    assert.equal(file.status, 200, icon);
  }
  const og = await fs.promises.readFile(path.join(__dirname, '..', 'public', 'images', 'og.png'));
  assert.equal(og.readUInt32BE(16), 1200);
  assert.equal(og.readUInt32BE(20), 630);
  const delivery = await text('/pontfelho-atadas');
  assert.match(delivery.body, /"@type":"Service"/);
  assert.match(delivery.body, /nem BIM-modell/);
  assert.doesNotMatch(delivery.body, /ProfessionalService|openingHours/);
  const admin = await text('/admin');
  assert.match(admin.body, /noindex,nofollow/);
  assert.match(admin.response.headers.get('x-robots-tag'), /noindex/);
});

test('a elírt partneri cím átirányít', async () => {
  const response = await fetch(base + '/partneri-egytuutmuves', { redirect: 'manual' });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), '/partneri-egyuttmukodes');
});

test('hiányos űrlap nem rögzít projektigényt', async () => {
  const response = await fetch(base + '/projektigeny', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: leadBody({ consent: '' }),
  });
  assert.equal(response.status, 400);
  const body = await response.text();
  assert.match(body, /adatkezelési tájékoztatót/);
});

test('érvényes projektigény visszaigazolást ad, és az admin CSV-be exportálja', async () => {
  const created = await fetch(base + '/projektigeny', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', referer: `${base}/?utm_campaign=partner-2026` },
    body: leadBody(),
    redirect: 'manual',
  });
  assert.equal(created.status, 303);
  const location = created.headers.get('location');
  assert.match(location, /^\/koszonjuk\?ref=S7-\d{5}$/);
  const thanks = await text(location);
  assert.match(thanks.body, /Rögzítettük a projektigényt/);
  assert.match(thanks.body, /S7-/);
  assert.match(thanks.body, /nem számolt árat/);

  const hidden = await text('/admin');
  assert.equal(hidden.response.status, 401);
  assert.doesNotMatch(hidden.body, /anna@example.com/);

  const bad = await fetch(base + '/admin/bejelentkezes', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ password: 'rossz-jelszo-123456' }),
    redirect: 'manual',
  });
  assert.equal(bad.status, 401);

  const login = await fetch(base + '/admin/bejelentkezes', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ password: TOKEN }),
    redirect: 'manual',
  });
  assert.equal(login.status, 303);
  const cookie = login.headers.getSetCookie().find((item) => item.startsWith('s7bim_admin=')).split(';')[0];
  assert.equal(cookie.includes('pf6_admin'), false);

  const admin = await fetch(base + '/admin', { headers: { cookie } });
  const adminBody = await admin.text();
  assert.match(adminBody, /anna@example.com/);
  assert.match(adminBody, /Budapest, XI\. kerület/);
  const detail = await fetch(base + '/admin/leads/1', { headers: { cookie } });
  const detailBody = await detail.text();
  assert.equal(detail.status, 200);
  assert.match(detailBody, /E57 pontfelhő/);
  assert.match(detailBody, /A partner által megadott helyi rendszer/);
  assert.match(detailBody, /partner-2026/);

  const csv = await fetch(base + '/admin/export.csv', { headers: { cookie } });
  assert.match(csv.headers.get('content-type'), /text\/csv/);
  const csvBody = await csv.text();
  assert.match(csvBody, /Partner neve/);
  assert.match(csvBody, /Koordinátarendszer/);
  assert.match(csvBody, /Kampány \/ UTM campaign/);
  assert.match(csvBody, /Pontossági igény/);
  assert.match(csvBody, /Fájlméret/);
  assert.match(csvBody, /anna@example.com/);
  assert.match(csvBody, /partner-2026/);

  const injected = await fetch(base + '/projektigeny', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: leadBody({ partner_name: '=1+1', email: 'formula@example.com' }),
    redirect: 'manual',
  });
  assert.equal(injected.status, 303);
  const csv2 = await (await fetch(base + '/admin/export.csv', { headers: { cookie } })).text();
  assert.match(csv2, /'=1\+1/);
  assert.match(csv2, /Specifikáció hivatkozása/);
});

test('a rövid projektbrief műszaki adatok nélkül is rögzül', async () => {
  const created = await fetch(base + '/projektigeny', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      contact_name: 'Rövid Partner',
      email: 'rovid@example.com',
      comment: 'Irodaház földszintje a saját modellhez.',
      consent: 'igen',
    }),
    redirect: 'manual',
  });
  assert.equal(created.status, 303);
  const row = db.listLeads({ q: 'rovid@example.com' })[0];
  assert.equal(row.contact_name, 'Rövid Partner');
  assert.equal(row.partner_name, 'Rövid Partner');
  assert.equal(row.file_size, '');
  assert.equal(row.location, '');
  assert.equal(row.spec_reference, '');
  assert.equal(row.comment, 'Irodaház földszintje a saját modellhez.');
});

test('az átadás nem keveri a formátumokat és nem ígér mintát vagy műszerszámot', async () => {
  const { publicInstrumentClaims } = require('../src/content/claims');
  assert.equal(publicInstrumentClaims().length, 0);
  const delivery = await text('/pontfelho-atadas');
  assert.equal(delivery.response.status, 200);
  for (const item of [
    'Felmérendő terület és kritikus részletek',
    'Szükséges pontosság és részletesség',
    'Koordinátarendszer, origó és mértékegység',
    'Regisztráció és ellenőrzés',
    'Exportformátum',
    'Állományok bontása és méretkezelése',
    'Képi dokumentáció',
    'Hozzáférési korlátok és takarások',
    'Átadási ütem és elfogadási szempontok',
    'Terepi adatfelvétel',
    'Regisztrált pontfelhő',
    'Tervezésre előkészített adatcsomag',
  ]) {
    assert.match(delivery.body, new RegExp(item));
  }
  assert.match(delivery.body, /Az E57 átadása nem BIM-modell/);
  assert.match(delivery.body, /Modellcsere, nem pontfelhő/);
  assert.match(delivery.body, /Saját műszerparkot nem állítunk/);
  assert.doesNotMatch(delivery.body, /500000|1000000|2000000|2\.2|VZ-600i|RTC360|Trimble X9/);
  assert.doesNotMatch(delivery.body, /href="[^"]+\.(e57|rcp|ifc|rvt|pln)"/i);
  assert.doesNotMatch(delivery.body, /letöltés|download/i);
  const samples = await text('/minta-anyagok');
  assert.match(samples.body, /nincs letöltés/);
  assert.doesNotMatch(samples.body, /href="[^"]+\.(e57|rcp|ifc|rvt|pln)"/i);
  const home = await text('/');
  const hrefs = [...home.body.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  const unique = [...new Set(hrefs)].filter((href) => href !== '/admin' && !href.startsWith('/admin'));
  for (const href of unique) {
    const page = await text(href);
    assert.equal(page.response.status, 200, href);
  }
});
