# Sabbir Hosen Joy — Next.js Portfolio

A Next.js App Router version of the existing portfolio. Existing content, project details, links, profile photo, award images, project media and CV are retained. The visual system has been unified around the supplied mint / emerald / forest-green reference.

## Stack

- Next.js App Router (JavaScript)
- React
- Node.js runtime
- Tailwind CSS 4
- Existing custom CSS retained as a compatibility layer; visual tokens and responsive refinements live in `styles/theme-overrides.css`

## Run locally in IntelliJ IDEA

Open the project root (the folder containing `package.json`) in IntelliJ IDEA, then run:

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Stop the server with `Control + C`.

To verify a production build:

```bash
npm run build
```

To serve the production build locally:

```bash
npm run start
```

## Project structure

```text
app/                    Next.js App Router entrypoints
components/layout/      Navbar, footer, loader and canvas
components/sections/    Hero, About, Skills, Projects, Experience, etc.
content/                Preserved portfolio section markup
lib/                    Existing interaction and project logic
public/                 Profile photo, award/project media and CV
styles/                 Legacy layout CSS + unified visual theme
```

## Design updates in this release

- Rebuilt the Hero section markup to match the supplied reference: left-aligned introduction, prominent name, role chips, CTA buttons, social links, original profile portrait, floating identity cards, and soft mint wave decoration.
- Normalized section backgrounds so former `section-dark` and `section-lighter` areas now transition between white and soft mint rather than switching to dark surfaces.
- Fixed the gray/dark Skills icon tiles and pills with a consistent pale-mint treatment.
- Recolored Coding Profiles inline SVG marks from copper to emerald and standardized their card layout, shadows, typography and spacing.
- Unified navbar, buttons, cards, timeline, project tags, achievement filters, contact cards and footer with the same emerald palette.
- Added tablet/mobile breakpoints for the hero, floating cards, skills, coding profiles and contact cards.
- Reused `public/photo/profile/profile.png` as-is; no portrait image processing was performed.

## Where to edit things

- Each section is mounted through a React component in `components/sections/`.
- Preserved section markup and copy are currently stored in `content/portfolio-markup.json`.
- Design tokens, visual styles and responsive refinements are in `styles/theme-overrides.css`.
- Legacy layout and interaction hooks remain in `styles/legacy-portfolio.css` and `lib/` to avoid removing existing behavior.
- Project gallery/media behavior is in `lib/project-media.js` and `lib/project-interactions.js`.
- Replace the CV at `public/CV.pdf` when you have a newer resume.

## Replace files in your existing GitHub repository (Mac / IntelliJ Terminal)

1. Download and extract this ZIP to the Mac's Downloads folder only if you prefer to inspect it first.
2. Open your existing local portfolio repository in IntelliJ IDEA. **Do not delete `.git`, `.idea`, `.env.local`, `node_modules`, or `.next` manually.**
3. In IntelliJ Terminal, from the existing repository root, run:

```bash
mkdir -p /tmp/shjoy-portfolio-update
unzip -q ~/Downloads/SabbirHosenJoy-NextJS-Redesigned.zip -d /tmp/shjoy-portfolio-update
rsync -av \
  --exclude='.git/' \
  --exclude='.idea/' \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='.env*' \
  /tmp/shjoy-portfolio-update/SabbirHosenJoy-NextJS/ ./
```

4. Install/check and run locally:

```bash
npm install
npm run dev
```

5. Once the browser looks correct, run the production build and push to the same GitHub repository:

```bash
git status
git add -A
git commit -m "Polish portfolio with unified mint emerald design"
git push origin "$(git branch --show-current)"
```

This updates the existing repository and branch; it does not create a new repository or erase Git history. The ZIP intentionally contains no `.git` directory.

## Architecture note

The current migration intentionally keeps section content in a preserved markup file and uses small React components as section boundaries. This limits risk to existing content and interaction behavior. It can be converted section-by-section to fully authored JSX/Tailwind components later without starting the portfolio over.
