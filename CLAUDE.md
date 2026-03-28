# Sprintsesh — Claude Code Master Reference

Read this file at the start of every task. It is the single source of truth for architecture decisions, naming conventions, stack configuration, and product rules. Never deviate from decisions marked **LOCKED**.

---

## What Sprintsesh Is

An AI-powered platform that assembles role-based AI agent teams to autonomously build and ship real native mobile, web, and desktop applications. Users describe an app idea → an AI Architect asks clarifying questions and generates a preview → a team of specialized AI agents builds and delivers a working app.

**Output is real native apps** — React Native via Expo for mobile, Next.js/Vercel for web, Tauri for desktop. Not prototypes. Not web-wrapped shells.

**Always write the product name as "Sprintsesh" — never "SprintSesh".**

---

## Tech Stack **LOCKED**

| Layer | Technology |
|---|---|
| Frontend (web app) | Next.js (App Router) |
| Database + Auth | Supabase |
| Primary AI | Anthropic SDK — Claude Opus 4, Claude Sonnet 4, Claude Code |
| Mobile builds | Expo EAS |
| Desktop companion | Tauri (menu bar app — "Sprintsesh Engine") |
| Orchestration | LangGraph with circuit breakers, checkpointing, human-in-the-loop pause nodes |
| Web deployment | Vercel |
| Payments | Stripe |
| Email | Resend |
| Maps/GPS | Mapbox |
| Secondary AI | Gemini 1.5 Pro, NotebookLM |

---

## Architecture Principle — Adapter Pattern **LOCKED**

Every external service sits behind a typed adapter interface. No hardcoded platform choices anywhere in the codebase. Providers are swapped via config, not code changes.

There are **16 defined adapters**. When adding any new external service integration, create an adapter interface first. The adapter lives in `/lib/adapters/`.

```
/lib/adapters/
  ai.ts             — AI provider (Anthropic, Gemini, NotebookLM)
  auth.ts           — Auth provider (Supabase Auth)
  database.ts       — Database (Supabase)
  storage.ts        — File storage (Supabase Storage)
  payments.ts       — Payments (Stripe)
  email.ts          — Email (Resend)
  maps.ts           — Maps/GPS (Mapbox)
  mobile.ts         — Mobile builds (Expo EAS)
  desktop.ts        — Desktop (Tauri)
  orchestration.ts  — Agent orchestration (LangGraph)
  github.ts         — Version control (GitHub)
  notifications.ts  — Push notifications
  analytics.ts      — Analytics
  search.ts         — Search
  media.ts          — Media processing
  vault.ts          — Persistent agent context (Vault file system)
```

---

## Agent Model Configuration **LOCKED**

Agent model assignments live in one place only:

```
/lib/agents/models.config.ts
```

This is the runtime config file the app reads to know which AI models to call for each agent. **Never hardcode model names anywhere else in the codebase.** To swap a model, edit this file only. See the file itself for the full configuration.

Full agent role definitions, responsibilities, team compositions, and behavior rules are in `/design/AGENTS.md`.

---

## Folder Structure

```
/app                    — Next.js App Router pages
  /(auth)               — Sign up / sign in
  /(onboarding)         — Architect conversation, preview, sprint plan, subscription, connections, review, payment
  /(dashboard)          — Sprint board, status, tasks, files
  /api                  — API routes
/components             — Shared UI components
  /ui                   — Primitives (Button, Card, Badge, Input, etc.)
  /layout               — Sidebar, Topbar, Shell
  /agents               — Agent status cards, activity feed
  /sprint               — Sprint board, kanban, progress
/lib
  /adapters             — All 16 adapter interfaces + implementations
  /agents               — Agent definitions, orchestration logic
    models.config.ts    — Model assignments per agent (single source of truth)
  /supabase             — Supabase client (server + client)
  /stripe               — Stripe helpers
  /credits              — Credit calculation logic
/design                 — Design reference PNGs and MD files (read-only reference)
/styles
  globals.css           — ALL styles live here. No exceptions.
/types                  — Shared TypeScript types
```

---

## Styling Rules **LOCKED**

- **All styles live in `/styles/globals.css`** — one file, no exceptions
- No CSS modules
- No inline styles
- No Tailwind utility classes applied directly in JSX markup
- Components reference only CSS classes defined in globals.css
- Every screen must be fully responsive — mobile, tablet, and desktop. Non-negotiable.
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px – 1024px
  - Desktop: > 1024px

---

## Typography **LOCKED**

| Font | Usage |
|---|---|
| Work Sans | All UI text, labels, body copy, buttons, numbers, credit amounts, timers |
| DM Mono | Code only — visible only in the Files tab when previewing or editing a file |

**DM Mono is never used for numbers.** Numbers, credit amounts, timers, and all numeric displays use Work Sans.

---

## Layout Tokens **LOCKED**

```css
--sidebar-expanded:  240px
--sidebar-collapsed: 64px
--topbar-height:     64px
--border-radius:     12px   /* Standard — cards, buttons, inputs, tiles */
--border-radius-app: 20px   /* Main app content window when sidebar is present */
```

The main app window (the content area to the right of the sidebar, whether collapsed or expanded) always has `border-radius: 20px` on its top-left and bottom-left corners.

---

## Design System

**The PNG files in `/design/` are gospel.** Build to match them exactly. Do not invent layout, spacing, copy, or color.

See `/design/DESIGN.md` for design tokens, typography, and component patterns.
See `/design/FLOWS.md` for the full screen-by-screen flow and PNG filename mapping.
See `/design/AGENTS.md` for all agent role definitions and team compositions.

---

## Token / Credit Ratio **LOCKED**

**1 credit = 1,000 tokens. $0.05 per credit.**

This ratio is fixed permanently. Apply it consistently everywhere — UI, database, credit calculations, and Architect estimates.

### Sprint Credit Estimation

Sprint credit costs are **never fixed**. The Architect estimates token usage based on the specific app's complexity, then converts at the fixed ratio.

The Architect evaluates:
- Number of screens and features
- Backend complexity (auth, payments, real-time, third-party APIs)
- Platform targets (mobile adds Expo build tokens; desktop adds Tauri)
- Number of agents in the selected sprint plan
- Number of sprints required

Convert: `total tokens ÷ 1,000 = credits`
Present as: "This build will use approximately X credits ($Y)"

### Credit Display Rules **LOCKED**

- Always display credits as whole numbers — never decimals
- Always show the dollar equivalent alongside: "740 credits ($37)"
- Never use the word "token" in any user-facing copy — always "credit"
- Numbers always use Work Sans — never DM Mono

---

## Sprint Tiers **LOCKED**

Picking a sprint tier determines both the app scope and the agent team. They are the same choice.

| Tier | Agents | Sprints | App Scope |
|---|---|---|---|
| Express | 4 | 1 | Core functionality, working and downloadable |
| Balanced | 7 | 2 | Fully testable, complete UX, lighter on complex features |
| Production | 12 | 4 | Full enterprise app, App Store ready for iOS and Android |

All three tiers produce real, downloadable, installable apps. The difference is depth and completeness, not whether the app works.

---

## Subscription Tiers **LOCKED**

| Tier | Price | Credits (incl. free) | Rollover | Queue |
|---|---|---|---|---|
| Free | $0 | 10 | None | Standard |
| Builder | $50/mo | 1,100 (incl. 100 free) | 2 months | Standard |
| Studio | $150/mo | 3,450 (incl. 450 free) | 2 months | Priority |
| Max | $250/mo | 6,000 (incl. 1,000 free) | 2 months | Dedicated |

**Free tier**: Preview only. No agent execution. No code output. Deliberately gated to drive paid conversion.

**Top-ups**: $5 per 100 credits. Never expire. Available post-onboarding only. Never promoted during initial plan selection.

---

## Project State Model **LOCKED**

```
Brief → Active → Idle → Done → Live → Archived
```

- **Done → Live** requires a deliberate Publish action + GitHub connection
- GitHub is NOT required before the Done state
- State stored in `projects.status`
- State transitions logged in `project_events`

---

## Versioning **LOCKED**

- First build = v1
- Second build round after delivery = **Version 2** (not "Sprint 2")
- Internal sprint numbering within a build: Sprint 1, Sprint 2, etc.
- Board topbar format: `v2 · Sprint 1 · OAuth & Social`
- Version number stored in `projects.version` (integer, starts at 1)

---

## Supabase Schema — Core Tables

```sql
profiles (id, email, full_name, avatar_url, plan, credits, created_at)
projects (id, user_id, name, platform, status, version, sprint_tier, credits_used, created_at, updated_at)
project_events (id, project_id, type, payload, created_at)
sprints (id, project_id, version, number, status, agents, started_at, completed_at)
agent_runs (id, sprint_id, agent_role, department, status, tokens_used, started_at, completed_at)
project_files (id, project_id, sprint_id, path, type, content, created_at)
credit_transactions (id, user_id, project_id, type, amount, balance_after, created_at)
project_connections (id, project_id, service, status, provisioned_at)
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_API_KEY=
NOTEBOOKLM_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
EXPO_TOKEN=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## The Sprintsesh Engine **LOCKED**

- Tauri-based menu bar companion app
- Runs agents locally using Sprintsesh's API keys — never the user's
- All third-party services provisioned on Sprintsesh master accounts via Management APIs
- **GitHub is the only user-connected service**
- Installs in ~30 seconds, returns user to browser automatically
- **Pauses (not fails)** if closed mid-sprint — resumes on reopen
- Communicates with the web app via local WebSocket

---

## User-Facing Language Rules **LOCKED**

| Banned | Use instead |
|---|---|
| OAuth | "Connect your GitHub account" |
| Schema migration | "Updating your project's structure" |
| Git / git worktree | Never mention |
| API key | Never shown or mentioned |
| Token | "Credit" |
| Database | "Your project's data" |
| Deploy / deployment | "Publish" or "go live" |

---

## Key UX Rules **LOCKED**

- **No AI disclaimer** — "Sprintsesh can make mistakes" is banned everywhere
- **Architect opens with a question**, never a prescription or plan
- **Architect proposes options** — give users 2–3 choices to simplify decisions, but allow free-form input too
- **Pre-sprint summary**: plain-language list of everything about to happen
- **Tile-selection UI** preferred for all bounded choices
- **Speed as default, depth optional**
- **Connections page on v2+**: shows only new services; v1 connections dimmed but visible
- **Upgrade prompts** preferred over top-up prompts during initial onboarding

---

## Before Writing Any Screen

1. Read `CLAUDE.md` (this file)
2. Read `/design/DESIGN.md`
3. Read `/design/FLOWS.md` — find the screen, note the PNG filename
4. Load the PNG — it is the pixel-perfect spec. Match it exactly.
5. Write all styles in `/styles/globals.css` only
6. Verify responsiveness at all three breakpoints before marking done
