# Stage 7.5 — Publish the ATL website

The school approved publication review on 27 September 2026. The homepage is indexable, and the production build removes `noindex` pages from the sitemap. The live editor workflow and the two partial visitor journeys are deferred as directed. Cloudflare Pages and the public domain have not yet been deployed from this workspace.

## 1. Put the prepared site in GitHub

The local folder `C:\Users\dav\random\atlweb` has a new `main` Git branch and the empty repository `https://github.com/atldavunit8/website.git` as `origin`. The website files are staged, but there is no commit or push yet. The original form CSV, source ZIP, form PDF, temporary files, and planning notes are not staged. Keep the original source package private.

In a terminal in that folder, set the Git identity to the school account that should author the first commit, then run:

```powershell
git config user.name "SCHOOL GIT NAME"
git config user.email "SCHOOL GIT EMAIL"
git diff --cached --check
git commit -m "Publish initial ATL website"
git push -u origin main
```

Use the GitHub account with write access to `atldavunit8/website` when prompted. Check that GitHub shows the commit on `main`. Do not add the unstaged archive or form files.

## 2. Create the Cloudflare Pages project

In the school's Cloudflare dashboard, open **Workers & Pages → Create application → Pages → Connect to Git** (some dashboard views say **Import an existing Git repository**). Authorise the school GitHub repository and select `atldavunit8/website`. Choose the `main` production branch, repository root as the root directory, `pnpm install --frozen-lockfile && pnpm build` as the build command, and `dist` as the output directory. Do not add an Astro server adapter or Pages Functions.

Set build environment variables for both production and previews:

| Variable | Value |
| --- | --- |
| `NODE_VERSION` | `24.19.0` |
| `PNPM_VERSION` | `11.19.0` |

The editor connection defaults to GitHub repo `atldavunit8/website`, branch `main`, and Netlify authentication site `atldavunit8.netlify.app`. Set `CMS_GITHUB_REPO`, `CMS_GITHUB_BRANCH`, or `CMS_AUTH_SITE_DOMAIN` only if those values differ. Keep the GitHub OAuth client secret only in Netlify's OAuth-provider settings, never in the repository or Cloudflare build variables.

Choose **Save and Deploy**. Wait for a successful build and open the assigned `*.pages.dev` URL. Check Home, Projects, Awards, Contact, a report PDF, `/sitemap-index.xml`, and `/admin/`. The public site should be static; `/admin/` loading does not by itself complete the deferred editor-workflow test.

## 3. Connect the school domain

In the Pages project, open **Custom domains → Set up a domain** and enter `atldavunit8.org`. Cloudflare requires the apex domain to be a zone on the same account, with its nameservers pointed to Cloudflare. The school's DNS administrator should inventory existing DNS records, especially email records, before changing nameservers. Follow the dashboard's domain and certificate steps. Do not point the apex to Pages by editing DNS alone without associating it under **Custom domains**.

When the domain is active, verify `https://atldavunit8.org/`, `/projects/`, `/awards/`, `/contact/`, a report PDF, `/robots.txt`, and `/sitemap-index.xml`. Confirm that the homepage source has no `noindex` meta tag, the sitemap includes the homepage, and its links use `https://atldavunit8.org`. Keep the `*.pages.dev` URL as a diagnostic address.

## 4. Recovery and deferred checks

Record the successful Pages deployment ID and Git commit. If a later release breaks the site, use **Pages project → Deployments → All deployments → ⋯ → Rollback to this deployment** on the last known good production deployment. Re-test the public domain after rollback. Preview deployments are not rollback targets.

The school has directed the live Decap editor-workflow and the two partial visitor-journey checks to be performed later. Those checks remain open and should be scheduled after the public site is stable.

Official Cloudflare references: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Astro deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [build image versions](https://developers.cloudflare.com/pages/configuration/build-image/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), and [rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).
