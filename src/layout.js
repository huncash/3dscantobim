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

const BRAND = '3D scan to BIM';
const OG_ALT = '3D scan to BIM logó.';

function originOf(config) {
  return config.publicOrigin || 'https://3dscantobim.hu';
}

function websiteLd(config) {
  const origin = originOf(config);
  return {
    '@type': 'WebSite',
    '@id': `${origin}/#weboldal`,
    name: BRAND,
    alternateName: '3dscantobim.hu',
    url: `${origin}/`,
    inLanguage: 'hu-HU',
    publisher: { '@id': `${origin}/#uzemelteto` },
  };
}

function organizationLd(config, { legal = false } = {}) {
  const origin = originOf(config);
  const email = safeEmail(config.contactEmail);
  const node = {
    '@type': 'Organization',
    '@id': `${origin}/#uzemelteto`,
    name: legal ? config.companyLegalName : 'ADP-TOP',
    url: `${origin}/`,
    logo: `${origin}/images/adp-top-logo.png`,
    email: email || undefined,
    telephone: config.contactPhone || undefined,
  };
  if (legal) {
    node.legalName = config.companyLegalName;
    node.taxID = config.companyTaxId;
    node.vatID = config.companyEuTaxId;
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: config.companySeat,
      addressCountry: 'HU',
    };
  }
  return node;
}

function operatorLd(config) {
  return organizationLd(config, { legal: true });
}

function serviceLd(config) {
  const origin = originOf(config);
  return {
    '@type': 'Service',
    '@id': `${origin}/#szolgaltatas`,
    name: 'Terepi 3D felmérés és pontfelhő-átadás',
    serviceType: 'Terepi felmérés BIM-modellező irodáknak',
    url: `${origin}/`,
    image: `${origin}/images/og.png`,
    description:
      'Terepi 3D felmérés és egyeztetett pontfelhő-átadás tervezőirodáknak. Az E57 pontfelhő-állomány, nem BIM-modell. A modellkészítés nem része automatikusan a felmérésnek.',
    provider: { '@id': `${origin}/#uzemelteto` },
    brand: { '@type': 'Brand', name: BRAND },
    areaServed: { '@type': 'Country', name: 'Magyarország' },
  };
}

function breadcrumbLd(config, crumbs) {
  const origin = originOf(config);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${origin}${crumb.path}`,
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
    dateModified: article.updated || article.published,
    mainEntityOfPage: `${originOf(config)}${article.path}`,
    author: { '@id': `${originOf(config)}/#uzemelteto` },
    publisher: { '@id': `${originOf(config)}/#uzemelteto` },
    image: `${originOf(config)}/images/og.png`,
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
  shareTitle,
  shareDescription,
  path,
  body,
  robots = 'index,follow',
  crumbs = [],
  jsonLd = [],
  ogType = 'website',
}) {
  const origin = originOf(config);
  const canonical = `${origin}${path === '/' ? '/' : path}`;
  const image = `${origin}/images/og.png`;
  const socialTitle = shareTitle || title;
  const socialDescription = shareDescription || description;
  const robotsContent = config.seoIndex ? robots : 'noindex,nofollow';
  const verification = [
    config.googleSiteVerification
      ? `<meta name="google-site-verification" content="${esc(config.googleSiteVerification)}">`
      : '',
    config.bingSiteVerification
      ? `<meta name="msvalidate.01" content="${esc(config.bingSiteVerification)}">`
      : '',
  ]
    .filter(Boolean)
    .join('\n  ');
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
  <meta name="robots" content="${esc(robotsContent)}">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="alternate" hreflang="hu" href="${esc(canonical)}">
  <link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
  ${verification}
  <meta name="theme-color" content="#152033">
  <meta property="og:type" content="${esc(ogType)}">
  <meta property="og:locale" content="hu_HU">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:title" content="${esc(socialTitle)}">
  <meta property="og:description" content="${esc(socialDescription)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(OG_ALT)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(socialTitle)}">
  <meta name="twitter:description" content="${esc(socialDescription)}">
  <meta name="twitter:image" content="${esc(image)}">
  <meta name="twitter:image:alt" content="${esc(OG_ALT)}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/css/site.css?v=${esc(config.assetVersion)}">
  ${scripts}
</head>
<body>
  <a class="skip" href="#tartalom">Ugrás a tartalomra</a>
  <header class="site-header">
    <div class="topbar">
      <div class="wrap utility">
        <p>3D scan to BIM · terepi felmérés és pontfelhő</p>
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
        <img class="brand-logo" src="/images/logo.png" alt="3D scan to BIM" width="673" height="164">
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
    shareTitle: meta.shareTitle,
    shareDescription: meta.shareDescription,
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
  websiteLd,
  serviceLd,
  breadcrumbLd,
  faqLd,
  articleLd,
  graph,
};
