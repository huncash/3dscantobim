const { esc, formatWhen, refCode } = require('./util');
const { STATUSES, STATUS_LABEL, MAIL_LABEL } = require('./db');

const FIELDS = [
  ['submitted_at', 'Beküldés időpontja'],
  ['source_domain', 'Forrásdomain'],
  ['source_url', 'Forrás URL'],
  ['utm_campaign', 'Kampány / UTM campaign'],
  ['utm_source', 'UTM source'],
  ['utm_medium', 'UTM medium'],
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

function statusOptions(current) {
  return STATUSES.map(
    ([value, label]) =>
      `<option value="${value}"${value === current ? ' selected' : ''}>${esc(label)}</option>`
  ).join('');
}

function loginPage(error) {
  return `
  <article class="prose wrap admin">
    <p class="kicker">Admin</p>
    <h1>Partner- és projektigény-nyilvántartás</h1>
    <p>A felület jelszóval védett. A jelszó az ADMIN_TOKEN környezeti változó, és csak ebben a folyamatban érvényes.</p>
    ${error ? `<p class="form-errors" role="alert">${esc(error)}</p>` : ''}
    <form class="lead-form" method="post" action="/admin/bejelentkezes">
      <div class="field">
        <label for="password">Jelszó</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
      </div>
      <div class="form-actions">
        <button class="btn" type="submit">Belépés</button>
      </div>
    </form>
  </article>`;
}

function disabledPage() {
  return `
  <article class="prose wrap admin">
    <p class="kicker">Admin</p>
    <h1>A nyilvántartás még nincs megnyitva</h1>
    <p>Állítson be legalább 16 karakteres, egyedi ADMIN_TOKEN értéket a környezeti fájlban. A példában szereplő szöveg szándékosan nem nyitja meg a felületet.</p>
  </article>`;
}

function listPage({ rows, q, status, includeSpam, csrf }) {
  const options = [['', 'Minden státusz']]
    .concat(STATUSES.filter(([value]) => value !== 'spam'))
    .map(
      ([value, label]) =>
        `<option value="${esc(value)}"${value === status ? ' selected' : ''}>${esc(label || value)}</option>`
    )
    .join('');
  const body = rows.length
    ? `<div class="table-wrap"><table>
        <thead><tr>
          <th>Szám</th><th>Időpont</th><th>Partner</th><th>Kapcsolat</th><th>Feladat</th><th>Státusz</th>
        </tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
                <td><a href="/admin/leads/${row.id}">${esc(refCode(row.id))}</a></td>
                <td>${esc(formatWhen(row.submitted_at))}</td>
                <td>${esc(row.partner_name)}<br><span class="muted">${esc(row.company)}</span></td>
                <td>${esc(row.contact_name)}<br>${esc(row.email)}<br>${esc(row.phone)}</td>
                <td>${esc(row.project_type)}<br><span class="muted">${esc(row.location)}</span></td>
                <td>${esc(STATUS_LABEL[row.status] || row.status)}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table></div>`
    : `<p>Nincs a szűrésnek megfelelő projektigény.</p>`;

  return `
  <article class="prose wrap admin">
    <div class="admin-bar">
      <div>
        <p class="kicker">Admin</p>
        <h1>Projektigények</h1>
      </div>
      <form method="post" action="/admin/kijelentkezes">
        <input type="hidden" name="csrf" value="${esc(csrf)}">
        <button class="btn btn-ghost" type="submit">Kilépés</button>
      </form>
    </div>
    <form class="filters" method="get" action="/admin">
      <label for="q">Keresés</label>
      <input id="q" name="q" type="search" value="${esc(q)}" maxlength="80" placeholder="partner, cég, e-mail, helyszín">
      <label for="status">Státusz</label>
      <select id="status" name="status">${options}</select>
      <label class="check" for="spam"><input id="spam" name="spam" type="checkbox" value="1"${includeSpam ? ' checked' : ''}> Spam is</label>
      <button class="btn" type="submit">Szűrés</button>
      <a class="btn btn-ghost" href="/admin/export.csv?q=${encodeURIComponent(q)}&amp;status=${encodeURIComponent(status)}${includeSpam ? '&amp;spam=1' : ''}">CSV export</a>
    </form>
    <p class="muted">${rows.length} tétel ebben a nézetben. A CSV pontosvesszővel tagolt, UTF-8.</p>
    ${body}
  </article>`;
}

function detailValue(lead, key) {
  if (key === 'submitted_at' || key === 'updated_at') return formatWhen(lead[key]);
  if (key === 'status') return STATUS_LABEL[lead.status] || lead.status;
  if (key === 'mail_status') return MAIL_LABEL[lead.mail_status] || lead.mail_status || '';
  if (key === 'consent') return lead.consent ? 'igen' : 'nem';
  return lead[key] || '';
}

function detailPage({ lead, csrf }) {
  const rows = FIELDS.map(
    ([key, label]) => `<dt>${esc(label)}</dt><dd>${esc(detailValue(lead, key)) || '—'}</dd>`
  ).join('');
  return `
  <article class="prose wrap admin">
    <p class="kicker"><a href="/admin">Vissza a listához</a></p>
    <h1>${esc(refCode(lead.id))}</h1>
    <p>${esc(lead.partner_name)} · ${esc(lead.company)} · ${esc(lead.location)}</p>
    <dl class="def">${rows}</dl>
    <form class="status-form" method="post" action="/admin/leads/${lead.id}/status">
      <input type="hidden" name="csrf" value="${esc(csrf)}">
      <label for="status">Státusz módosítása</label>
      <select id="status" name="status">${statusOptions(lead.status)}</select>
      <button class="btn" type="submit">Mentés</button>
    </form>
  </article>`;
}

module.exports = { loginPage, disabledPage, listPage, detailPage };
