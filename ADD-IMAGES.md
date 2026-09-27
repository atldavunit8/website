# Adding the remaining images

I can't fetch real photos of people or another organisation's logo for you, so here's exactly
where each file goes and how to wire it up. Everything below uses plain files in `public/` —
Astro serves anything in `public/` at the same path, minus the `public` prefix.

## 1. Principal's portrait — Mrs. Ipsita Das

1. Save her photo as `public/images/leadership/ipsita-das.jpg` (or `.webp`, `.png`).
   Recommended: a portrait-orientation photo, roughly 4:5 ratio (e.g. 800×1000px), so it fills
   the card nicely — the layout is already built for a tall portrait, not a square headshot.
2. Open `src/content/leadership/principal-message.md` and add a `portrait` field to the
   frontmatter (right after `designation`), e.g.:

   ```yaml
   portrait:
     src: "/images/leadership/ipsita-das.jpg"
     alt: "Mrs. Ipsita Das, Principal, DAV Public School, Unit-VIII"
   ```
3. Save. The card on the homepage and the Leadership Messages page will pick it up automatically
   on the next build/dev reload — no other code changes needed.

## 2. Mentor's portrait — Tanmay Kumar Nayak

Same process, in `src/content/leadership/tanmay-nayak-mentor.md`:

1. Save his photo as `public/images/leadership/tanmay-nayak.jpg`.
2. Add to that file's frontmatter:

   ```yaml
   portrait:
     src: "/images/leadership/tanmay-nayak.jpg"
     alt: "Tanmay Kumar Nayak, Mentor, Atal Tinkering Lab"
   ```

## 3. DAV logo in the footer

The footer already has an `<img>` tag wired up and waiting at:

```
public/images/branding/dav-logo.png
```

1. Get the official DAV logo file from the school (or davunit8.org's own asset if you're
   allowed to reuse it) — ideally a square PNG or SVG with a transparent background, at least
   150×150px so it stays sharp.
2. Save it at that exact path and filename: `public/images/branding/dav-logo.png`.
   - If you'd rather use a different filename or an `.svg`, just update the `src` in
     `src/components/SiteFooter.astro` (search for `dav-logo`) to match.
3. That's it — the footer currently hides the image slot automatically if the file is missing
   (so nothing looks broken right now), and it'll appear as soon as the real file lands at that
   path.

## Optional signatures

Both leadership entries also support an optional `signature` field, same shape as `portrait`
(`src` + `alt`), if you get scanned signature images from the Principal or the Mentor later.
