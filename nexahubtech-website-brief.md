# Website Build Prompt — NexaHubTech

> **How to use this doc:** Paste this whole brief into your AI builder of choice (Claude Code, v0, Lovable, Bolt, etc.) as the system prompt, or hand it to a designer/developer as a creative brief. Sections marked `[NEEDS INPUT]` are placeholders only you can fill — don't let the builder invent them.

---

## 1. Company Snapshot

**Name:** NexaHubTech (formerly Codex Technologies)
**Type:** Skills-to-service company
**Location:** Nigeria
**One-line description:** A Nigerian skills-to-service company that trains developers in web and AI engineering, then puts those skills to work building real client software.

**Core thesis:** Education and delivery aren't separate businesses — they're a feedback loop. People learn on a curriculum built from real engineering problems; the studio delivers production software using the same rigor it teaches. Nobody learns in a vacuum, and nobody ships without principles.

---

## 2. The Two Arms of the Business

### A. Education Arm — "Learn"
- Frontend Web Development course (HTML, CSS, JavaScript fundamentals), with fullstack ambitions
- **Pedagogy:** chunk-based teaching — establish the mental model *first*, then introduce syntax. Not generic bootcamp content.
- Materials: structured session notes, beginner exercise briefs, model-answer files
- Format has included WhatsApp-distributed course content for active cohorts
- Positioning: for people who want to actually understand how things work, not just copy-paste syntax

### B. Delivery Arm — "Build"
- A software studio building production systems for real clients
- **Active/notable projects:**
  - **DOMICOP** & **ITC** — cooperative society platforms (RBAC via Supabase custom JWT claims + RLS, Expo Router-based mobile apps)
  - **ParkMate** — two-sided parking marketplace (Expo React Native, TanStack Start, Elysia/Bun/Railway, Supabase, Paystack)
  - **StreamConf** — livestreaming/conferencing platform (TanStack Start, LiveKit, Elysia/Bun, Supabase)
  - **Sign Me Out** — a product digitizing the Nigerian university "sign-out" tradition into a shared, infinite-canvas signing space (Konva.js, TanStack Start, Elysia, Supabase, Paystack)
- **Engineering philosophy:** every project starts with a rigorous 11-step system design process before a line of code is written. Architecture-first, not move-fast-and-break-things.
- **Preferred stack:** Bun + Elysia (backend), Supabase (data/auth), TanStack Start (web), Expo/React Native (mobile), Paystack (Nigerian payments)

---

## 3. Founder

**Name:** Mich (Michael) — `[NEEDS INPUT: full name as you want it displayed]`
**Role:** Founder, AI Systems Engineer & Software Engineer (aspiring → building toward)
**Bio direction:** Mich approaches engineering with first-principles curiosity — equally comfortable reasoning about render engine internals, economics, or a client's RLS policy. Builds fullstack products for clients while running NexaHubTech's developer education arm. The company exists because Mich believes the fastest way to train good engineers is to put them next to real problems.

`[NEEDS INPUT: a 2-3 sentence personal note/quote from Mich for the About page, and a headshot/photo]`

---

## 4. Target Audience

1. **Aspiring developers** in Nigeria/Africa who want a structured, principles-first path into web/fullstack development
2. **Businesses/founders** needing a technical partner who designs before they build — cooperative societies, marketplaces, startups needing an MVP
3. **NexaHubTech course alumni** looking for ongoing resources or advanced tracks

---

## 5. Site Map & Page-by-Page Content Brief

### Home
- Hero: one clear statement of the dual mission (train + build), strong CTA split into two paths: "Hire Us" / "Learn With Us"
- Brief visual proof: logos/names of platforms built (DOMICOP, ITC, ParkMate, StreamConf, Sign Me Out) — even just as a "what we've built" strip
- Short framing of the engineering philosophy (architecture-first, 11-step system design)
- Social proof section `[NEEDS INPUT: testimonials, student/client count, if any]`

### About
- Origin story: Codex Technologies → NexaHubTech rebrand `[NEEDS INPUT: why the rebrand happened, founding year]`
- The "skills-to-service" thesis explained
- Founder bio (Mich)
- Values: first-principles reasoning, least-cost optimization, architecture before code

### What We Do (Services)
Split clearly into two columns/tabs:
- **For Businesses:** fullstack product development, system design & architecture consulting, mobile (Expo/React Native) + web (TanStack Start) builds, payment integration (Paystack/Nigerian gateways), cooperative society & marketplace platforms
- **For Learners:** Frontend Track curriculum breakdown, teaching methodology, what a typical session looks like, who it's for

### Courses
- Frontend Track: HTML → CSS → JavaScript, chunk-based curriculum
- Format, duration, cohort structure `[NEEDS INPUT: price, schedule, enrollment process, next cohort date]`
- Sample lesson or exercise teaser (could pull from existing materials)
- Enrollment CTA

### Portfolio / Case Studies
One card or section per project — each with: problem, stack used, what makes it interesting architecturally
- DOMICOP / ITC (cooperative society platforms — RBAC, RLS)
- ParkMate (two-sided marketplace)
- StreamConf (real-time livestreaming infra)
- Sign Me Out (infinite-canvas social product)
`[NEEDS INPUT: screenshots, live links if public, client names if okay to disclose]`

### Our Approach (optional but recommended)
A page dedicated to the 11-step system design framework — this is genuinely a differentiator. Worth making visible rather than burying it in About.

### Contact / Get Started
- Two CTAs again: "Start a Project" vs "Join a Course"
- Contact form
- `[NEEDS INPUT: email, phone/WhatsApp, social links — X/Twitter, LinkedIn, Instagram]`

### Blog / Notes (optional)
Given Mich's habit of writing deep technical breakdowns (system design docs, stack comparisons), a blog could double as both content marketing and a teaching extension. Not required for launch.

---

## 6. Visual & Brand Direction

*(Suggestions below — override freely if you already have brand assets)*

- **Mood:** modern technical, not corporate-sterile — should feel like a builder's space, not a generic SaaS template
- **Color direction:** dark-mode-first palette (deep charcoal/near-black base) with one confident accent color — suggest a saturated green or amber (signals "build/code" energy without going full default-blue-tech-cliché). Avoid Nigerian-flag-green-as-cliché unless intentional.
- **Typography:** a clean monospace or geometric sans for headings (signals "engineering"), a readable humanist sans for body text
- **Imagery:** prefer real screenshots of shipped products over stock photography; code snippets / architecture diagrams as decorative elements work well given the brand
- **Logo:** `[NEEDS INPUT: existing logo file, or note if one needs to be designed]`

---

## 7. Tone of Voice

- Direct, confident, technically literate — write for people who can tell the difference between substance and buzzwords
- No fluff/hype language ("revolutionary," "game-changing")
- Comfortable being specific about *how* things are built, not just *what*
- Educational content should explain the "why" before the "how" (mirrors the teaching pedagogy)

---

## 8. Technical Build Requirements

- Fully responsive (mobile-first — large share of Nigerian traffic is mobile)
- Fast load times — keep initial bundle lean, lazy-load case study images
- **Suggested stack** (to match the company's own preferences, if building in-house): TanStack Start + Tailwind CSS, deployed via Vercel; or a static-site approach (Astro) if no dynamic enrollment/contact backend is needed initially
- Basic SEO: meta tags, OpenGraph images per page, sitemap
- Contact form should submit to `[NEEDS INPUT: email or form service — e.g. Formspree, or a Supabase table since that's already in the stack]`
- Analytics: `[NEEDS INPUT: preference — Plausible, GA4, none]`

---

## 9. Inputs Still Needed From You

- [ ] Logo / brand colors if already decided
- [ ] Domain name
- [ ] Contact email, phone/WhatsApp, social handles
- [ ] Course pricing, schedule, enrollment process
- [ ] Permission to name/screenshot client projects (DOMICOP, ITC) publicly
- [ ] Founder photo + personal quote
- [ ] Year founded / rebrand story (Codex Technologies → NexaHubTech)
- [ ] Any existing testimonials or numbers (students trained, projects delivered)
