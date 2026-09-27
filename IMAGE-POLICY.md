# Image handling for the static site

Stage 1.4 baseline. Apply this when project and event media are migrated.

1. Keep original CSV/ZIP sources outside `public/`. Preserve filenames and source associations during review; do not put private respondent emails or unneeded metadata into exported assets.
2. Store photographs used by Astro pages in `src/assets/` when practical. Import them and use Astro's `<Image />` or `<Picture />` component so resizing and format conversion occur at **build time**. Give each informative image meaningful alt text; use empty alt text only for decoration.
3. The existing content schema also accepts public paths (`/images/...`) for Git-backed CMS uploads. Files in `public/` are copied as-is: prepare responsive WebP/AVIF variants before publishing them, record dimensions, and use lazy loading on non-hero media. Reserve an eager load for the main hero image.
4. Use controlled dimensions or aspect ratios to avoid page movement while images load. Keep full-resolution originals private unless they are intentionally offered as downloads.
5. Put downloadable reports, certificates and Tech Grooves PDFs under clearly named public folders only when their matching content records are ready. Check that each link points to an existing file.
6. Use an approved hosted video link or embed for large videos. Do not add request-time image processing, an API route or a server runtime.

The provisional SVG logo lives in `assets/branding/`; the header bundles it at build time. `public/favicon.svg` is a compact provisional mark. Replace both when the final school identity is supplied.
