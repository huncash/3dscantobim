const { esc, jsonScript, safeEmail, telHref } = require('./util');

const NAV = [
  ['/terepi-felmeres', 'Terepi felmérés'],
  ['/pontfelho-atadas', 'Pontfelhő'],
  ['/scan-to-bim', 'Scan-to-BIM'],
  ['/partneri-egyuttmukodes', 'Együttműködés'],
  ['/minta-anyagok', 'Minták'],
  ['/folyamat', 'Folyamat'],
  ['/arak', 'Árak'],
];

const OG_ALT = '3dscantobim.hu – terepi felmérés és pontfelhő BIM-modellező csapatoknak';

function organizationLd(config) {
  return {
    '@type': 'Organization',
    '@id': `${config.siteUrl}/#szervezet`,
    name: config.siteName,
    url: config.siteUrl,
    email: safeEmail(config.contactEmail) || undefined,
    telephone: config.contactPhone || undefined,
  };
}

function operatorLd(config) {
  return {
    ...organizationLd(config),
    legalName: config.companyLegalName,
    taxID: config.companyTaxId,
    vatID: config.companyEuTaxId,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.companySeat,
      addressCountry: 'HU',
    },
  };
}

function professionalServiceLd(config) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${config.siteUrl}/#szolgaltatas`,
    name: `${config.siteName} – terepi felmérés és pontfelhő`,
    url: config.siteUrl,
    image: `${config.siteUrl}/images/og.png`,
    description:
      'Terepi felmérés és egyeztetett pontfelhő-átadás BIM-modellező csapatoknak és tervezőirodáknak. A Scan-to-BIM külön, rögzített munkacsomag.',
    telephone: config.contactPhone || undefined,
    email: safeEmail(config.contactEmail) || undefined,
    areaServed: { '@type': 'Country', name: 'Magyarország' },
    provider: { '@id': `${config.siteUrl}/#szervezet` },
    knowsAbout: [
      'Scan-to-BIM',
      'pontfelhő',
      'terepi felmérés',
      'BIM-modellezés',
      'IFC',
      'Revit',
      'Archicad',
    ],
  };
}

function breadcrumbLd(config, crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${config.siteUrl}${crumb.path}`,
    })),
  };
}

function faqLd(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function articleLd(config, article) {
  return {
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    inLanguage: 'hu',
    datePublished: article.published,
    dateModified: article.published,
    mainEntityOfPage: `${config.siteUrl}${article.path}`,
    author: { '@type': 'Organization', name: config.siteName },
    publisher: { '@id': `${config.siteUrl}/#szervezet` },
    image: `${config.siteUrl}/images/og.png`,
  };
}

function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

function layout({
  config,
  nonce,
  title,
  description,
  path,
  body,
  robots = 'index,follow',
  crumbs = [],
  jsonLd = [],
  ogType = 'website',
}) {
  const canonical = `${config.siteUrl}${path}`;
  const phoneHref = telHref(config.contactPhone);
  const email = safeEmail(config.contactEmail);
  const nav = NAV.map(
    ([href, label]) =>
      `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${esc(label)}</a>`
  ).join('');
  const crumbHtml = crumbs.length
    ? `<nav class="crumbs wrap" aria-label="Morzsa"><ol>${crumbs
        .map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return `<li>${last ? `<span aria-current="page">${esc(crumb.name)}</span>` : `<a href="${esc(crumb.path)}">${esc(crumb.name)}</a>`}</li>`;
        })
        .join('')}</ol></nav>`
    : '';
  const scripts = jsonLd.map((entry) => jsonScript(entry, nonce)).join('');

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${esc(robots)}">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="alternate" hreflang="hu" href="${esc(canonical)}">
  <meta name="theme-color" content="#152033">
  <meta property="og:type" content="${esc(ogType)}">
  <meta property="og:locale" content="hu_HU">
  <meta property="og:site_name" content="${esc(config.siteName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(config.siteUrl)}/images/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(OG_ALT)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(config.siteUrl)}/images/og.png">
  <meta name="twitter:image:alt" content="${esc(OG_ALT)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/css/site.css?v=${esc(config.assetVersion)}">
  ${scripts}
</head>
<body>
  <a class="skip" href="#tartalom">Ugrás a tartalomra</a>
  <header class="site-header">
    <div class="topbar">
      <div class="wrap utility">
        <p>3dscantobim · terepi felmérés és pontfelhő</p>
        <p class="utility-links">
          <a href="/cikkek">Tudnivalók</a>
          <a href="/gyik">GYIK</a>
          <a href="/kapcsolat">Kapcsolat</a>
          ${phoneHref ? `<a href="${esc(phoneHref)}">${esc(config.contactPhone)}</a><span class="hours">H–P 8:00–19:00</span>` : ''}
        </p>
      </div>
    </div>
    <div class="wrap header-main">
      <a class="brand" href="/">
        <span class="mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="36" height="36">
            <rect x="4" y="4" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <path d="M14 34V18l10-6 10 6v16" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <path d="M14 24h20M24 12v22" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="24" cy="24" r="1.6" fill="currentColor"/>
          </svg>
        </span>
        <span>
          <strong>3dscantobim</strong>
          <small>terepi felmérés és pontfelhő</small>
        </span>
      </a>
      <input class="nav-toggle" id="nav-toggle" type="checkbox">
      <label class="nav-button" for="nav-toggle">Menü</label>
      <nav class="menu" aria-label="Főmenü">
        ${nav}
        <a class="menu-cta" href="/kapcsolat#igeny">Specifikáció</a>
      </nav>
    </div>
  </header>
  <main id="tartalom">
    ${crumbHtml}
    ${body}
  </main>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <section>
        <h2>3dscantobim.hu</h2>
        <p>Terepi felmérés és egyeztetett pontfelhő-átadás BIM-modellező csapatoknak. A modell külön munkacsomag, ha kérik.</p>
      </section>
      <section>
        <h2>Szolgáltatás</h2>
        <ul>
          <li><a href="/terepi-felmeres">Terepi felmérés</a></li>
          <li><a href="/pontfelho-atadas">Pontfelhő átadás</a></li>
          <li><a href="/scan-to-bim">Scan-to-BIM együttműködés</a></li>
          <li><a href="/partneri-egyuttmukodes">Partneri együttműködés</a></li>
          <li><a href="/minta-anyagok">Minta anyagok</a></li>
          <li><a href="/folyamat">A munka menete</a></li>
          <li><a href="/arak">Árazási logika</a></li>
        </ul>
      </section>
      <section>
        <h2>Tudnivalók</h2>
        <ul>
          <li><a href="/cikkek">Összes cikk</a></li>
          <li><a href="/cikkek/mit-varjon-egy-bim-modellezo-a-terepi-felmerestol">Mit várjon a modellező?</a></li>
          <li><a href="/cikkek/pontfelho-ifc-es-revit">Pontfelhő, IFC, Revit</a></li>
          <li><a href="/cikkek/hogyan-ellenorizheto-egy-pontfelho-minosege">Pontfelhő ellenőrzése</a></li>
          <li><a href="/gyik">Gyakori kérdések</a></li>
        </ul>
      </section>
      <section>
        <h2>Kapcsolat</h2>
        <ul>
          ${email ? `<li><a href="mailto:${esc(email)}">${esc(email)}</a></li>` : ''}
          ${phoneHref ? `<li><a href="${esc(phoneHref)}">${esc(config.contactPhone)}</a> <span class="hours">H–P 8:00–19:00</span></li>` : ''}
          <li><a href="https://bim.vrgo.hu/" rel="noopener">Kapcsolódó felület: bim.vrgo.hu</a></li>
        </ul>
      </section>
    </div>
    <div class="wrap legal-links">
      <a href="/aszf">ÁSZF</a>
      <a href="/adatvedelem">Adatkezelési tájékoztató</a>
      <a href="/impresszum">Impresszum</a>
    </div>
    <div class="wrap legal-bar">
      <img class="footer-logo" src="/images/adp-top-logo.png" alt="ADP-TOP" width="239" height="108">
      <span>2016–2026 (R) Minden jog fenntartva.</span>
      <a href="/">3dscantobim.hu</a>
      <a href="/kapcsolat#projektigeny">Írjon nekünk</a>
      ${phoneHref ? `<span class="phone-slot"><a href="${esc(phoneHref)}">${esc(config.contactPhone)}</a><span>Telefonon: H–P 8:00–19:00</span></span>` : ''}
    </div>
  </footer>
  <script src="/js/site.js?v=${esc(config.assetVersion)}" defer></script>
</body>
</html>`;
}

function page({ config, nonce, meta, body, crumbs, jsonLd, robots, ogType }) {
  const trail =
    crumbs ||
    (meta.path === '/'
      ? []
      : [
          { name: 'Főoldal', path: '/' },
          { name: meta.crumb || 'Oldal', path: meta.path },
        ]);
  const data = [...(jsonLd || [])];
  if (trail.length) data.push(graph([breadcrumbLd(config, trail)]));
  return layout({
    config,
    nonce,
    title: meta.title,
    description: meta.description,
    path: meta.path,
    body,
    crumbs: trail,
    jsonLd: data,
    robots,
    ogType,
  });
}

module.exports = {
  layout,
  page,
  operatorLd,
  organizationLd,
  professionalServiceLd,
  breadcrumbLd,
  faqLd,
  articleLd,
  graph,
};
