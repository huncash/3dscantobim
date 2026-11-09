const { esc } = require('./util');
const {
  PROJECT_TYPES,
  BUILDING_TYPES,
  OUTPUTS,
  SOFTWARE,
  COORDINATE_SYSTEMS,
  ACCURACY,
  FILE_SIZES,
  UTM_KEYS,
} = require('./leads');

function fieldError(errors, name) {
  if (!errors || !errors[name]) return '';
  return `<p class="field-error" id="${name}-error">${esc(errors[name])}</p>`;
}

function selectField({ name, label, options, value, errors, required = true, span = false }) {
  const invalid = errors && errors[name];
  const opts = ['<option value="">Válasszon</option>']
    .concat(
      options.map(
        (option) =>
          `<option value="${esc(option)}"${option === value ? ' selected' : ''}>${esc(option)}</option>`
      )
    )
    .join('');
  return `<div class="field${span ? ' span-2' : ''}">
    <label for="${name}">${esc(label)}${required ? ' <span class="req">kötelező</span>' : ''}</label>
    <select id="${name}" name="${name}"${required ? ' required' : ''}${invalid ? ` aria-invalid="true" aria-describedby="${name}-error"` : ''}>${opts}</select>
    ${fieldError(errors, name)}
  </div>`;
}

function textField({ name, label, value = '', errors, type = 'text', required = false, span = false, max, hint, autocomplete }) {
  const invalid = errors && errors[name];
  return `<div class="field${span ? ' span-2' : ''}">
    <label for="${name}">${esc(label)}${required ? ' <span class="req">kötelező</span>' : ''}</label>
    <input id="${name}" name="${name}" type="${type}" value="${esc(value)}"${required ? ' required' : ''}${max ? ` maxlength="${max}"` : ''}${autocomplete ? ` autocomplete="${esc(autocomplete)}"` : ''}${invalid ? ` aria-invalid="true" aria-describedby="${name}-error"` : ''}>
    ${hint ? `<p class="hint">${esc(hint)}</p>` : ''}
    ${fieldError(errors, name)}
  </div>`;
}

function renderLeadForm({ values = {}, errors = null } = {}) {
  const errorKeys = errors ? Object.keys(errors) : [];
  const summary = errorKeys.length
    ? `<div class="form-errors" role="alert"><p>A projektigényt még nem rögzítettük. Javítsa a jelzett mezőket.</p><ul>${errorKeys
        .map((key) => `<li><a href="#${esc(key)}">${esc(errors[key])}</a></li>`)
        .join('')}</ul></div>`
    : '';
  const hidden = [
    ['source_url', values.source_url || ''],
    ['source_domain', values.source_domain || ''],
    ...UTM_KEYS.map((key) => [key, values[key] || '']),
  ]
    .map(([name, value]) => `<input type="hidden" name="${name}" value="${esc(value)}">`)
    .join('');

  return `<form class="lead-form" method="post" action="/projektigeny" data-lead>
    ${summary}
    ${hidden}
    <div class="hp" aria-hidden="true">
      <label for="s7_hp">Weboldal</label>
      <input id="s7_hp" name="s7_hp" type="text" tabindex="-1" autocomplete="off" value="">
    </div>
    <fieldset>
      <legend>Partner</legend>
      <div class="form-grid">
        ${textField({ name: 'partner_name', label: 'Partner neve', value: values.partner_name, errors, required: true, max: 120, autocomplete: 'organization' })}
        ${textField({ name: 'contact_name', label: 'Kapcsolattartó', value: values.contact_name, errors, required: true, max: 120, autocomplete: 'name' })}
        ${textField({ name: 'email', label: 'E-mail', value: values.email, errors, type: 'email', required: true, max: 160, autocomplete: 'email' })}
        ${textField({ name: 'phone', label: 'Telefon', value: values.phone, errors, type: 'tel', required: true, max: 40, autocomplete: 'tel' })}
        ${textField({
          name: 'company',
          label: 'Cég',
          value: values.company,
          errors,
          required: true,
          max: 160,
          span: true,
          autocomplete: 'organization',
          hint: 'Ha nincs külön cégnév, írja be a partner nevét.',
        })}
      </div>
    </fieldset>
    <fieldset>
      <legend>A feladat</legend>
      <div class="form-grid">
        ${selectField({ name: 'project_type', label: 'Projekt típusa', options: PROJECT_TYPES, value: values.project_type, errors })}
        ${selectField({ name: 'building_type', label: 'Épület vagy ipari tér típusa', options: BUILDING_TYPES, value: values.building_type, errors })}
        ${textField({ name: 'location', label: 'Helyszín', value: values.location, errors, required: true, max: 160, span: true, hint: 'Település és a helyszín jellege elég. A pontos címet egyeztetéskor rögzítjük.' })}
        ${textField({ name: 'schedule', label: 'Tervezett ütemezés', value: values.schedule, errors, required: true, max: 160, span: true, hint: 'Ha még nincs dátum, írja: egyeztetendő.' })}
      </div>
    </fieldset>
    <fieldset>
      <legend>Az átadás</legend>
      <div class="form-grid">
        ${selectField({ name: 'output_request', label: 'Kért kimenet', options: OUTPUTS, value: values.output_request, errors, span: true })}
        ${selectField({ name: 'software', label: 'Szoftver / formátum', options: SOFTWARE, value: values.software, errors })}
        ${selectField({ name: 'coordinate_system', label: 'Koordinátarendszer', options: COORDINATE_SYSTEMS, value: values.coordinate_system, errors })}
        ${selectField({ name: 'accuracy', label: 'Pontossági igény', options: ACCURACY, value: values.accuracy, errors, span: true })}
        ${selectField({ name: 'file_size', label: 'Becsült fájlméret', options: FILE_SIZES, value: values.file_size, errors, span: true })}
        <div class="field span-2">
          <label for="comment">Megjegyzés</label>
          <textarea id="comment" name="comment" maxlength="4000" rows="5">${esc(values.comment || '')}</textarea>
          <p class="hint">Ide kerülhet a szintszám, a bejárható területek, a kizárások és az, ami a modellezési munkafolyamat szempontjából számít. Fájlt az űrlap nem fogad.</p>
          ${fieldError(errors, 'comment')}
        </div>
      </div>
    </fieldset>
    <div class="field consent">
      <label for="consent">
        <input id="consent" name="consent" type="checkbox" value="igen"${values.consent ? ' checked' : ''} required${errors && errors.consent ? ' aria-invalid="true" aria-describedby="consent-error"' : ''}>
        <span>Elolvastam az <a href="/adatvedelem">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy a projektigényem ügyében megkeressenek. Hírlevelet nem kérek.</span>
      </label>
      ${fieldError(errors, 'consent')}
    </div>
    <div class="form-actions">
      <button class="btn" type="submit">Projektigény elküldése</button>
      <p>Az elküldés még nem ajánlat és nem szerződés. Ha a pontos árhoz kevés az adat, előbb visszakérdezünk.</p>
    </div>
  </form>`;
}

function ctaBand() {
  return `<aside class="cta-band">
    <div class="wrap cta-inner">
      <div>
        <h2>Küldje el a felmérési specifikációt</h2>
        <p>A projektigényből nem készül azonnali ár. Ha a helyszín, a kimenet vagy a hozzáférés még hiányzik, előbb azt tisztázzuk.</p>
      </div>
      <div class="actions">
        <a class="btn" href="/kapcsolat#igeny">Küldje el a felmérési specifikációt</a>
        <a class="btn btn-ghost" href="/kapcsolat?igeny=minta#igeny">Kérjen minta-anyagot</a>
      </div>
    </div>
  </aside>`;
}

module.exports = { renderLeadForm, ctaBand };
