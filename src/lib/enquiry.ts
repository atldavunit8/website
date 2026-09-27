export const atlEmail = 'atldavunit8@gmail.com';

function httpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const embedUrl = httpsUrl(import.meta.env.PUBLIC_ATL_FORM_EMBED_URL);
const openUrl = httpsUrl(import.meta.env.PUBLIC_ATL_FORM_OPEN_URL);

// Both public links must be configured for the optional hosted form to appear.
export const hostedForm = embedUrl && openUrl ? { embedUrl, openUrl } : undefined;
