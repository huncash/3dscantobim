const PUBLIC_ORIGIN = 'https://3dscantobim.hu';

function resolveSeo({ siteUrl, nodeEnv, seoIndex }) {
  let configured = '';
  try {
    const url = new URL(String(siteUrl || ''));
    configured = `${url.protocol}//${url.host}`;
  } catch {
    configured = '';
  }
  const productionHost = configured === PUBLIC_ORIGIN;
  const flag = String(seoIndex ?? '').trim().toLowerCase();
  const enabled = flag === '1' || flag === 'true' || flag === 'yes' || flag === 'igen';
  return {
    publicOrigin: PUBLIC_ORIGIN,
    indexable: nodeEnv === 'production' && productionHost && enabled,
  };
}

function verificationToken(value) {
  const token = String(value ?? '').trim();
  if (!/^[A-Za-z0-9_-]{10,128}$/.test(token)) return '';
  return token;
}

module.exports = { PUBLIC_ORIGIN, resolveSeo, verificationToken };
