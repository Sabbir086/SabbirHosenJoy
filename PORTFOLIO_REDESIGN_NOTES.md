# Portfolio redesign notes

## Visual direction

Palette: forest green `#153a32`, emerald `#0b9363`, deep emerald `#07583f`, mint `#edf8f1`, soft background `#f2f8f4`, white `#ffffff`.

## Sections updated

- Navbar: softer glass surface, forest text, emerald code mark, emerald resume CTA.
- Hero: portrait-led 2-column composition on desktop, greeting + name hierarchy, role chips, CTAs, social links, original transparent portrait, floating education/focus cards, green frame and mint wave decoration.
- About: white/mint system cards, readable forest text and softer borders.
- Skills: pale mint icon tiles and skill pills (replaces the previous charcoal-gray tiles/pills).
- Projects: white cards, mint technology chips, coordinated icons, softer borders and shadows.
- Experience: bright timeline cards, mint icon blocks and consistent metadata tags.
- Coding Profiles: emerald vector marks, white cards and consistent typography/shadows.
- Achievements: pale filter controls, mint icon blocks and white award cards.
- Documentaries: white cards on a very soft mint section background; video playback surfaces remain dark where needed.
- Contact and footer: emerald interaction accents, pale surfaces and readable muted text.

## Preserved

- Existing copy, project data, links, profile/award/project assets and CV.
- Existing project/gallery, award slideshow, video, scroll reveal, navigation, menu and canvas interaction code.
- Existing Next.js route structure and package scripts.

## Verification note

The JSON and HTML fragments were parsed, the new CSS block braces were checked, and existing interaction scripts were left in place. A full Next.js build was not run in this container because installing the project's npm dependencies timed out here. Run `npm run build` on the Mac after syncing the ZIP to confirm the local production build.
