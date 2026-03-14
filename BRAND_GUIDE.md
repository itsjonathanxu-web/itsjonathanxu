# Jonathan Xu — Brand Guide
# Portfolio Website Design System

---

## Brand Identity

**Brand Name:** Jonathan Xu
**Tagline:** Cinematic Visual Storytelling
**Positioning:** Premium B2B videography & photography for hospitality, architecture, travel, and commercial brands.
**Tone:** Confident, cinematic, minimal. Let the work speak. No fluff.

---

## Color Palette

### Primary Colors
| Name           | Hex       | Usage                              |
|----------------|-----------|-------------------------------------|
| Black          | `#000000` | Primary background                  |
| Rich Black     | `#0A0A0A` | Card backgrounds, sections          |
| Off-Black      | `#111111` | Subtle section separation           |
| White          | `#FFFFFF` | Primary text, headings              |
| Off-White      | `#F5F5F5` | Body text, secondary text           |

### Accent Colors
| Name           | Hex       | Usage                              |
|----------------|-----------|-------------------------------------|
| Warm Gray      | `#8A8A8A` | Muted text, captions, metadata      |
| Border Gray    | `#1A1A1A` | Borders, dividers, subtle lines     |
| Hover Accent   | `#C8C8C8` | Link/button hover states            |

### Rule: No brand color competes with the imagery. The palette is neutral so photos and video carry all the color.

---

## Typography

### Font Stack
| Role           | Font                  | Weight    | Fallback              |
|----------------|-----------------------|-----------|-----------------------|
| Headings       | **Inter**             | 300 (Light), 400 (Regular) | system-ui, sans-serif |
| Body           | **Inter**             | 300 (Light), 400 (Regular) | system-ui, sans-serif |
| Accent/Nav     | **Inter**             | 500 (Medium)         | system-ui, sans-serif |

### Type Scale
| Element        | Size (desktop)  | Size (mobile)  | Letter Spacing | Line Height |
|----------------|-----------------|----------------|----------------|-------------|
| Hero Heading   | 72px / 4.5rem   | 40px / 2.5rem  | -0.02em        | 1.1         |
| Page Heading   | 48px / 3rem     | 32px / 2rem    | -0.02em        | 1.2         |
| Section Head   | 24px / 1.5rem   | 20px / 1.25rem | -0.01em        | 1.3         |
| Body Large     | 18px / 1.125rem | 16px / 1rem    | 0              | 1.6         |
| Body           | 16px / 1rem     | 15px           | 0              | 1.6         |
| Caption/Meta   | 13px / 0.8125rem| 12px           | 0.05em         | 1.4         |
| Nav Links      | 14px / 0.875rem | 14px           | 0.08em         | 1           |

### Rules:
- Hero and section headings use **font-black (900)** — bold, impactful, mason-wong inspired
- Body and descriptors use **font-bold (700)** for presence
- ALL CAPS for hero name, section titles, navigation, and metadata
- Tight negative letter spacing on large headings (-0.04em)
- Tracked-out uppercase on nav/captions (0.08em–0.3em)

---

## Spacing & Layout

| Token          | Value   | Usage                              |
|----------------|---------|------------------------------------|
| Page Padding   | 80px    | Left/right on desktop              |
| Page Padding M | 24px    | Left/right on mobile               |
| Section Gap    | 120px   | Between major sections (desktop)   |
| Section Gap M  | 64px    | Between major sections (mobile)    |
| Grid Gap       | 16px    | Between portfolio grid items       |
| Max Width      | 1400px  | Content max width                  |

### Grid System
- Portfolio grid: 2 columns on desktop, 1 on mobile
- Full-bleed hero images (edge to edge)
- Generous whitespace — let the work breathe

---

## Imagery & Media

### Photography
- Full-bleed or near-full-bleed presentation
- No rounded corners on images — sharp, cinematic crop
- Hover: subtle scale (1.02) with overlay fade
- Aspect ratios: 16:9 for hero/featured, 3:2 or 4:5 for grid

### Video
- Embedded via YouTube/Vimeo or self-hosted MP4
- Custom play button overlay (minimal, centered)
- Autoplay muted for background/ambient clips
- 16:9 aspect ratio standard

---

## UI Components

### Buttons
- Primary: White text, transparent bg, 1px white border → hover: white bg, black text
- Keep buttons minimal — text links preferred where possible

### Navigation (component)
- Fixed top nav, transparent bg on scroll-top, fades to black/blur on scroll
- Logo "XSEN" left (bold), nav links right
- All nav links white, hover fades opacity to 50% (darkens)
- Mobile: hamburger menu, full-screen overlay
- Nav links: uppercase, tracked-out, 13px, font-medium

### Cursor / Interactions
- Custom cursor with smooth trail (no grain overlay)
- Smooth scroll between sections
- Fade-in-up animations on scroll (subtle, not flashy)
- Image hover: gentle zoom + overlay with project title
- Page transitions: fade between routes

### Apple Liquid Glass UI
- Glass cards: `rgba(255,255,255,0.04)` bg, `blur(40px) saturate(1.4)` backdrop, subtle inset top highlight
- Glass buttons: `rgba(255,255,255,0.06)` bg, `blur(20px)` backdrop, hover transitions to solid white
- Border: `rgba(255,255,255,0.08)` — barely visible, adds depth
- Used for: stat cards, CTA buttons, interactive elements
- Inspired by Apple's Liquid Glass design language (WWDC 2025)

### Navigation
- All links white text, hover fades to 50% opacity (goes dark)
- Fixed top nav, transparent on top, black/blur on scroll
- Logo "XSEN" bold, tracked-out uppercase

---

## Portfolio Categories

| Category                  | Target Clients                                      |
|---------------------------|-----------------------------------------------------|
| Hospitality               | Hotels, restaurants, bars, cafes                    |
| Architecture & Interiors  | Real estate developers, interior designers, architects |
| Travel & Destination      | Tourism boards, travel brands, destination marketing |
| Brand & Commercial        | Lifestyle brands, product companies, commercial work |

---

## Contact

- **Email:** jonathanxu02@gmail.com
- **Domain:** jonathanxu.ca (to be pointed at Vercel)
- **Social:** Instagram @itsjonathanxu

---

## File & Asset Notes

- All placeholder images should be replaced with Jonathan's actual work
- Video embeds will be added as content becomes available
- Hero image: high-res cinematic still (landscape, 16:9 minimum)
- Favicon: simple "JX" monogram or initial on black background

---

## Home Page Structure

1. **Hero (XSEN)** — Full-screen centered, font-black, fades in on load, fades out on scroll
2. **Descriptor lines** — "Cinematic Storyteller / Videographer / Photographer" in massive bold text over fixed parallax background image
3. **Mission statement** — Brief about text + CTA buttons, still over background
4. **Fade to black** — Background image opacity transitions to 0
5. **About section** — Black background, 2-column: text left + glass stats card right
6. **Featured Projects** — 2-column grid, 4:3 aspect ratio cards with info below
7. **Expertise** — 2-column grid with numbered categories
8. **CTA** — Bold closing headline + glass button

### Key Design Decisions
- Background image is **fixed position** with **parallax Y movement** on scroll (mason-wong.com reference)
- Image oversized at 130% height to prevent edge reveal during parallax
- No grain texture overlay — clean aesthetic
- Font weights: 900 (black) for headlines, 700 (bold) for body/descriptors
- Liquid glass (Apple-inspired) for cards and buttons

---

*Last updated: March 14, 2026*
