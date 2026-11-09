const nodemailer = require('nodemailer');
const { oneLine, refCode } = require('./util');
const { STATUS_LABEL } = require('./db');

function leadText(config, lead, id) {
  const lines = [
    `Új partneri projektigény érkezett a ${config.siteName} oldalról.`,
    '',
    `Hivatkozás: ${refCode(id)}`,
    `Beküldés időpontja: ${lead.submitted_at || ''}`,
    `Partner neve: ${lead.partner_name}`,
    `Kapcsolattartó: ${lead.contact_name}`,
    `E-mail: ${lead.email}`,
    `Telefon: ${lead.phone}`,
    `Cég: ${lead.company}`,
    `Projekt típusa: ${lead.project_type}`,
    `Épület típusa: ${lead.building_type}`,
    `Helyszín: ${lead.location}`,
    `Tervezett ütemezés: ${lead.schedule}`,
    `Kért kimenet: ${lead.output_request}`,
    `Szoftver: ${lead.software}`,
    `Koordinátarendszer: ${lead.coordinate_system}`,
    `Pontossági igény: ${lead.accuracy}`,
    `Fájlméret: ${lead.file_size}`,
    `Megjegyzés: ${lead.comment || 'nincs'}`,
    '',
    `Forrásdomain: ${lead.source_domain}`,
    `Forrás URL: ${lead.source_url || 'nincs'}`,
    `Kampány: ${lead.utm_campaign || 'nincs'}`,
    `UTM source / medium: ${lead.utm_source || '-'} / ${lead.utm_medium || '-'}`,
    `UTM term / content: ${lead.utm_term || '-'} / ${lead.utm_content || '-'}`,
    `Státusz: ${STATUS_LABEL[lead.status] || lead.status}`,
    '',
    'Az oldal nem készített árat és nem kötött szerződést. Ha a specifikációból nem állapítható meg a feladat, előbb vissza kell kérdezni.',
  ];
  return lines.join('\n');
}

function customerText(config, lead, id) {
  return [
    `Kedves ${oneLine(lead.contact_name, 120)}!`,
    '',
    'Rögzítettük a projektigényt a terepi felmérésről és az egyeztetett pontfelhő-átadásról.',
    `Hivatkozási szám: ${refCode(id)}`,
    `Partner: ${oneLine(lead.partner_name, 120)}`,
    `Kért kimenet: ${oneLine(lead.output_request, 160)}`,
    '',
    'Átnézzük a megadott specifikációt. Ha a helyszínhez, a kimenethez, a koordinátarendszerhez vagy a hozzáféréshez kevés az adat, visszakérdezünk. Írásos ajánlatot csak ezután küldünk. Az űrlap nem számít árat, és nem keletkezik belőle szerződés.',
    '',
    `Ha néhány munkanapon belül nem jelentkezünk, írjon a ${config.contactEmail} címre, és tüntesse fel a hivatkozási számot.`,
    '',
    config.companyShortName,
    config.siteUrl,
  ].join('\n');
}

async function notifyLead(config, lead, id) {
  if (!config.smtp.host) return 'nincs_smtp';
  if (!config.contactEmail) return 'nincs_cimzett';
  const from = config.smtp.from || config.contactEmail;
  const transport = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  let operatorOk = false;
  try {
    await transport.sendMail({
      from,
      to: config.contactEmail,
      replyTo: oneLine(lead.email, 160),
      subject: `Projektigény: ${oneLine(lead.partner_name, 60)}, ${oneLine(lead.location, 60)} (${refCode(id)})`,
      text: leadText(config, lead, id),
    });
    operatorOk = true;
    if (config.smtp.sendCustomerCopy) {
      await transport.sendMail({
        from,
        to: oneLine(lead.email, 160),
        replyTo: config.contactEmail,
        subject: `Rögzítettük a projektigényt (${refCode(id)})`,
        text: customerText(config, lead, id),
      });
    }
    return 'elkuldve';
  } catch (error) {
    console.error(`SMTP hiba (${refCode(id)}): ${error.message}`);
    return operatorOk ? 'reszben' : 'hiba';
  }
}

module.exports = { notifyLead, leadText };
