# Staff content templates — Stage 6.2

Use the Decap editor at `/admin/` once the website is deployed. Choose the matching collection and fill in its fields. The six files in this folder show the same minimum structure for staff who prepare Markdown outside the editor. They are reference templates, not public website content. New CMS entries are drafts by default.

| Content | Template | Fill in before publishing |
| --- | --- | --- |
| Project | [project.md](project.md) | Title, category, summary and problem |
| Award or selection | [award.md](award.md) | Title, organiser, exact result and achievement type |
| News or scheme | [news.md](news.md) | Title, category and summary |
| Competition notice | [competition.md](competition.md) | Title, organiser and summary |
| Event gallery | [event-gallery.md](event-gallery.md) | Title, summary and at least one prepared image for a gallery |
| Tech Grooves issue | [tech-grooves.md](tech-grooves.md) | Title, edition, confirmed year and description; add the reviewed PDF before publication |

The word `REPLACE` in a template means the field needs real source-backed text. Select a valid category or achievement type from the editor's list. `REPLACE_WITH_YEAR` must become a confirmed four-digit number; never copy it into a live content file. The templates deliberately omit optional dates, levels, student lists and media until they are known. Keep `publishStatus: draft` while preparing content and `sample: false` for real records. The sample records already in `src/content/` are fictional schema examples and should not be used as school content.

| Content | Allowed choice | Useful optional fields |
| --- | --- | --- |
| Project | Category: Robotics, AI & IoT, Sustainability, Health & Safety, or Social Innovation | Stage, year, objective, team, mentor, photos, report PDF, video and a separately approved testimonial |
| Award | Type: Award, Selection, Participation, Grant, or Recognition | Competition, level, exact date or year, student names, `projectId`, certificate, photos and official result link |
| News | Category: Achievement, Announcement, Scheme, Workshop, Result, or External Link | Publication date, image, official link, attachment and full article |
| Competition | No category choice | Eligibility, announcement date, deadline, official or registration link, image and attachment |
| Event gallery | No category choice | Exact date or year, location, gallery images, report PDF, video and participant names |
| Tech Grooves | Confirmed numeric year required | Cover image, issue PDF, article titles and issue notes |

For an award, keep the result and achievement type distinct: a selection is not an award win. A competition deadline is shown as open through the listed day in India and closed afterward, so use only a confirmed exact date. If only a year is known for an event or award, enter `year` and leave the exact date blank. Tech Grooves issues need a known year before creating the record.

## Check the source before writing

Use the school's approved CSV/ZIP archive and the confirmed corrections for existing projects and achievements; permission for those supplied materials has already been confirmed. Combine repeat submissions for the same project, preserve distinct achievements, and avoid inventing missing dates or levels. For new material, check the original report, organiser notice, event record or magazine issue before copying a fact or media asset. Do not turn an intention or paraphrase into a testimonial quotation.

Keep respondent email addresses, private contact details and unnecessary student identifiers out of public content. Use the approved ATL contact address in the site's Contact page instead of adding personal contacts to records. Prepare small web copies of photos, give informative alt text, and record actual image dimensions when available. Review the image policy in [IMAGE-POLICY.md](../IMAGE-POLICY.md). Media paths in records start with `/`, such as `/images/uploads/example.webp`; PDFs are public downloads once uploaded and reviewed. The editor stores new uploads under `/images/uploads/`. URLs must begin with `https://` or `http://`.

For an event or project gallery, add one entry for each approved image:

```yaml
gallery:
  - src: "/images/uploads/filename.webp"
    alt: "Describe the visible subject and context"
    caption: "Optional context"
    width: 1200
    height: 800
```

Replace the filename and dimensions with the actual file values. Leave out `caption`, `width` or `height` if unavailable. Do not publish a gallery with only the template example. For a news image, project cover or magazine cover, the same `src` and `alt` fields sit under `image` or `cover` rather than `gallery`.

## Preview and publish

1. In `/admin/`, open the collection, choose **New**, complete the required fields, and save as a draft. For direct Markdown editing, place the completed file in the matching `src/content/<collection>/` folder using a lowercase hyphenated filename.
2. Review the draft's facts, names, images and links with the school source. Keep absent dates, levels, links and media blank. Awards linked to projects use the project's filename without `.md` in `projectId`.
3. To see a draft's **final page** in a Cloudflare Pages branch preview, set `publishStatus` to `published` on the review branch while it remains an unmerged Decap editorial draft. Public collection queries hide `draft` records, so a `draft` record will not show even in a branch preview. The main public site is unchanged until the reviewed branch is merged.
4. Check the branch preview on desktop and mobile. Confirm title, images, alt text, PDF and external links. The school reviewer then publishes or merges the editorial pull request. Cloudflare Pages rebuilds the public site from the publishing branch.
5. Verify the public page after deployment. If a correction is needed, make a new reviewed edit; do not silently replace a published source record.

Exact dates use `YYYY-MM-DD` and should be quoted in Markdown frontmatter, for example `deadline: "2026-10-15"`. A project or award `year` is a number, for example `year: 2026`; only enter it when the source supplies that year. The editor offers only the categories and achievement types accepted by the site schema. A local content update can be checked with `pnpm check` and `pnpm build` before review.
