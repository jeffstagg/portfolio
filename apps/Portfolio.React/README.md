# Cloud Architect Portfolio

A professional cloud architect portfolio with a built-in admin editor. Built with React + Vite.

## Stack

- **React 18** — UI
- **Vite** — build tool & dev server
- **No UI library** — all styles are inline, zero dependencies beyond React

## Project Structure

```
src/
├── main.jsx                       # Entry point, global styles & fonts
├── App.jsx                        # Client-side router shell
├── api.js                         # All API fetch helpers (base: /api)
├── theme.js                       # Design tokens (colors, fonts)
├── router.js                      # useRouter hook + matchRoute util
│
├── components/
│   ├── ui/
│   │   ├── AzureIcon.jsx          # SVG Azure logo
│   │   ├── Btn.jsx                # Button (primary/cyan/ghost/danger/success)
│   │   ├── ErrorMsg.jsx           # Error banner
│   │   ├── Field.jsx              # Field label wrapper + Input + TextArea
│   │   ├── GlowBg.jsx             # Fixed ambient glow + star field
│   │   ├── Spinner.jsx            # Loading spinner
│   │   └── TopBar.jsx             # 3px gradient bar at page top
│   ├── editors/
│   │   ├── HighlightsEditor.jsx   # Add/remove highlight strings
│   │   ├── MarkdownEditor.jsx     # Split-pane markdown editor (write | preview)
│   │   └── TagsEditor.jsx         # Add/remove technology tags
│   ├── portfolio/
│   │   ├── ExperienceCard.jsx     # Public-facing experience card
│   │   ├── ProjectCard.jsx        # Expandable project detail card
│   │   └── TechPill.jsx           # Technology badge pill
│   └── nav/
│       ├── AdminNav.jsx           # Sticky admin nav with breadcrumb
│       └── PublicNav.jsx          # Sticky public nav
│
├── pages/
│   ├── PortfolioPage.jsx          # Public portfolio (/)
│   ├── AdminLoginPage.jsx         # Auth stub (/admin)
│   ├── AdminExperiencesPage.jsx   # Experience list (/admin/experiences)
│   ├── AdminExperienceFormPage.jsx # New/edit experience
│   └── AdminProjectFormPage.jsx   # New/edit project (split-pane MD editor)
│
└── utils/
    └── markdown.jsx               # renderMarkdown + inlineMarkdown
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`. API calls to `/api/*` are proxied to `http://localhost:3000` — update `vite.config.js` to point at your backend.

## API Contract

Base path: `/api`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/experiences` | List all experiences (with nested projects) |
| GET | `/experiences/:id` | Single experience |
| POST | `/experiences` | Create experience |
| PUT | `/experiences/:id` | Update experience |
| DELETE | `/experiences/:id` | Delete experience |
| GET | `/experiences/:eid/projects/:pid` | Single project |
| POST | `/experiences/:eid/projects` | Create project |
| PUT | `/experiences/:eid/projects/:pid` | Update project |
| DELETE | `/experiences/:eid/projects/:pid` | Delete project |

### Experience shape

```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "period": "string",
  "type": "Full-time | Part-time | Contract | Freelance | Internship",
  "location": "string",
  "image": "string (URL, optional)",
  "highlights": ["string"],
  "projects": [{ ...project }]
}
```

### Project shape

```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "problem": "string (markdown)",
  "solution": "string (markdown)",
  "impact": "string (markdown)",
  "technologies": ["string"]
}
```

## Admin Access

Navigate to `/admin` to access the editor. Authentication is currently stubbed — clicking "Continue as Admin" sets a `sessionStorage` flag and grants access. Replace the `onAuth` handler in `AdminLoginPage.jsx` with your real auth flow (JWT, OAuth, Clerk, etc.) when ready.

## Deployment

```bash
npm run build
```

Output goes to `dist/`. Configure your server to serve `index.html` for all routes so the client-side router works correctly.

**Nginx example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
