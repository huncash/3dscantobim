const { esc } = require('./util');
const {
  PROJECT_TYPES,
  BUILDING_TYPES,
  OUTPUTS,
  SOFTWARE,
  COORDINATE_SYSTEMS,
  ACCURACY,
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
      <legend>Kapcsolat</legend>
      <div class="form-grid">
        ${textField({ name: 'contact_name', label: 'Név', value: values.contact_name, errors, required: true, max: 120, autocomplete: 'name' })}
        ${textField({ name: 'email', label: 'E-mail', value: values.email, errors, type: 'email', required: true, max: 160, autocomplete: 'email' })}
        <div class="field span-2">
          <label for="comment">Projekt rövid leírása <span class="req">kötelező</span></label>
          <textarea id="comment" name="comment" maxlength="4000" rows="4" required${errors && errors.comment ? ' aria-invalid="true" aria-describedby="comment-error"' : ''}>${esc(values.comment || '')}</textarea>
          <p class="hint">Néhány mondat a helyszín jellegéről és arról, mire kell az adat. Fájlt az űrlap nem fogad.</p>
          ${fieldError(errors, 'comment')}
        </div>
      </div>
    </fieldset>
    <details class="optional-tech">
      <summary>Műszaki adatok, ha már ismertek</summary>
      <div class="form-grid">
        ${textField({ name: 'partner_name', label: 'Iroda vagy cég', value: values.partner_name, errors, max: 120, autocomplete: 'organization' })}
        ${textField({ name: 'phone', label: 'Telefon', value: values.phone, errors, type: 'tel', max: 40, autocomplete: 'tel' })}
        ${textField({ name: 'location', label: 'Helyszín és méret', value: values.location, errors, max: 160, span: true })}
        ${textField({ name: 'schedule', label: 'Határidő', value: values.schedule, errors, max: 160, span: true })}
        ${selectField({ name: 'output_request', label: 'Kért kimenet', options: OUTPUTS, value: values.output_request, errors, required: false, span: true })}
        ${selectField({ name: 'software', label: 'Szoftver vagy formátum', options: SOFTWARE, value: values.software, errors, required: false })}
        ${selectField({ name: 'coordinate_system', label: 'Koordinátarendszer, ha ismert', options: COORDINATE_SYSTEMS, value: values.coordinate_system, errors, required: false })}
        ${selectField({ name: 'accuracy', label: 'Kritikus pontossági igény', options: ACCURACY, value: values.accuracy, errors, required: false, span: true })}
        ${selectField({ name: 'project_type', label: 'Projekt jellege', options: PROJECT_TYPES, value: values.project_type, errors, required: false })}
        ${selectField({ name: 'building_type', label: 'Épület vagy tér típusa', options: BUILDING_TYPES, value: values.building_type, errors, required: false })}
        ${textField({
          name: 'spec_reference',
          label: 'Meglévő specifikáció hivatkozása',
          value: values.spec_reference,
          errors,
          max: 300,
          span: true,
          hint: 'Link vagy rövid azonosító. Állományt itt nem lehet feltölteni.',
        })}
      </div>
    </details>
    <div class="field consent">
      <label for="consent">
        <input id="consent" name="consent" type="checkbox" value="igen"${values.consent ? ' checked' : ''} required${errors && errors.consent ? ' aria-invalid="true" aria-describedby="consent-error"' : ''}>
        <span>Elolvastam az <a href="/adatvedelem">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy a projektigényem ügyében megkeressenek. Hírlevelet nem kérek.</span>
      </label>
      ${fieldError(errors, 'consent')}
    </div>
    <div class="form-actions">
      <button class="btn" type="submit">Projektet egyeztetek</button>
      <p>Az elküldés még nem ajánlat és nem szerződés. A műszaki mezők nélkül is elküldhető. Ha az árhoz kevés az adat, előbb visszakérdezünk.</p>
    </div>
  </form>`;
}

function ctaBand() {
  return `<aside class="cta-band">
    <div class="wrap cta-inner">
      <div>
        <h2>Projektet egyeztetek</h2>
        <p>Az első megkereséshez a név, az e-mail és a projekt rövid leírása elég. Ár és szerződés ebből még nem készül.</p>
      </div>
      <div class="actions">
        <a class="btn" href="/kapcsolat#projektigeny">Projektet egyeztetek</a>
        <a class="btn btn-ghost" href="/pontfelho-atadas">Átadási specifikáció</a>
      </div>
    </div>
  </aside>`;
}

module.exports = { renderLeadForm, ctaBand };
