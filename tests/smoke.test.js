const test = require('node:test');
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
  assert.equal(config.port, 7000);
  assert.equal(config.bindHost, '127.0.0.1');
  assert.equal(config.dataFile, path.resolve(process.env.DATA_FILE));
  const nginx = fs.readFileSync(path.join(__dirname, '..', 'deploy', 'nginx-3dscantobim.conf'), 'utf8');
  assert.match(nginx, /server_name 3dscantobim\.hu;/);
  assert.match(nginx, /proxy_pass http:\/\/127\.0\.0\.1:7000;/);
  const compose = fs.readFileSync(path.join(__dirname, '..', 'docker-compose.yml'), 'utf8');
  assert.match(compose, /127\.0\.0\.1:7000:7000/);
});

test('a főoldal a kért üzenetet és a három szolgáltatást mutatja', async () => {
  const { response, body } = await text('/');
  assert.equal(response.status, 200);
  assert.match(body, /<h1>Terepi felmérés és pontfelhő a saját modellezési munkafolyamatához<\/h1>/);
  assert.match(body, /BIM-modellező csapatoknak és tervezőirodáknak, rögzített átadási specifikációval\./);
  assert.match(body, /Ön modellez\. Mi biztosítjuk a terepi felmérést és az egyeztetett pontfelhő-alapanyagot\./);
  assert.match(body, /Épületfelmérés és pontfelhő/);
  assert.match(body, /Ipari és gépészeti tér felmérés/);
  assert.match(body, /Scan-to-BIM együttműködés/);
  assert.match(body, /Feladat és kimenet egyeztetése/);
  assert.match(body, /E57 vagy más pontfelhő formátum/);
  assert.match(body, /Ellenőrzött felmérési dokumentáció/);
  assert.match(body, /Egyeztetett Scan-to-BIM munkacsomag/);
  assert.match(body, /2016–2026 \(R\) Minden jog fenntartva\./);
  assert.match(body, /<a href="\/">3dscantobim\.hu<\/a>/);
  assert.match(body, /<a href="\/kapcsolat#projektigeny">Írjon nekünk<\/a>/);
  assert.match(body, /Telefonon: H–P 8:00–19:00/);
  assert.match(body, /<img class="footer-logo" src="\/images\/adp-top-logo\.png" alt="ADP-TOP" width="239" height="108">/);
  assert.doesNotMatch(body, /ADP-TOP Kft|Híradó utca|4712|Főtevékenység/);
  assert.match(body, /https:\/\/bim\.vrgo\.hu\//);
  assert.match(body, /property="og:title"/);
  assert.match(body, /name="twitter:card"/);
  assert.match(body, /application\/ld\+json/);
  assert.match(body, /Küldje el a felmérési specifikációt/);
  assert.match(body, /Kérjen minta-anyagot/);
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
  assert.doesNotMatch(site.body, /\/admin/);
  assert.doesNotMatch(site.body, /koszonjuk/);
  const robots = await text('/robots.txt');
  assert.match(robots.body, /Disallow: \/admin/);
  assert.match(robots.body, /Sitemap: http:\/\/127\.0\.0\.1:7000\/sitemap\.xml/);
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
});
