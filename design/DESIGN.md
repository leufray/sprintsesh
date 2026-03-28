# Sprintsesh — Design System Reference

The PNG files in `/design/` are the primary design reference and are gospel. This file documents the underlying tokens and patterns. Use it when building components in isolation or when a PNG doesn't exist yet for a screen.

**When a PNG exists: match it exactly.**
**When no PNG exists: use this file.**

---

## Color Tokens

```css
/* Backgrounds */
--bg:  #0d1117    /* Page background — deepest layer */
--bg2: #151b24    /* Cards, sidebar, topbar */
--bg3: #1a2230    /* Elevated surfaces, hover states, inputs */

/* Borders */
--b:  #263040     /* Default border */
--bh: #3a4f66     /* Hover / active border */

/* Department accents */
--amber:  #FFB64C   /* Strategy + primary action color */
--green:  #00C97A   /* Content department */
--blue:   #4A9EFF   /* Design department */
--purple: #8B6FFF   /* Engineering department */
--red:    #FF5E5C   /* Quality department */

/* Text */
--t:  #e8eff8     /* Primary text */
--t2: #8a9ab0     /* Secondary text, labels, metadata */
--t3: #4a5f78     /* Tertiary text, placeholders, disabled */

/* RGB equivalents for rgba() */
--amber-rgb:  255, 182, 76
--green-rgb:  0, 201, 122
--blue-rgb:   74, 158, 255
--purple-rgb: 139, 111, 255
--red-rgb:    255, 94, 92
--t2-rgb:     138, 154, 176
```

Amber (`--amber`) is the **primary action color** — primary buttons, active states, progress fills, key highlights — as well as the Strategy department color.

---

## Typography **LOCKED**

| Font | Usage |
|---|---|
| Work Sans | All UI text, labels, body copy, buttons, headings, numbers, credits, timers — everything except code |
| DM Mono | Code only — visible exclusively in the Files tab when a user previews or edits a file |

**DM Mono is never used for numbers, credits, or timers.** All numeric values use Work Sans.

### Font Loading (Next.js)

```tsx
import { Work_Sans, DM_Mono } from 'next/font/google'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500']
})
```

### Type Scale

```css
--text-display: 3.5rem    /* Hero headline */
--text-h1:      2rem      /* Page titles */
--text-h2:      1.375rem  /* Section headers */
--text-h3:      1.125rem  /* Card titles */
--text-lg:      1rem      /* Lead body text */
--text-base:    0.9375rem /* Default body */
--text-sm:      0.8125rem /* Labels, metadata */
--text-xs:      0.75rem   /* Captions, badges */
--text-mono:    0.875rem  /* Code in Files tab only */
```

---

## Spacing

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

---

## Layout Tokens **LOCKED**

```css
--sidebar-expanded:  240px
--sidebar-collapsed: 64px
--topbar-height:     64px
--border-radius:     12px   /* Standard */
--border-radius-app: 20px   /* Main app window with sidebar present */
--content-padding:   24px
--content-max-width: 1100px
```

### Main App Window

When the sidebar is present (expanded or collapsed), the main content area has `border-radius: 20px` on its top-left and bottom-left corners. This creates the visual separation between sidebar and content.

---

## Responsive Breakpoints

```css
@media (min-width: 768px)  { /* tablet  */ }
@media (min-width: 1024px) { /* desktop */ }
```

All layouts must work at every breakpoint. Sidebar collapses to bottom nav on mobile. Cards go single column on mobile. Topbar adapts as needed.

---

## Component Patterns

### Cards

```css
.card {
  background: var(--bg2);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);  /* 12px */
  padding: 20px 24px;
}
```

No box-shadow as primary depth. Border + background layering creates depth.

### Buttons

```css
.btn-primary {
  background: var(--amber);
  color: #0d1117;
  border: none;
  border-radius: var(--border-radius);
  padding: 10px 20px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: filter 150ms ease;
}
.btn-primary:hover { filter: brightness(1.08); }

.btn-secondary {
  background: var(--bg3);
  color: var(--t);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);
  padding: 10px 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-base);
  cursor: pointer;
  transition: border-color 150ms ease;
}
.btn-secondary:hover { border-color: var(--bh); }

.btn-ghost {
  background: transparent;
  color: var(--t2);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);
  padding: 10px 20px;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease;
}
.btn-ghost:hover { border-color: var(--bh); color: var(--t); }
```

### Inputs

```css
.input {
  background: var(--bg3);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);
  color: var(--t);
  padding: 10px 14px;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  width: 100%;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.input:focus {
  outline: none;
  border-color: var(--bh);
  box-shadow: 0 0 0 3px rgba(var(--amber-rgb), 0.12);
}
```

### Badges / Status Pills

```css
.badge {
  border-radius: 20px;
  padding: 3px 10px;
  font-size: var(--text-xs);
  font-weight: 600;
  font-family: var(--font-sans);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.badge--active   { background: rgba(var(--green-rgb), 0.15);  color: var(--green);  border: 1px solid rgba(var(--green-rgb), 0.3); }
.badge--building { background: rgba(var(--amber-rgb), 0.15);  color: var(--amber);  border: 1px solid rgba(var(--amber-rgb), 0.3); }
.badge--idle     { background: rgba(var(--t2-rgb), 0.1);      color: var(--t2);     border: 1px solid var(--b); }
.badge--error    { background: rgba(var(--red-rgb), 0.15);    color: var(--red);    border: 1px solid rgba(var(--red-rgb), 0.3); }
```

### Tile Selection

```css
.tile {
  background: var(--bg2);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);
  padding: 16px 20px;
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}
.tile:hover     { border-color: var(--bh); background: var(--bg3); }
.tile--selected { border-color: var(--amber); background: rgba(var(--amber-rgb), 0.06); }
```

### Sidebar

```css
.sidebar {
  width: var(--sidebar-expanded);   /* 240px */
  background: var(--bg2);
  border-right: 1px solid var(--b);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 200ms ease;
  overflow: hidden;
}
.sidebar--collapsed { width: var(--sidebar-collapsed); }  /* 64px */

.sidebar-nav-item {
  height: 40px;
  border-radius: var(--border-radius);
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--t2);
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}
.sidebar-nav-item:hover { background: var(--bg3); color: var(--t); }
.sidebar-nav-item--active { color: var(--t); }
.sidebar-nav-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--amber);
  border-radius: 0 2px 2px 0;
}

@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    height: 56px;
    top: auto;
    bottom: 0;
    border-right: none;
    border-top: 1px solid var(--b);
  }
}
```

### Topbar

```css
.topbar {
  height: var(--topbar-height);   /* 64px */
  background: var(--bg2);
  border-bottom: 1px solid var(--b);
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 50;
}
```

### Main App Window

```css
.app-window {
  margin-left: var(--sidebar-expanded);
  border-radius: var(--border-radius-app) 0 0 var(--border-radius-app);  /* 20px top-left, bottom-left */
  background: var(--bg);
  min-height: 100vh;
  transition: margin-left 200ms ease;
}
.app-window--collapsed { margin-left: var(--sidebar-collapsed); }
```

### Progress Bars

```css
.progress-track { background: var(--bg3); border-radius: 4px; height: 4px; width: 100%; }
.progress-fill  { background: var(--amber); border-radius: 4px; height: 4px; transition: width 400ms ease; }
```

### Agent Activity Feed

```css
.feed-item {
  border-left: 2px solid var(--dept-color);
  padding: 8px 12px 8px 16px;
  margin-bottom: 4px;
  background: var(--bg2);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}
```

### Code Block (Files Tab Only)

```css
.code-block {
  background: var(--bg);
  border: 1px solid var(--b);
  border-radius: var(--border-radius);
  font-family: var(--font-mono);   /* DM Mono — only used here */
  font-size: var(--text-mono);
  line-height: 1.6;
  padding: 16px 20px;
  overflow-x: auto;
}
```

---

## Motion

```css
@keyframes vfade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.vfade { animation: vfade 220ms ease forwards; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

/* Defaults */
transition: all 150ms ease;           /* interactions */
transition: all 200ms ease;           /* panels, sidebar */
```

---

## Icons

Lucide React throughout.

| Size | Usage |
|---|---|
| 16px | Inline, labels, metadata |
| 18px | Sidebar nav, button icons |
| 20px | Card actions, topbar |
| 24px | Feature icons, empty states |
| 32px | Section icons |

Stroke width: 1.5px default, 2px for emphasis.

---

## Department Color Application

| Context | Pattern |
|---|---|
| Agent avatar | `background: rgba(var(--dept-rgb), 0.2); color: var(--dept-color)` |
| Activity feed border | `border-left: 2px solid var(--dept-color)` |
| Section label | `color: var(--dept-color); font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase` |
| Progress bar | `background: var(--dept-color)` |
| Badge | `background: rgba(var(--dept-rgb), 0.15); border: 1px solid rgba(var(--dept-rgb), 0.3)` |

---

## Home Page Hero

- Full viewport height: `height: 100dvh`
- Background: `--bg` with subtle grain/noise texture overlay
- Content vertically centered
- Large Work Sans headline, amber accent on key word
- Subheading in `--t2`, Work Sans
- Prompt input: max ~680px centered on desktop, full-width on mobile
- Platform chips: Mobile / Web / Desktop (multi-select tiles)
- Amber primary CTA button

On scroll, content revealed below in this order:
1. Logo strip — Expo, Claude, Gemini, Stitch, Supabase, GitHub, Vercel, Resend
2. 3-step section
3. Portfolio strip
4. Platform section
5. CTA section
6. FAQ

---

## Do Not

- Do not use box-shadow as the primary depth mechanism
- Do not use white backgrounds anywhere
- Do not use any font other than Work Sans and DM Mono
- Do not use DM Mono for numbers, credits, or timers — Work Sans only
- Do not use DM Mono anywhere except the Files tab code preview
- Do not use rounded corners other than 12px (standard) or 20px (app window)
- Do not use blue as a primary action color — amber is primary
- Do not add any AI disclaimer anywhere
- Do not use the word "token" in user-facing copy
- Do not use gradient fills on department color elements
- Do not put any styles outside `/styles/globals.css`
