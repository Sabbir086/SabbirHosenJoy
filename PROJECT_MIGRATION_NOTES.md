# Migration notes

- Original files `index.html`, `style.css`, `script.js`, `projects.js`, and `media-config.js` are no longer root-level entrypoints.
- `style.css` is preserved as `styles/legacy-portfolio.css` to retain detailed layout and responsive rules.
- `script.js` is adapted as `lib/portfolio-interactions.js`.
- `projects.js` and `media-config.js` are adapted as `lib/project-interactions.js` and `lib/project-media.js`.
- Images and PDFs are served from `public/`.
- No separate Express server or database is needed for the current portfolio. Next.js provides the app server and can host future route handlers/server actions if required.
