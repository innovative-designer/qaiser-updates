# Free Invoice Kit SEO Launch Ops Playbook

**Purpose:** Track and execute every non-code SEO launch task required to get Free Invoice Kit indexed, distributed, and monitored properly after the engineering work in `docs/plans/2026-03-09-seo-launch-plan.md` is in place.

**Companion engineering plan:** `docs/plans/2026-03-09-seo-launch-plan.md`

**How to use this playbook:**
- Work top to bottom.
- Do not start launch-day distribution until the engineering baseline is live on the production domain.
- Record owner, status, and completion date for each task in your project tracker.
- Keep screenshots or links for every verification task.

---

## Success Criteria

- Production domain is verified in Google Search Console and Bing Webmaster Tools.
- Sitemap is submitted and key launch pages are requested for indexing.
- At least 3 high-quality indexable blog posts are live at launch.
- Launch-day distribution is executed with tailored copy per channel.
- Week 1 and Week 2 directory/outreach work is completed without spammy duplication.
- Search performance and indexing are reviewed weekly for the first 30 days.

---

## Required Inputs Before Starting

- Production domain and hosting are live
- HTTPS is active
- `APP_URL` matches the live domain
- Sitemap resolves at `/sitemap.xml`
- `robots.txt` resolves at `/robots.txt`
- Default OG image is live
- Key landing pages have final metadata and schema
- Product screenshots are current
- Demo GIF or short product recording exists
- Maker/company bio copy exists
- Support email is active

---

## Ops Phase 0: Launch Asset Pack

**Goal:** Prepare all assets once so channel-specific work does not stall.

### Required assets

- 1 logo lockup
- 1 square icon
- 1 default OG image
- 3 to 5 clean product screenshots
- 1 mobile screenshot of the invoice flow
- 1 15 to 30 second demo GIF or MP4
- 1 short description: 60 characters or less
- 1 medium description: 160 characters or less
- 1 long description: 250 to 300 characters
- 1 founder/maker blurb
- 1 list of product differentiators:
  - free forever core flow
  - no signup
  - WhatsApp-first
  - mobile-first
  - works offline
  - emerging-market friendly

### Copy bank to prepare

- One-line tagline
- Product Hunt description
- Show HN title
- Reddit variants by audience
- X thread opener
- LinkedIn post
- Directory listing summary
- Outreach email template for resource-page inclusion

### Definition of done

- All assets are saved in a shared folder and easy to reuse.
- The team is not rewriting launch copy from scratch per channel.

---

## Ops Phase 1: Search Engine Setup

**Goal:** Ensure major search engines can discover, crawl, and report on the site.

### Task 1: Google Search Console

**Priority:** Critical

**Steps:**
1. Go to `https://search.google.com/search-console`.
2. Add the production domain as a domain property.
3. Verify ownership with a DNS TXT record at the registrar.
4. Confirm verification succeeded.
5. Submit `https://www.freeinvoicekit.com/sitemap.xml`.
6. Open URL Inspection and request indexing for the launch pages listed below.

**Priority URLs to request indexing:**
- `https://www.freeinvoicekit.com/`
- `https://www.freeinvoicekit.com/send-invoice-whatsapp`
- `https://www.freeinvoicekit.com/free-invoice-maker-freelancers`
- `https://www.freeinvoicekit.com/invoice-generator-pakistan`
- `https://www.freeinvoicekit.com/whatsapp-billing-uae`
- `https://www.freeinvoicekit.com/stripe-invoice-alternative`
- `https://www.freeinvoicekit.com/blog`
- `https://www.freeinvoicekit.com/blog/send-invoice-whatsapp-30-seconds`

**Artifacts to save:**
- screenshot of verification
- screenshot of sitemap submission
- list of inspected URLs

### Task 2: Bing Webmaster Tools

**Priority:** High

**Steps:**
1. Go to `https://www.bing.com/webmasters`.
2. Add the site.
3. Import verification from Google Search Console if available.
4. Submit the sitemap.
5. Enable any available auto-submission features.

**Artifacts to save:**
- screenshot of verification
- screenshot of sitemap status

### Task 3: Optional IndexNow Follow-Up

**Priority:** Medium

**Use this only if the engineering workflow later adds IndexNow support.**

**Steps:**
1. Confirm an IndexNow key exists.
2. Confirm there is a repeatable submission method after deploy.
3. Log the live endpoint or CI job location.

---

## Ops Phase 2: Launch Content Minimum

**Goal:** Avoid launching with a thin content footprint.

### Launch minimum

- 1 homepage
- 4 to 6 strong landing/comparison pages
- 1 blog index
- 3 blog posts minimum

### Blog posts to have live by launch

1. `How to Send an Invoice on WhatsApp in 30 Seconds`
2. `Free Invoice Generator with No Signup — Why It Matters`
3. `How to Create a Professional Invoice on Your Phone`

If capacity allows, add:

4. `WhatsApp vs Email for Invoicing: What Gets Paid Faster`
5. `The Best Free Invoice Tools for Pakistani Freelancers`

### Editorial quality bar

- clear primary keyword
- useful unique angle
- not generic AI filler
- visible CTA to `/create`
- internal links to at least 2 relevant indexable pages
- no claims about product features that are not shipped

### Definition of done

- Launch does not depend entirely on technical SEO and one post.

---

## Ops Phase 3: Pre-Launch QA Checklist

**Goal:** Catch preventable launch mistakes before any promotion starts.

### Domain and site checks

- [ ] Production domain is final
- [ ] HTTPS is active
- [ ] Homepage loads without console-blocking errors
- [ ] `https://www.freeinvoicekit.com/robots.txt` resolves
- [ ] `https://www.freeinvoicekit.com/sitemap.xml` resolves
- [ ] Canonicals use the production domain
- [ ] OG image previews render correctly in a link preview debugger

### Metadata and indexing checks

- [ ] Homepage title and description are final
- [ ] Blog index title and description are final
- [ ] Blog posts have canonical and article schema
- [ ] Geo pages have locale-aware metadata
- [ ] No utility pages that should be hidden are appearing in the sitemap

### Page quality checks

- [ ] No placeholder text
- [ ] No half-finished FAQ blocks
- [ ] No dead internal links
- [ ] No CTA copy promising missing features

### Analytics and tracking checks

- [ ] PostHog production env vars are configured if using PostHog
- [ ] Pageview tracking is working in production
- [ ] Funnel event plan exists for invoice creation, PDF generation, and sharing

### Performance spot-checks

- [ ] Homepage passes a mobile Lighthouse smoke test
- [ ] No obvious layout shift on load
- [ ] Core landing pages load correctly on mobile

---

## Ops Phase 4: Launch-Day Distribution

**Goal:** Create the first discovery spike while the site is getting indexed.

### Channel order for launch day

1. Product Hunt
2. Hacker News
3. X / Twitter
4. Reddit
5. LinkedIn

### Task 1: Product Hunt

**What to prepare:**
- name
- tagline
- short description
- long description
- logo
- screenshots
- demo GIF
- maker profile

**Recommended positioning:**
- “Free invoice generator”
- “Send on WhatsApp”
- “No signup”
- “Works offline”

**Execution notes:**
- Launch on Tuesday, Wednesday, or Thursday.
- Have the listing ready before launch day.
- Respond quickly to comments.
- Do not ask for low-quality vote rings; they create bad launch quality and weak discussion.

### Task 2: Hacker News Show HN

**Working title:**
- `Show HN: Free Invoice Kit – free invoice generator, send PDFs on WhatsApp in 30s`

**Execution notes:**
- Lead with the real problem and product behavior, not marketing copy.
- Mention the technical angle only if it helps credibility.
- Be ready to answer questions about offline support, mobile flow, storage, and why WhatsApp matters.
- Save the thread URL and notable feedback.

### Task 3: X / Twitter Thread

**Thread structure:**
1. The problem with most invoice tools
2. Why WhatsApp-first matters
3. The no-signup angle
4. Demo GIF
5. Link to the site

**Execution notes:**
- Keep it product-native, not hype-heavy.
- Use 1 to 2 relevant screenshots.

### Task 4: Reddit

**Target subreddits to review for fit:**
- `r/freelance`
- `r/pakistan`
- `r/digitalnomad`
- `r/smallbusiness`
- `r/webdev`

**Execution notes:**
- Rewrite the post per subreddit.
- Do not paste the same title and body everywhere.
- Lead with usefulness or build story depending on subreddit norms.
- Read and respect self-promotion rules before posting.

### Task 5: LinkedIn

**Angle:**
- mobile-first invoicing for freelancers and small businesses

**Execution notes:**
- Use a clean screenshot or short demo
- keep the copy practical
- invite product feedback

---

## Ops Phase 5: Week 1 Directory And Listing Work

**Goal:** Build initial citations and referral links from legitimate software/listing sites.

### Priority directory list

- AlternativeTo
- G2
- Capterra
- GetApp
- SaaSHub
- Slant
- ToolHunt
- Uneed
- Fazier

### For each listing, prepare

- short description
- long description
- category selection
- pricing model
- logo
- screenshots
- official website URL
- support email

### Listing quality rules

- Use product-consistent descriptions, but vary wording slightly.
- Do not submit incomplete profiles.
- Track live URLs and approval status.
- Note whether links are follow, nofollow, or profile-only when visible.

### Definition of done

- Every targeted listing has either been submitted, approved, or explicitly deprioritized with a reason.

---

## Ops Phase 6: Week 1 And Week 2 Outreach

**Goal:** Start building the first real backlinks and mentions.

### Task 1: Resource Page Outreach

**Target searches:**
- `free invoice tools`
- `invoice generator list`
- `freelancer tools`
- `small business billing tools`

**What to track per prospect:**
- site
- page URL
- contact person
- email
- reason the page is a fit
- status
- sent date
- reply date

**Email template skeleton:**

- subject: `Free invoice tool for your resource page`
- body:
  - mention the page specifically
  - explain why Free Invoice Kit is relevant
  - highlight no-signup + WhatsApp + mobile-first angle
  - keep it short

### Task 2: Guest Post Prospecting

**Target sites to research first:**
- freelancer-focused blogs
- invoicing and accounting blogs
- solo-business and digital-nomad publications

**Pitch angles:**
- invoicing in emerging markets
- why WhatsApp-first invoicing matters
- building a lightweight PWA billing tool

### Task 3: Founder-Led Community Posts

**Priority communities:**
- Indie Hackers
- Dev.to
- relevant Facebook groups
- niche freelancer communities

**Execution notes:**
- Story-first posts work better than product pitches.
- Share learnings, not only the link.

### Task 4: Press And Source Platforms

**Options:**
- Qwoted
- similar expert-source platforms that are still active and relevant

**Rule:**
- Verify each platform is active before investing time.

---

## Ops Phase 7: Monitoring And Iteration

**Goal:** Turn early traffic and indexing data into the next set of SEO priorities.

### Weekly checks for the first 30 days

#### Google Search Console

- [ ] Coverage issues
- [ ] Sitemap status
- [ ] New impressions
- [ ] Queries by page
- [ ] Pages with impressions but weak click-through rate
- [ ] Pages excluded unexpectedly

#### Bing Webmaster Tools

- [ ] Crawl status
- [ ] Index coverage
- [ ] Query visibility

#### Product analytics

- [ ] Homepage to `/create` click-through
- [ ] invoice creation completion
- [ ] PDF generation
- [ ] WhatsApp share usage if tracked

#### Content review

- [ ] Which launch pages are getting impressions first
- [ ] Which posts need title or description refinement
- [ ] Which new comparison or geo page should be built next

### 30-day review outputs

- top landing pages by impressions
- top pages by clicks
- low-CTR pages worth metadata tuning
- non-indexed pages that should be indexed
- next 5 SEO pages to build
- next 3 blog posts to publish

---

## Anti-Spam Rules

- Do not mass-submit identical copy across communities.
- Do not buy backlinks.
- Do not create low-value city pages with barely changed copy.
- Do not use fake review strategies on software directories.
- Do not over-promise product capabilities in outreach or listings.

---

## Recommended Tracker Columns

Use a spreadsheet or task board with these fields:

- workstream
- task
- owner
- status
- priority
- URL
- due date
- completed date
- proof link
- notes

---

## Ready-To-Execute Verdict

This playbook is ready to use as the manual SEO operations companion to the engineering plan.

Execute it only after the production site reflects the core implementation work from:

- `docs/plans/2026-03-09-seo-launch-plan.md`

