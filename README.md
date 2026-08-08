# dBug Labs Platform

Welcome to the **dBug Labs** project repository! This platform serves as the official website for dBug Labs, a technical club focused on Web Development, AI/ML, and more. 

## 🚀 Deployment Link

**Live Website:** [https://dbuglabs26.vercel.app/](https://dbuglabs26.vercel.app/)

## 🛠️ Tech Stack

This project is built using a modern, scalable web development stack:

- **Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7
- **Backend:** Node.js, Express.js
- **CMS:** Sanity Studio 6 (for dynamic content like Events, Team members, etc.) — embedded at `/studio` and lazy-loaded, so it never ships in the public bundle
- **Deployment:** Vercel (Frontend & Server)

## 📂 Project Structure

- `/client` - The React frontend application.
- `/server` - The Node.js Express backend API (handles contact form submissions, etc.).
- `/sanity-studio` - Standalone CMS config. Note the studio the site actually serves is
  embedded at `client/src/studio/` and mounted at `/studio`.

### Inside `client/src`

| Folder | Holds |
| --- | --- |
| `components/ui/` | The design system — `Container`, `Section`, `SectionHeading`, `PageHeader`, `Card`, `Button`, `StatCard`, `FeatureCard`, `IconBadge`, `TabSwitcher`, `CtaBanner`. Import from `components/ui`. |
| `components/common/` | App-wide furniture: `Navbar`, `Footer`, `ScrollToTop`, `BrandIcons`, `CosmicBackground`, `DomainShowcase`, `ImageWithFallback`. |
| `components/{home,about,events,team,projects,contact}/` | Page-specific sections. |
| `data/` | All copy and config as plain modules — `site`, `navigation`, `domains`, `domainTheme`, `roster`, `stats`, `initiatives`, `projects`, `events`, `faqs`. Text edits happen here, not in JSX. |
| `hooks/` | `useTeamData` — merges two Sanity schemas over the `data/roster` fallback. |
| `lib/` | `cx` class-name joiner. |
| `pages/` | One component per route; they compose sections and own no layout of their own. |

**Two conventions worth knowing before editing:**

1. **`<Container>` is the only thing that sets horizontal page rhythm.** The navbar,
   the footer and every page use it, which is what keeps them on the same left/right
   edges. Don't hand-roll `max-w-*` + `px-*` on a page wrapper.
2. **`src/index.css` is cascade-layered** — read the comment at the top of that file
   before adding a rule. Unlayered CSS silently outranks every Tailwind utility.
3. **Page shells must stay transparent.** `<PageAtmosphere>` is a single fixed
   backdrop mounted in `App.jsx` that every route sits on. Anything opaque above it
   (`bg-black` on a `<main>` or a `<Section>`) blanks it out. The hero is the one
   exception — it paints its own `.cosmic-bg` on purpose.

### Serving through a tunnel

`vite.config.js` allowlists `.ngrok-free.app`, `.ngrok.io` and `.trycloudflare.com`
for both `dev` and `preview`, so a fresh tunnel URL works without edits. Hot reload
over a tunnel needs the socket pointed at 443/wss:

```bash
TUNNEL=1 npm run dev --workspace client
```

## ⚙️ Running Locally

To run the project locally, you will need to start the client, server, and optionally the CMS studio.

### Prerequisites
- Node.js **22.12+** (required by Vite 8 and Sanity 6)
- npm

### 1. Client (Frontend)
```bash
cd client
npm install
npm run dev
```
The frontend should now be running on `http://localhost:5173`.

Also available in `client/`:
```bash
npm run lint     # ESLint 10 (flat config)
npm run build    # production build into client/dist
npm run preview  # serve the production build locally
```

### 2. Server (Backend)
```bash
cd server
npm install
npm run dev
```

### 3. Sanity Studio (CMS)
```bash
cd sanity-studio
npm install
npm run dev
```

## 👥 Meet the Team
The platform auto-loads our core team members dynamically based on domains (Web Development, AI/ML, Corporate, etc.) using data from the Sanity CMS!

## 📝 License
This project is proprietary to dBug Labs.
