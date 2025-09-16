# JeevanLine Patient Side App (Prototype)

A mobile‑first, voice‑first telemedicine SPA focused on accessibility for rural India. Built with React, Vite, Tailwind, and TypeScript. Includes offline awareness, triage color system, language toggle (EN | HI | PA), and large touch targets for easy use.

Live preview (development): https://6c4a6120d2cd40888a4e5bba5b88add8-dcde5ed4e1294f81912ab9434.fly.dev/

## Highlights
- Mobile-first 1080 × 1920 design with large, tappable cards
- Language toggle: English, Hindi, Punjabi
- Voice-first onboarding and voice inputs (Web Speech API)
- Offline-first: clear Synced/Offline indicator
- Triage palette: Green = Safe, Yellow = Caution, Red = Urgent
- High-contrast (dark) mode toggle

## App Structure (Routes)
- / – Home: greeting + 6 large tiles
  - 🤖 Symptom Checker (/symptom)
  - 📒 Health Journal (/journal)
  - 📔 Prescription Passbook (/passbook)
  - 📞 Teleconsultation (/teleconsult)
  - 💊 Pharmacy Finder (/pharmacy)
  - 🚨 Emergency Help (/emergency)
  - 📚 Learning Hub (/learning)
- /journal – Health Journal: BP, Sugar, Weight, Symptoms; voice logging; 7‑day trend chart; Send Journal to CHW
- /symptom – AI Symptom Checker: quiz, step progress, results with confidence + triage badges; Home Remedies readout; Send Log to CHW (no doctor booking)
- /passbook – Prescription Passbook (user-only): add/manage prescriptions locally (localStorage)
- /teleconsult – Teleconsultation: Doctor appointed, Waiting time, Audio/Video call options; Community Rooms (group consult) by condition with people count and wait time
- /pharmacy – Pharmacy Finder: bulk SMS style request to nearby pharmacies; results by distance with stock status; suggest alternatives if unavailable
- /emergency – One-tap “Call for Help”; alert CHW and request transport
- /learning – Seasonal alerts and tutorials (cards + voice-over); carousel format

## UX & Accessibility
- Icon-driven UI with minimal text, strong visual hierarchy
- Every data entry offers microphone input
- Offline/Synced banner at the bottom; updates on network changes
- High contrast mode toggle in header
- Voice onboarding: when enabled, reads key menu items on Home

## Voice & Internationalization
- Voice synthesis/recognition: client/lib/voice.ts (Web Speech API). If unsupported, UI degrades gracefully.
- Language context + translations: client/hooks/useLang.tsx (EN/HI/PA). Extend by adding keys in the dict object.

## Triage Palette & Theming
- Colors (HSL) defined in client/global.css and mapped in tailwind.config.ts
  - safe: hsl(var(--safe)) – Green
  - caution: hsl(var(--caution)) – Yellow/Amber
  - urgent: hsl(var(--urgent)) – Red
- Primary brand green and tokens configured in client/global.css using HSL; Tailwind consumes via hsl(var(--token)).

## Tech Stack
- React 18, Vite 7, TypeScript
- TailwindCSS 3 (tokens in client/global.css; config in tailwind.config.ts)
- shadcn/Radix UI components (buttons, cards, progress, carousel, etc.)
- Express server integrated (server/index.ts) for future APIs (currently not required for core flows)
- Vitest for testing

## Project Layout
```
client/
  App.tsx                     # SPA entry + routing
  global.css                  # Theme tokens (HSL), Tailwind base
  components/
    Layout.tsx                # Header (lang/voice/contrast), footer (sync)
    SyncStatus.tsx            # Online/Offline banner
    TriageBadge.tsx           # Green/Yellow/Red badge
    VoiceInput.tsx            # Text input + mic button
    ui/                       # shadcn/Radix UI primitives
  hooks/
    useLang.tsx               # i18n provider + translations (EN/HI/PA)
  lib/
    voice.ts                  # speak() and recognize() helpers
  pages/
    Index.tsx                 # Home grid
    Journal.tsx               # Health Journal
    SymptomChecker.tsx        # AI Symptom Checker (CHW only send)
    PrescriptionPassbook.tsx  # User-only passbook (localStorage)
    Teleconsultation.tsx      # Doctor appointed / Waiting time / Audio/Video + Community Rooms
    PharmacyFinder.tsx        # Nearby pharmacies
    EmergencyHelp.tsx         # Big red SOS
    LearningHub.tsx           # Alerts + Tutorials
    NotFound.tsx              # 404
server/
  index.ts                    # Express + Vite integration
  routes/                     # API routes (example)
shared/
  api.ts                      # Shared types example
```

## Development
Prerequisites: Node 18+, pnpm

- Install: pnpm install
- Start dev: pnpm dev
- Build: pnpm build (client + server)
- Start prod: pnpm start (after build)
- Typecheck: pnpm typecheck
- Tests: pnpm test

The dev server runs both client and the integrated Express server together.

## Data & Storage
- Prescription Passbook stored locally in browser localStorage (no backend required)
- Journal sample data and Symptom Checker are local demo logic; CHW send/logging is simulated and can be wired to your backend/API

## Deployment
Use Netlify or Vercel via MCP integrations.

Netlify
1) Push your latest code (UI button: Push Code)
2) Connect Netlify MCP: [Open MCP popover](#open-mcp-popover) and add Netlify
3) I will trigger deployment from here; Netlify builds from source automatically

Vercel
1) Push your latest code (UI button: Push Code)
2) Connect Vercel MCP: [Open MCP popover](#open-mcp-popover) and add Vercel
3) I will trigger deployment; Vercel will build and host

Static/Server build
- Client build output: dist/spa
- Server build output: dist/server

## Customization Guide
- Theme colors/tokens: client/global.css (HSL), tailwind.config.ts
- Components: see client/components/ui and existing patterns (Button, Card, Progress, Carousel)
- Add new pages: create under client/pages and register route in client/App.tsx
- Translations: add keys to dict in client/hooks/useLang.tsx
- Voice behavior: tweak rate/pitch/language in client/lib/voice.ts

## Security & Privacy
- No secrets are committed; do not include private keys in client code
- Voice features use the browser Web Speech API, if available on the device
- Prescription data in passbook is local to the device unless you integrate a backend

## Roadmap Ideas
- Wire “Send to CHW” to a secure backend (Neon/Supabase + auth)
- Real teleconsultation via WebRTC/SFU and queued backend
- CHW dashboards, analytics, reminders, and SMS/WhatsApp bridges (Zapier)

