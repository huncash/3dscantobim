const PROJECT_TYPES = [
  'Épületfelmérés és pontfelhő',
  'Ipari vagy gépészeti tér felmérése',
  'Scan-to-BIM együttműködés',
  'Ismétlődő partneri terepi kapacitás',
  'Minta-anyag kérése',
  'Más, a megjegyzésben leírom',
];

const BUILDING_TYPES = [
  'Lakóépület',
  'Irodaépület',
  'Középület',
  'Ipari csarnok',
  'Gépészeti tér vagy gépház',
  'Műemlék vagy történeti szerkezet',
  'Vegyes rendeltetés',
  'Még nem sorolható be',
];

const OUTPUTS = [
  'E57 pontfelhő',
  'Egyeztetett pontfelhő-formátum a partner szoftveréhez',
  'Pontfelhő és ellenőrzési jegyzőkönyv',
  'Ellenőrzött felmérési dokumentáció',
  'Egyeztetett Scan-to-BIM munkacsomag',
  'Minta-anyag a saját szoftverünkhöz',
  'A kimenetet még egyeztetjük',
];

const SOFTWARE = [
  'Revit',
  'Archicad',
  'IFC-központú munkafolyamat',
  'ReCap vagy más Autodesk pontfelhő-eszköz',
  'Nyílt E57 a partner saját eszközéhez',
  'Még nincs eldöntve',
];

const COORDINATE_SYSTEMS = [
  'A partner által megadott helyi rendszer',
  'EOV',
  'Relatív, a helyszínen rögzített rendszer',
  'Még egyeztetjük',
];

const ACCURACY = [
  'A felhasználás szerint, a briefben rögzítve',
  'Illesztési ellenőrzéssel, szűkebb tűréssel',
  'Tájékoztató lefedettség a modellezési döntés előtt',
  'Még nem rögzített, egyeztetést kérek',
];

const FILE_SIZES = [
  '5 GB alatt',
  '5–20 GB',
  '20–50 GB',
  '50 GB felett',
  'Még nem becsülhető',
];

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function cleanLine(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanUrl(value) {
  const raw = cleanLine(value);
  if (!raw || raw.length > 1000) return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.toString();
  } catch {
    return '';
  }
}

function cleanHost(value, fallback) {
  const host = cleanLine(value).toLowerCase().replace(/:\d+$/, '');
  if (/^[a-z0-9.-]{1,253}$/.test(host) && !host.startsWith('.') && !host.endsWith('.')) return host;
  return fallback;
}

function utmFromUrl(value) {
  const found = {};
  try {
    const url = new URL(value);
    for (const key of UTM_KEYS) found[key] = cleanLine(url.searchParams.get(key) || '').slice(0, 160);
  } catch {
    for (const key of UTM_KEYS) found[key] = '';
  }
  return found;
}

function requireMax(errors, key, value, max, label) {
  if (value.length > max) errors[key] = `A(z) ${label} legfeljebb ${max} karakter lehet.`;
}

function requireChoice(errors, key, value, options, label) {
  if (!options.includes(value)) errors[key] = `Válassza ki: ${label}.`;
}

function validateLead(body, { fallbackHost, referer }) {
  const errors = {};
  const partnerName = cleanLine(body.partner_name);
  const contactName = cleanLine(body.contact_name);
  const email = cleanLine(body.email).toLowerCase();
  const phone = cleanLine(body.phone);
  const company = cleanLine(body.company);
  const projectType = cleanLine(body.project_type);
  const buildingType = cleanLine(body.building_type);
  const location = cleanLine(body.location);
  const schedule = cleanLine(body.schedule);
  const outputRequest = cleanLine(body.output_request);
  const software = cleanLine(body.software);
  const coordinateSystem = cleanLine(body.coordinate_system);
  const accuracy = cleanLine(body.accuracy);
  const fileSize = cleanLine(body.file_size);
  const comment = cleanText(body.comment);
  const consent = body.consent === 'igen';
  const honeypot = cleanLine(body.s7_hp);

  if (partnerName.length < 2) errors.partner_name = 'Adja meg a partner nevét.';
  requireMax(errors, 'partner_name', partnerName, 120, 'partner neve');
  if (contactName.length < 2) errors.contact_name = 'Adja meg a kapcsolattartó nevét.';
  requireMax(errors, 'contact_name', contactName, 120, 'kapcsolattartó');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    errors.email = 'Adjon meg egy használható e-mail címet.';
  }
  const digits = phone.replace(/\D/g, '');
  if (!/^[0-9+()/\-\s]+$/.test(phone) || digits.length < 6 || digits.length > 15) {
    errors.phone = 'Adjon meg egy visszahívható telefonszámot.';
  }
  if (company.length < 2) errors.company = 'Adja meg a céget. Ha nincs külön cégnév, írja be a partner nevét.';
  requireMax(errors, 'company', company, 160, 'cég');
  requireChoice(errors, 'project_type', projectType, PROJECT_TYPES, 'a projekt típusát');
  requireChoice(errors, 'building_type', buildingType, BUILDING_TYPES, 'az épület vagy ipari tér típusát');
  if (location.length < 2) errors.location = 'Adja meg a helyszínt.';
  requireMax(errors, 'location', location, 160, 'helyszín');
  if (schedule.length < 2) errors.schedule = 'Adja meg a tervezett ütemezést. Ha még nincs dátum, írja: egyeztetendő.';
  requireMax(errors, 'schedule', schedule, 160, 'ütemezés');
  requireChoice(errors, 'output_request', outputRequest, OUTPUTS, 'a kért kimenetet');
  requireChoice(errors, 'software', software, SOFTWARE, 'a szoftvert vagy a formátumot');
  requireChoice(errors, 'coordinate_system', coordinateSystem, COORDINATE_SYSTEMS, 'a koordinátarendszert');
  requireChoice(errors, 'accuracy', accuracy, ACCURACY, 'a pontossági igényt');
  requireChoice(errors, 'file_size', fileSize, FILE_SIZES, 'a becsült fájlméretet');
  requireMax(errors, 'comment', comment, 4000, 'megjegyzés');
  if (!consent) errors.consent = 'A projektigény rögzítéséhez el kell fogadnia az adatkezelési tájékoztatót.';

  const refererUrl = cleanUrl(referer);
  const sourceUrl = cleanUrl(body.source_url) || refererUrl;
  let sourceDomain = cleanHost(body.source_domain, '');
  if (!sourceDomain && sourceUrl) {
    try {
      sourceDomain = cleanHost(new URL(sourceUrl).hostname, fallbackHost);
    } catch {
      sourceDomain = fallbackHost;
    }
  }
  if (!sourceDomain) sourceDomain = fallbackHost;

  const fromReferer = utmFromUrl(refererUrl);
  const utm = {};
  for (const key of UTM_KEYS) {
    const direct = cleanLine(body[key] || '').slice(0, 160);
    utm[key] = direct || fromReferer[key] || '';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    spam: Boolean(honeypot),
    values: {
      partner_name: partnerName,
      contact_name: contactName,
      email,
      phone,
      company,
      project_type: projectType,
      building_type: buildingType,
      location,
      schedule,
      output_request: outputRequest,
      software,
      coordinate_system: coordinateSystem,
      accuracy,
      file_size: fileSize,
      comment,
      consent,
      source_domain: sourceDomain,
      source_url: sourceUrl,
      ...utm,
    },
  };
}

function csvCell(value) {
  let text = value == null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  if (/[;"\r\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

const CSV_COLUMNS = [
  ['id', 'Azonosító'],
  ['submitted_at', 'Beküldés időpontja'],
  ['source_domain', 'Forrásdomain'],
  ['source_url', 'Forrás URL'],
  ['utm_source', 'UTM source'],
  ['utm_medium', 'UTM medium'],
  ['utm_campaign', 'Kampány / UTM campaign'],
  ['utm_term', 'UTM term'],
  ['utm_content', 'UTM content'],
  ['partner_name', 'Partner neve'],
  ['contact_name', 'Kapcsolattartó'],
  ['email', 'E-mail'],
  ['phone', 'Telefon'],
  ['company', 'Cég'],
  ['project_type', 'Projekt típusa'],
  ['building_type', 'Épület típusa'],
  ['location', 'Helyszín'],
  ['schedule', 'Tervezett ütemezés'],
  ['output_request', 'Kért kimenet'],
  ['software', 'Szoftver'],
  ['coordinate_system', 'Koordinátarendszer'],
  ['accuracy', 'Pontossági igény'],
  ['file_size', 'Fájlméret'],
  ['comment', 'Megjegyzés'],
  ['status', 'Státusz'],
  ['consent', 'GDPR hozzájárulás'],
  ['mail_status', 'E-mail állapot'],
  ['updated_at', 'Utolsó módosítás'],
];

function toCsv(rows, { statusLabel = {}, mailLabel = {} } = {}) {
  const header = CSV_COLUMNS.map(([, label]) => csvCell(label)).join(';');
  const lines = rows.map((row) =>
    CSV_COLUMNS.map(([key]) => {
      if (key === 'consent') return csvCell(row.consent ? 'igen' : 'nem');
      if (key === 'status') return csvCell(statusLabel[row.status] || row.status);
      if (key === 'mail_status') return csvCell(mailLabel[row.mail_status] || row.mail_status || '');
      return csvCell(row[key]);
    }).join(';')
  );
  return `\uFEFF${[header, ...lines].join('\r\n')}\r\n`;
}

module.exports = {
  PROJECT_TYPES,
  BUILDING_TYPES,
  OUTPUTS,
  SOFTWARE,
  COORDINATE_SYSTEMS,
  ACCURACY,
  FILE_SIZES,
  UTM_KEYS,
  validateLead,
  csvCell,
  toCsv,
};
