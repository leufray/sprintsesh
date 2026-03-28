# Sprintsesh — User Flow & Screen Reference

Every screen in the product is documented here. Each entry lists the screen name, its PNG design reference filename, the route, purpose, and key behavior notes.

Before building any screen, find its entry here, load its PNG from `/design/`, and build to match exactly.

---

## Full Flow Overview

```
Home Hero
  ↓ (user enters prompt)
Sign Up  ← triggered after user clicks Send (↑) button
  ↓
Architect Conversation
  ↓
Preview
  ↓
Sprint Plan Selection
  ↓
Subscription Selection
  ↓
Connections
  ↓
Review
  ↓
Payment
  ↓
Success
  ↓
Build Screen (Preview tab → Status → Tasks → Files)
  ↓
Sprint Complete
  ↓
[Version 2 loop if user requests another build]
```

---

## Screen Inventory

---

### 1. Home Page

**PNG:** `home.png`
**Route:** `/`

The marketing and entry point. Users land here, read the value prop, and enter their first app idea.

## Home Page Structure — SprintSesh

### Sections (top to bottom)

1. **Nav bar**  
   - Logo (left)  
   - Links (center): How it works, Pricing, Downloads  
   - Actions (right): Sign in, Get started  

---

2. **Hero**  
   - Large Syne display headline  
   - Headline: *Launch a real app today*
   - Subtitle:  
     *Describe your idea and a team of autonomous AI agents will design and build your app from prompt to production in hours, not months.*  
   - Prompt input field with:  
     - Attach button  
     - Platform chips: iOS & Android apps / Web apps / Desktop apps  
     - Send (↑) button  
       - Default: grey  
       - Active (text entered): amber  

   - **Dynamic placeholder text (cycles with typewriter effect):**
     - Create a mobile app that tracks my sprints...  
     - Create a web app for real estate agents to log showings...  
     - Create a desktop app that organizes my files…  
     - Create a mobile food diary with AI-powered insights...  
     - Create a social app for local basketball games…  
     - Create a marketplace for freelance photographers...  

---

3. **AI logo strip**  
   - Horizontal scroll  
   - Muted logos of AI systems used (Claude, Gemini, NotebookLM, etc.)  
   - Purpose: reinforce multi-model orchestration (not a single AI)

---

4. **3-step demo**  
   - Headline: **Say it. It builds. It’s live.**  

   **Step 1 — Describe it**  
   - Supporting text:  
     *Type your app idea. We turn it into a product plan and visual preview instantly.*  

   **Step 2 — It builds itself**  
   - Supporting text:  
     *A full AI team designs, codes, and tests in parallel. Watch your app come to life.*  

   **Step 3 — Ship and use it**  
   - Supporting text:  
     *Download it. Open it. Share it. Real apps. Not just prototypes.*  

   - Visual sequence (animated):  
     prompt input → UI renders → agents collaborating → build completes → download → app running on device  

   - Supporting line under section:  
     *Built by a coordinated team of AI agents across design, engineering, and product — not a single model guessing.*

---

5. **Platform section**  
   - Headline: **Real apps. Every platform.**

   **Mobile**  
   - *Native apps with full device access. Camera, GPS, sensors — ready for the App Store.*  

   **Web**  
   - *Live instantly at a URL. Fast, responsive, production-ready.*  

   **Desktop**  
   - *Installable apps in seconds. Runs locally with full system capability.*  

---

6. **Differentiation strip (above or within platform section)**  
   - Headline: **Not one AI. A full product team.**  
   - Supporting bullets:  
     - Product thinking, not just UI  
     - Real backend, APIs, and logic  
     - Native apps, not wrappers  
     - Multiple AI systems working together  

---

7. **CTA section**  
   - Amber-tinted panel  

   **Headline:**  
   *Software creation just changed*  

   **Subtext:**  
   *From prompt to production.*  

   - Prompt input repeated (same behavior as hero)  

   - CTA button:  
     **Start building**

---

8. **FAQ accordion**  
   - Common objections:  
     - What kind of apps can I build?  
     - Are these real apps or prototypes?  
     - Do I need coding experience?  
     - How long does a build take?  
     - Can I edit or extend my app later?  

**Prompt input behavior:**
- Multiline textarea, expands on focus
- Platform chips below input: Mobile / Web / Desktop (multi-select)
- Attach icon for uploading screenshots or references
- Submit triggers Architect — but if not signed in, routes to sign up first, then returns to Architect

**Nav links:**
- How it works → scrolls to 3-step section
- Pricing → `/pricing`
- Downloads → `/downloads` (Sprintsesh Engine download page)
- Questions → `/faq` or scrolls to FAQ

---

### 2. Sign Up / Sign In

**PNG:** `auth.png`
**Route:** `/sign-up` and `/sign-in`

Triggered after Architect speaks for the first time (not before). Modal or full page.

**Auth providers (in order):** Google, GitHub, Apple, Email

**Copy:** "Continue building with [provider]" — not "Create account" or "Sign up".

After auth, user is returned to Architect conversation with context preserved.

---

### 3. Architect Conversation

**PNG:** `architect.png`
**Route:** `/onboarding/architect`

The Architect (Strategy / amber) opens with **a question**, never a plan or prescription. It asks one clarifying question at a time. Conversational, not a form.

**Behavior:**
- Chat interface, dark, full width or centered max 720px
- Architect avatar: amber, small, left-aligned messages
- User messages: right-aligned
- After 3–5 exchanges, Architect confirms scope and generates a preview
- "Generating your preview…" state with amber progress animation before transition

**Never:** Opens with a bullet list of what it will build, or a technical plan. Always a question.

---

### 4. Preview

**PNG:** `preview.png`
**Route:** `/onboarding/preview`

Shows the generated app preview. This is the emotional high point before payment.

**Layout:**
- Left: device mockup (phone for Mobile, browser for Web, desktop frame for Desktop)
- Right: app name, one-line description, feature list (plain English), platform chip
- Share button (copies preview link)
- "Choose sprint plan →" primary CTA

**States:** Phone mockup / Browser mockup / Desktop mockup depending on platform selected.

---

### 5. Sprint Plan Selection

**PNG:** `sprint-plan.png`
**Route:** `/onboarding/sprint-plan`

Three tile options. Speed is default (Express pre-selected).

| Tile | Label | Agents | Time | Sprints | Credits |
|---|---|---|---|---|---|
| Express | Fast build | 4 | 4–6 hrs | 1 | ~740 |
| Balanced | Recommended | 7 | 10–14 hrs | 2 | ~1,640 |
| Production | Full team | 12 | ~2 days | 4 | ~3,200 |

**Tile content:** Name, agent count, time estimate, sprint count, credit cost. No technical jargon.

**Express is pre-selected by default.**

---

### 6. Subscription Selection

**PNG:** `subscription.png`
**Route:** `/onboarding/subscription`

Shown only if user is on Free tier. Displays the four plans with a credit meter showing whether selected sprint plan is covered.

**States:**
- Covered: "Your Builder plan covers this build" — green indicator
- Not covered: "You need X more credits" — shows top-up or upgrade options

**Plans:** Free (disabled, user is already on it), Builder ($50), Studio ($150), Max ($250)

**Never promote top-ups here** — prefer upgrade prompts. Top-ups are available post-onboarding.

---

### 7. Connections

**PNG:** `connections.png`
**Route:** `/onboarding/connections`

Shows which services Sprintsesh has auto-provisioned vs. which the user needs to connect.

**Auto-provisioned (shown as green checkmarks, no action needed):**
- Supabase (database)
- Mapbox (maps, if app needs it)
- Expo (mobile builds, if mobile)

**User-connected (requires action):**
- GitHub — required for Done → Live transition. OAuth button. "Connect your GitHub account"
- Optional: additional services if the app needs them

**v2+ behavior:** Shows only new services added in this version. v1 connections are shown dimmed with a green check — "Already connected from v1."

**Language:** Never say "OAuth." Say "Connect your GitHub account."

---

### 8. Review

**PNG:** `review.png`
**Route:** `/onboarding/review`

Full order summary before payment. Everything confirmed.

**Sections:**
- App name + platform chip
- Sprint plan (with edit link back to sprint plan screen)
- Subscription plan (with edit link)
- Connections status summary
- Credit breakdown: plan credits + sprint cost + remaining after
- "Start building →" primary CTA → goes to Payment

---

### 9. Payment

**PNG:** `payment.png`
**Route:** `/onboarding/payment`

Stripe payment form. Clean, minimal. Matches product design (dark theme).

**Line items:**
- Subscription: $X/mo
- Credits included: X credits
- Total today: $X

Stripe Elements embedded. No redirect to Stripe hosted page.

---

### 10. Success

**PNG:** `success.png`
**Route:** `/onboarding/success`

Confirms build has started. Emotional, clear, actionable.

**Content:**
- "[App name] is being built"
- Estimated completion time (countdown or range)
- Agent team illustration or animation (amber pulse)
- "Turn on notifications" CTA (secondary)
- "Go to build screen →" primary CTA

---

### 11. Build Screen — Preview Tab

**PNG:** `build-preview.png`
**Route:** `/projects/[id]`
**Default tab**

**Topbar:** `v1 · Sprint 1 · [Feature name]` | Active badge | Preview / Status / Tasks / Files tabs | Countdown timer | Pause button | Credit counter

**Layout:**
- Left panel (60%): Live phone/browser/desktop mockup — updates as agents build
- Right panel (40%): Screen list (scrollable) + Agent activity feed below

**Agent activity feed:** Real-time stream of what agents are doing. Plain English. Left border color = department color. Newest at top.

---

### 12. Build Screen — Status Tab

**PNG:** `build-status.png`
**Route:** `/projects/[id]?tab=status`

**Content:**
- Health badge (On track / Paused / Issue)
- Plain English status feed — "Frontend Developer is building the home screen"
- Sprint progress bars (one per sprint, amber fill)
- Agent status grid (12 cards, department color, role name, current task, status badge)
- Credit breakdown: used so far / estimated remaining / total budget

---

### 13. Build Screen — Tasks Tab

**PNG:** `build-tasks.png`
**Route:** `/projects/[id]?tab=tasks`

Kanban board. Columns: To Do / In Progress / In Review / Done.

Cards show: task name, assigned agent (with department color avatar), sprint label.

Read-only during active build. Editable in Idle state.

---

### 14. Build Screen — Files Tab

**PNG:** `build-files.png`
**Route:** `/projects/[id]?tab=files`

**Left panel (30%):** File tree — Project Docs / Design System / Source Code folders. Collapsible.

**Right panel (70%):** Syntax-highlighted file preview. DM Mono, dark background (`--bg`).

File types: `.md`, `.tsx`, `.ts`, `.json`, `.css`, image previews.

---

### 15. Sprint Complete

**PNG:** `sprint-complete.png`
**Route:** Modal / banner on `/projects/[id]`

Appears when a sprint finishes.

**Content:**
- "Sprint [N] complete"
- QR code (scan to install on device — mobile only)
- Download buttons: `.ipa` (iOS), `.aab` (Android), `.dmg` (desktop)
- "Start Sprint [N+1] →" if more sprints remain
- "View delivered app" if final sprint

---

### 16. Credits Screen

**PNG:** `credits.png`
**Route:** `/settings/credits` or modal

Side-by-side: Top-up panel vs. Upgrade panel.

**Top-up:** $5 / 100 credits. Quantity selector. "Credits never expire."
**Upgrade:** Shows next plan up, credit difference, monthly cost difference.

Shown post-onboarding only. Never surfaced during initial plan selection.

---

## Version 2 Flow

When a user requests a new build on an existing project:

```
Success (v2 started)
  ↓
Architect Conversation (with v1 context loaded — "Building on v1: [app name]")
  ↓
Preview (shows v2 changes, not full rebuild)
  ↓
Sprint Plan Selection
  ↓
Credits Check (if short: Top-up or Upgrade — not full subscription flow)
  ↓
Payment (if short — only the difference)
  ↓
Connections (new services only — v1 connections shown as dimmed/active)
  ↓
Review
  ↓
Build Screen (topbar: v2 · Sprint 1 · [Feature])
```

**PNG references:** `v2-success.png`, `v2-architect.png`, `v2-preview.png`, `v2-sprint-plan.png`, `v2-credits.png`, `v2-connections.png`, `v2-review.png`, `v2-build.png`

---

## Topbar Version Display

| State | Topbar Shows |
|---|---|
| v1, Sprint 1, building | `v1 · Sprint 1 · Setting up project` |
| v1, Sprint 2, building | `v1 · Sprint 2 · Building home screen` |
| v2, Sprint 1, building | `v2 · Sprint 1 · OAuth & Social` |
| Done (no version active) | Project name + Done badge |
| Live | Project name + Live badge |

---

## PNG Naming Convention

All design reference PNGs live in `/design/`. Name them exactly as listed above. When referencing in prompts:

```
Reference: /design/build-preview.png — pixel-perfect spec for this screen
```

If a PNG doesn't exist yet for a screen, note it and proceed with the HTML prototype reference (`home-v4.html`, `sprint-board.html`, etc.) until the PNG is exported.

---

## HTML Prototype Reference (fallback)

If the PNG for a screen hasn't been exported yet, use these HTML files in `/design/`:

| Screen(s) | HTML File |
|---|---|
| Home | `home-v4.html` |
| Waitlist | `waitlist.html` |
| Connections → Sprint 2 brief | `build-flow-v2.html` |
| Sprint board | `sprint-board.html` |
| Status + Files tabs | `status-files.html` |
| Delivery success | `success.html` |
| Version 2 flow (9 screens) | `v2-flow.html` |
| Credits screen | `credits-screen.html` |
| Connections + Review + Payment | `checkout-flow.html` |
