# Stage 6.1 — Decap CMS setup

The public site and the `/admin/` editor are static files generated during `pnpm build`. The build prepares an editor for the seven Markdown collections: leadership, projects, awards, news, competitions, events and publications. The editor configuration mirrors the fields in `src/content.config.ts`, including optional dates, project links, media objects and body text. Standalone testimonials currently remain an empty JSON file and have no CMS editor until the school supplies that deferred content.

## Connection prerequisites

The school has selected Astro, Cloudflare Pages and Decap CMS, and named `atldavunit8/website` as the new GitHub repository. Staff will sign in with GitHub accounts. The Netlify authentication project is `atldavunit8.netlify.app`; this public hostname is connected as the build default. The build assumes `main`, GitHub's usual new-repository default; confirm the actual default branch when the repository has its first commit.

To activate GitHub sign-in, the school needs a hosted OAuth service and GitHub accounts with repository write access. The simplest documented hosted route is Netlify's OAuth provider service, used only for editor authentication; Cloudflare Pages remains the public host. Create a separate Netlify project by manually deploying the tiny `cms/netlify-auth-site/` folder, install GitHub as an OAuth provider there, and obtain its `*.netlify.app` hostname. The Netlify project does not need a Git connection because Decap's GitHub backend connects directly to `atldavunit8/website` with each editor's GitHub token. This route uses Netlify's OAuth provider service, **not** its deprecated Git Gateway.

Netlify setup:

1. Sign in to Netlify. From your team's **Projects** page, select **Add new project → Deploy manually**. Drag the `cms/netlify-auth-site/` folder into the deploy area. Netlify creates a project and assigns a `*.netlify.app` address. Keep that hostname for `CMS_AUTH_SITE_DOMAIN`.
2. In GitHub, create a **new OAuth App** under **Settings → Developer settings → OAuth Apps**. Use `https://atldavunit8.org/admin/` as the Homepage URL and `https://api.netlify.com/auth/done` as the Authorization callback URL. Copy the Client ID and generate a Client Secret. GitHub OAuth Apps do not ask for JavaScript origins.
3. In the new Netlify project, open **Project configuration → Security → OAuth**. Under **Authentication Providers**, select **Install Provider → GitHub**. Enter the Client ID and Client Secret there. No Netlify Identity or Git Gateway setup is needed.
4. The supplied `atldavunit8.netlify.app` hostname is already connected in the website build, and the school reports the GitHub provider installed in Netlify. The public site's `/admin/` will use that project for the OAuth handshake while content edits go to the GitHub repository. A live editor login and draft preview have not yet been tested.

All authorised editors need GitHub accounts with write access to `atldavunit8/website`. Use the school's intended reviewer and branch protection to control publication.

The build reads the non-secret connection settings from Cloudflare Pages build variables:

| Variable | Value |
| --- | --- |
| `CMS_GITHUB_REPO` | Optional override; defaults to `atldavunit8/website` |
| `CMS_GITHUB_BRANCH` | Optional override; defaults to `main`. Set this if the repository's actual default differs. |
| `CMS_AUTH_SITE_DOMAIN` | Optional override; defaults to the school's `atldavunit8.netlify.app`. The build uses Netlify OAuth at `https://api.netlify.com`. |
| `CMS_GITHUB_OAUTH_BASE_URL` | Optional override for another compatible hosted GitHub OAuth service; its HTTPS origin, such as `https://cms-auth.example.org` |

The supplied Netlify hostname makes the build generate `dist/admin/index.html` and `dist/admin/config.yml` from `cms/admin.html` and `cms/config.yml`. Invalid override settings fail the build. No credentials are embedded. Configure Cloudflare Pages to build with `pnpm install --frozen-lockfile && pnpm build`, publish `dist`, and trigger builds from the repository's actual default branch. Avoid Cloudflare Functions or any Astro server adapter.

Register a **GitHub OAuth App** under the GitHub account or organisation that controls the repository. Use `https://atldavunit8.org/admin/` as its Homepage URL and `https://api.netlify.com/auth/done` as its Authorization callback URL when using Netlify OAuth. There is no “Authorized JavaScript origins” field in a GitHub OAuth App. Put the Client ID and Client Secret in the Netlify project's **Security → OAuth → Authentication providers → GitHub** settings. Keep the secret out of this repository and out of Cloudflare build variables. If using a different OAuth host, use that host's documented callback route instead of Netlify's.

See the [Decap GitHub backend guide](https://decapcms.org/docs/github-backend/), [Netlify OAuth provider setup](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/) and [GitHub OAuth App setup](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

## Roles and publishing

- **School administrator:** owns the GitHub repository, Cloudflare Pages project and OAuth service; grants or revokes editor access and manages backups.
- **ATL editor:** adds and edits content through `/admin/`; supplies source-backed facts, image descriptions and approved public media. New entries start with `publishStatus: draft`.
- **School reviewer/publisher:** reviews the Decap editorial workflow pull request and the resulting site preview, checks the publication field, then publishes or merges the reviewed change. GitHub permissions, protected branches and any required checks must enforce this role; Decap's interface alone is not a permission boundary.

Decap's editorial workflow creates a GitHub pull request for unpublished work. Saving in Decap does not make a record public by itself. For a record to appear on the ATL site, its frontmatter must have `publishStatus: published` and `sample: false`, and the reviewed change must reach the branch used by Cloudflare Pages. Existing fictional sample records retain `sample: true` and must never be published. An editor can keep a record in draft while preparing it; the reviewer should check the exact public text and media before changing website visibility to `published` and merging.

The public site reads content at build time. A successful merge triggers a fresh Cloudflare Pages build; the new content appears when that build is deployed. The school still needs to complete one editor login, draft, review and preview run after the repository and site are connected. The current local environment has no Git repository or editor accounts, so this live acceptance check has not yet been run. Staff can prepare entries with the [Stage 6.2 content templates](staff-templates/README.md).

## Media and content rules

Decap uploads new files under `public/images/uploads/`, which the static build serves under `/images/uploads/`. Media fields store absolute public paths. Images must be prepared as compressed web copies before upload and have useful alt text; see [IMAGE-POLICY.md](IMAGE-POLICY.md). PDF fields can upload a public document, but the school should review the file and its publication permission before setting a record to published. Do not enter private contact details or respondent emails into public content.

Keep unknown award dates, levels and project years blank. Use exact `YYYY-MM-DD` strings for supplied dates; existing Markdown frontmatter quotes these dates to preserve them as strings. Use a project filename without `.md` for an award's `projectId`. The seven Decap collections edit existing records as well as new entries, but delete controls are disabled to protect the archive. The generated admin page is marked `noindex`.

Configuration references: [Decap install](https://decapcms.org/docs/install-decap-cms/), [GitHub backend](https://decapcms.org/docs/github-backend/), [backend OAuth options](https://decapcms.org/docs/backends-overview/), and [editorial workflow](https://decapcms.org/docs/editorial-workflows/).
