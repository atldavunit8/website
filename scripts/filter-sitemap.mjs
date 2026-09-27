import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(dirname(fileURLToPath(import.meta.url))), 'dist');
const sitemapFiles = (await readdir(dist)).filter((name) => /^sitemap-\d+\.xml$/.test(name));

if (sitemapFiles.length === 0) throw new Error('No generated sitemap files found.');

let excluded = 0;
for (const name of sitemapFiles) {
  const sitemapPath = join(dist, name);
  const sitemap = await readFile(sitemapPath, 'utf8');
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  let filtered = sitemap;

  for (const entry of entries) {
    const location = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!location) throw new Error(`A URL in ${name} has no location.`);

    const pathname = decodeURIComponent(new URL(location.replaceAll('&amp;', '&')).pathname);
    const relativePath = pathname.replace(/^\/+/, '');
    const htmlPath = pathname.endsWith('.html')
      ? join(dist, relativePath)
      : join(dist, relativePath, 'index.html');
    const html = await readFile(htmlPath, 'utf8');
    const isNoindex = (html.match(/<meta\b[^>]*>/gi) ?? []).some(
      (tag) => /\bname\s*=\s*["']robots["']/i.test(tag) && /\bnoindex\b/i.test(tag),
    );

    if (isNoindex) {
      filtered = filtered.replace(entry, '');
      excluded += 1;
    }
  }

  await writeFile(sitemapPath, filtered);
}

console.log(`Sitemap excludes ${excluded} noindex page(s).`);
