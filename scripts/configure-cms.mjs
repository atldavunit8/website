import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const editorRoot = join(projectRoot, 'dist', 'admin');
const repo = process.env.CMS_GITHUB_REPO?.trim() || 'atldavunit8/website';
const branch = process.env.CMS_GITHUB_BRANCH?.trim() || 'main';
const authSiteDomain = process.env.CMS_AUTH_SITE_DOMAIN?.trim() || 'atldavunit8.netlify.app';
const oauthBaseUrl = process.env.CMS_GITHUB_OAUTH_BASE_URL?.trim() || (authSiteDomain ? 'https://api.netlify.com' : undefined);

await mkdir(editorRoot, { recursive: true });

if (!oauthBaseUrl) {
  const pending = await readFile(join(projectRoot, 'cms', 'setup-pending.html'), 'utf8');
  await writeFile(join(editorRoot, 'index.html'), pending);
  console.log('Decap editor setup pending: a compatible sign-in service has not been configured.');
} else {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) throw new Error('CMS_GITHUB_REPO must be owner/repository.');
  if (!/^[A-Za-z0-9._\/-]+$/.test(branch) || branch.startsWith('/') || branch.includes('..')) throw new Error('CMS_GITHUB_BRANCH is invalid.');
  let authUrl;
  try { authUrl = new URL(oauthBaseUrl); } catch { throw new Error('CMS_GITHUB_OAUTH_BASE_URL must be an HTTPS URL.'); }
  if (authUrl.protocol !== 'https:' || authUrl.username || authUrl.password || authUrl.search || authUrl.hash || authUrl.pathname !== '/') {
    throw new Error('CMS_GITHUB_OAUTH_BASE_URL must be an HTTPS origin without a path, query or credentials.');
  }
  if (authUrl.origin === 'https://api.netlify.com' && !authSiteDomain) {
    throw new Error('Set CMS_AUTH_SITE_DOMAIN to the Netlify authentication site hostname.');
  }
  if (authSiteDomain && (!/^[a-z0-9.-]+$/i.test(authSiteDomain) || authSiteDomain.startsWith('.') || authSiteDomain.endsWith('.') || !authSiteDomain.includes('.'))) {
    throw new Error('CMS_AUTH_SITE_DOMAIN must be a hostname without https:// or a path.');
  }

  const template = await readFile(join(projectRoot, 'cms', 'config.yml'), 'utf8');
  const config = template
    .replace('__CMS_GITHUB_REPO__', JSON.stringify(repo))
    .replace('__CMS_GITHUB_BRANCH__', JSON.stringify(branch))
    .replace('__CMS_OAUTH_BASE_URL__', JSON.stringify(authUrl.origin))
    .replace('__CMS_SITE_DOMAIN_LINE__', authSiteDomain ? `  site_domain: ${JSON.stringify(authSiteDomain)}` : '');
  const admin = await readFile(join(projectRoot, 'cms', 'admin.html'), 'utf8');
  await writeFile(join(editorRoot, 'config.yml'), config);
  await writeFile(join(editorRoot, 'index.html'), admin);
  console.log('Static Decap editor generated in dist/admin/.');
}
