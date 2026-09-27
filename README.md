# ATL DAV Public School Unit-VIII Website

Working specifications and planning documents for the website of the Atal Tinkering Lab (ATL), DAV Public School, Unit-VIII, Bhubaneswar, Odisha.

## Current status

Stage 0 discovery, Stage 1 foundation, Stage 2 homepage work, Stages 3.1–3.6 project/award pages and factual corrections, Stage 4.1–4.4 page templates, Stage 5.1–5.3 Contact/Collaboration pages, and Stage 6.3 initial content migration are complete. Stage 6.4's local content review is recorded in [the review checklist](stage-6.4-content-review.md); the school confirmed ATL publication review complete on 27 September 2026. Six project reports are now linked as reviewed PDF copies: the five-page GuyNeo report, six-page oyster-mushroom report, HydroSense report, and new IoT fertilizer, charged-pole and Agri-Flow conversions. The cleaning-tool source is a poster, not a report. Tech Grooves issue content, launch news/events, testimonials, and leadership messages remain deferred as directed. The Stage 3.7 investigation is documented in [the implementation review](stage-3.7-review.md); its organiser issue was resolved by a later school clarification. The school owns and handles atldavunit8.org; the selected stack is Astro + Cloudflare Pages + Decap CMS. Seven distinct project records represent ten CSV submissions. The awards collection contains 28 published records: 17 awards (including two GuyNeo district cash awards of ₹10,000 each), 8 selections and 3 recognitions, with a separate fictional draft example. The superseded GuyNeo grant, state recognition, ATL DAV Kalinga Nagar and Regional Science Centre entries are removed. Years remain absent when not supplied. The CMS editor is prepared locally and the school reports the GitHub OAuth provider installed in Netlify; live editor login and preview remain to be checked.

Stage 5.3 is also complete: the homepage and Collaborate page share a conditional testimonial section, and final collaboration/enquiry links are connected. The school has deferred actual testimonials, so the content source is empty and no testimonial placeholder appears publicly. Stage 6.1's static Decap editor configuration and build integration are prepared for `atldavunit8/website`, using `atldavunit8.netlify.app` for GitHub OAuth. The build assumes the new repository uses `main` until its actual default branch is confirmed. Stage 6.2 adds [staff authoring templates](staff-templates/README.md) for six content types. See [the CMS setup guide](cms-setup.md).

## Work locally

Use Node.js 24 and pnpm 11 or newer.

```text
pnpm install --frozen-lockfile
pnpm dev
```

The dev server prints its local URL. Run `pnpm check` to validate the Astro/TypeScript code and content schemas. Run `pnpm build` to generate the fully static site in `dist/`; `pnpm preview` serves that build locally.

For Cloudflare Pages, use `pnpm install --frozen-lockfile && pnpm build` as the build command and `dist` as the output directory. The school will connect its owned domain during a later deployment stage. No Astro server adapter is installed. Do not enable Functions, Workers or on-demand rendering for the public site.

The build also generates `/admin/` for GitHub OAuth through Netlify's `atldavunit8.netlify.app` authentication project while Cloudflare Pages remains the public host. `CMS_AUTH_SITE_DOMAIN`, `CMS_GITHUB_REPO` and `CMS_GITHUB_BRANCH` are optional overrides of that hostname, `atldavunit8/website` and `main`. These settings are public connection metadata, not secrets; OAuth credentials stay with Netlify. See [the CMS setup guide](cms-setup.md) before enabling staff access.

## Content structure

`src/content.config.ts` defines leadership, projects, awards, news, competitions, events and publications. Each folder under `src/content/` has one **fictional draft sample** to demonstrate its schema. Sample records are marked `sample: true` and `publishStatus: draft`; public collection queries must use `isPublished()` from `src/lib/content.ts`. Samples are never real school claims or award counts. The seven published project records combine duplicate submissions while keeping distinct details. Categories are editorial groupings. Project status is optional because the source archive does not establish a current stage for every historical project; cards state when it is unspecified.

Homepage National, State and International counts are derived at build time from published award records classified as `achievementType: Award`. Selections, participation, grants and other recognitions are excluded. The cards are labelled as wins **recorded in the current published archive**, so they are not represented as the school's lifetime totals. Award-winning project cards require a published project and a linked published award. The header keeps Search with the top actions, while mobile navigation includes it in the menu.

Schemas allow optional media and reports until source files are prepared as public website copies. Six of seven published projects now link reviewed PDFs. The three converted DOCX reports have private details removed where needed; the originals stay in the local source ZIP. The cleaning-tool submission has a Drive reference and an MCT poster PNG in the ZIP report folder, but no PDF. The ZIP, response CSV, form PDF and temporary review files are excluded from Git by `.gitignore`, because the source package contains internal contact information. Follow prompts 3.5A and 3.5B in [the invocation library](model-invocation-prompts.md) for any additional report preparation. Award `date`, `year`, `academicYear` and `level` are optional so undated verified awards can be preserved without invented values. Exact dates use `YYYY-MM-DD`; URLs use HTTP(S); public media paths begin with `/` and cannot contain `..`.

The route shell includes Home, About ATL, Leadership, Projects, Awards, Events, News, Schemes, Competitions, Publications, Gallery, Collaborate, Contact and Search, plus a custom 404 page. The Projects listing renders published Markdown records and offers browser-side category filters; without JavaScript, all projects remain visible. Each published project also generates a detail page with conditional team, mentor, media, report, video, linked-achievement and related-project sections. HydroSense has a matched, compressed WebP cover and its reviewed source PDF as a download. The dedicated Projects That Made Us Proud page features only projects linked to published `Award` records, with optional team intention, photos, testimonial, mentor contribution, report, result and video links. The Awards archive groups records by supplied year or "Year not supplied" and offers year, level and achievement-type filters. All records remain browseable without JavaScript. A Wall of Fame highlights featured wins. The site name, draft slogan and public ATL contact follow [current decisions](confirmed-decisions.md).

Stage 4.1–4.4 adds News and Schemes listings, category filtering, news detail pages, competition listings with status filtering and detail pages, an Events archive, event photo albums and detail pages, and Tech Grooves issue listings and detail pages. Competition status treats a deadline as open through the listed date in India and closes it after that date; browser enhancement refreshes status after a static build. An absent deadline is labelled as unlisted. Gallery images use supplied alt text, dimensions and lazy loading; each image is a normal keyboard-accessible link to the full-size file. Prepare compressed web copies before adding new event media; see [image handling policy](IMAGE-POLICY.md). All these collections currently contain only fictional draft samples, so the public pages show empty states and no detail routes are generated. Quote ISO dates in Markdown frontmatter, for example `deadline: "2026-10-15"`, so YAML preserves them as strings. Only published, non-sample records appear on the site.

Contact and Collaborate show the approved ATL email, ATL In-charge, school address and clearly labelled school office number. The email links open the visitor's mail app with an enquiry subject; the website itself stores no messages or claims to confirm delivery. The address remains visible for visitors whose mail app does not open. Collaboration topics are invitations to propose ideas, not claims about existing programmes. The map area and approved-testimonial component are ready for later content, and neither displays an invented map or quote.

The optional hosted-form slot is controlled at build time by **both** `PUBLIC_ATL_FORM_EMBED_URL` and `PUBLIC_ATL_FORM_OPEN_URL`. Leave them unset for the approved email-only route. When the school selects a hosted form, set both to its public HTTPS embed/open links in the build environment, review the provider's consent wording and recipient settings, then rebuild. The form appears alongside the email fallback on both pages; no secret or custom server endpoint is needed. A Formspree-style direct POST form would require a separate provider-specific integration after its endpoint and fields are selected.

### Testimonials and final calls to action (Stage 5.3)

Standalone testimonials live in `src/content/testimonials.json`, initially `[]`, and are validated at build time by `src/lib/testimonials.ts`. Each future record needs a unique `id`, an internal `title`, the supplied `quote` and public `attribution`, `publishStatus` (`draft` or `published`), `approved` (defaults to `false`), optional `sample` (defaults to `false`) and optional nonnegative `displayOrder` (defaults to `0`). Both Home and Collaborate use the same component and sort by display order, then ID. Only published, approved, non-sample records appear; an empty list renders no heading, cards or placeholder.

Add only the supplied testimonial text and attribution when available. Project team intentions remain explanatory prose, not quotes. No existing project or award permission is being reopened by this content handling.

The homepage's final banner links to “Propose a collaboration”; Collaborate ends with the shared official-email enquiry route. The homepage email link uses the same general-enquiry subject as Contact and explains the mail-app/copy-address fallback. Both final internal links resolve to existing static pages. The Stage 5.4 consistency pass and Stage 5.5 privacy review remain separate tasks.

## Shared shell and search-engine baseline

`BaseLayout.astro` supplies the header, desktop navigation, a native HTML mobile menu, a skip link, main content landmark and footer. Empty News, Schemes, Competitions, Events, Gallery and Publications listings are `noindex` until records are published. Their detail routes generate only for published, non-sample entries. The Home page, Projects listing, seven project detail pages, featured showcase and Awards archive are indexable. The build removes `noindex` pages from the generated sitemap.

The canonical host is the school-owned `https://atldavunit8.org`, configured in `astro.config.mjs`. It has not yet been connected or deployed. The static build generates `sitemap-index.xml`; `public/robots.txt` names it. The site uses the provisional SVG mark as a favicon. Page-specific titles and descriptions can be refined as content arrives. See [image handling policy](IMAGE-POLICY.md) for the build-time image and public-file approach.

## Documents

- [Concise requirements summary](requirements-summary.md)
- [Stage 0 closeout and content checklist](stage-0-closeout.md)
- [Current decisions and public school sources](confirmed-decisions.md)
- [Provisional logo and slogan](assets/branding/README.md)
- [Image handling policy](IMAGE-POLICY.md)
- [Source asset metadata](asset-metadata.md)
- [Homepage visual review](homepage-visual-qa.md)
- [Stage 0.1 final requirements brief](final-requirements-brief.md)
- [Source ZIP inspection and inventory](source-zip-inspection.md)
- [Form responses and source review](source-response-review.md)
- [Website specification](website-specification.md)
- [Static technical implementation](technical-implementation.md)
- [Colour system](colour-system.md)
- [Task breakdown](task-breakdown.md)
- [AI model task breakdown](ai-model-task-breakdown.md)
- [Community model-guidance comparison](community-model-guidance-comparison.md)
- [Chronological model runbook](chronological-model-runbook.md)
- [Model invocation prompt library](model-invocation-prompts.md)
- [Stage 6.1 CMS setup and publishing workflow](cms-setup.md)
- [Stage 6.2 staff content templates](staff-templates/README.md)
- [Stage 7.5 deployment steps](stage-7.5-deployment.md)

## Intended direction

- Content-first school ATL showcase
- Fully static deployment at runtime
- Fast, mobile-friendly, accessible design
- Editable news, projects, awards, events, and publications
