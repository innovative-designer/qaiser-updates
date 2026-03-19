# Keyword-to-Pages SEO Strategy

Date: 2026-03  
Project: Free Invoice Kit  
Related: [SEO Schema & Metadata Research](../seo-schema-metadata-research-2026-03-18.md)

## Purpose

Map the target keyword list to existing and planned pages so that:

- High-intent phrases get **dedicated landing pages** where it makes sense.
- Modifiers (free, online, pdf, best) are used in **titles and descriptions** on existing pages.
- We avoid duplicate or thin pages; we extend the current programmatic SEO system where possible.

---

## Keyword Clusters and How We Use Them

### 1. Core product-type keywords (head terms)

| Keyword | How we use it |
|--------|----------------|
| Invoice Generator | Homepage + primary landing titles (already). Keep as main brand + category phrase. |
| Receipt Generator | **New:** Either a dedicated `/receipt-generator` or a section on a “generators” hub. Product scope decision: does the app support receipts or only invoices? If receipts later, add page. |
| Estimate Generator | **New:** Same as receipt – dedicated page or hub section when product supports estimates. |
| Quote Generator | **New:** Same as above. |
| Purchase Order Generator | **New:** Same as above; often lower volume, can be one “Other documents” or PO-specific page. |

**Recommendation:** For now, use “invoice generator” as the main term. Add Receipt/Estimate/Quote/PO pages only when the product supports them, or add a single “Free invoice, quote, and estimate generator” style hub that links to the one current product (invoices) and future ones.

---

### 2. “Invoice generator for [audience / use-case]” (long-tail)

These fit the **existing programmatic system**: `invoice-generator/[slug]` is driven by **country** and **industry** content. We can capture most of the list by:

- **Adding more industry/use-case entries** to `src/content/seo/industries.ts` (and optionally a separate “use-case” dataset if we want a different content shape).

| Keyword / theme | Suggested slug / page | Notes |
|-----------------|------------------------|--------|
| invoice generator for freelancers | `/free-invoice-maker-freelancers` (existing) + `/invoice-generator/freelancers` | Existing freelancer landing; add industry slug “freelancers” for long-tail. |
| invoice generator for small business | `invoice-generator/small-business` | New industry entry. |
| invoice generator for amazon / amazon seller | `invoice-generator/amazon-sellers` | New industry/use-case. |
| invoice generator for ebay | `invoice-generator/ebay-sellers` | New. |
| invoice generator for payoneer | `invoice-generator/freelancers` or dedicated “payoneer” if volume justifies. | Often same intent as freelancers. |
| invoice generator for contractor / independent contractors | `invoice-generator/contractors` | New industry. |
| invoice generator for consulting services | `invoice-generator/consultants` | New. |
| invoice generator for hotel | `invoice-generator/hotels` | New. |
| invoice generator for travel agency | `invoice-generator/travel-agency` | New. |
| invoice generator for cleaning services | `invoice-generator/cleaning-services` | New. |
| invoice generator for photography | `invoice-generator/photographers` | New (or extend “creative” cluster). |
| invoice generator for designers | Already have `graphic-designers`; add `invoice-generator/designers` if needed. | |
| invoice generator for content creator / creators / influencers | `invoice-generator/content-creators` | New. |
| invoice generator for musicians | `invoice-generator/musicians` | New. |
| invoice generator for lawyers | `invoice-generator/lawyers` | New. |
| invoice generator for video editing | `invoice-generator/video-editors` | New. |
| invoice generator for restaurant | `invoice-generator/restaurants` | New. |
| invoice generator for taxi | `invoice-generator/taxi` | New. |
| invoice generator for gym | `invoice-generator/gym` | New. |
| invoice generator for mechanic shop | `invoice-generator/mechanics` | New. |
| invoice generator for trucking company | `invoice-generator/trucking` | New. |
| invoice generator for car rental | `invoice-generator/car-rental` | New. |
| invoice generator for events | `invoice-generator/events` | New. |
| invoice generator for self employed / sole trader | `invoice-generator/sole-traders` or freelancers. | Overlap with freelancers. |
| invoice generator for ndis | `invoice-generator/ndis` | New (AU-specific). |
| invoice generator for employee / salary | Lower priority; different intent (internal payroll). | Skip or single “salary invoice” FAQ. |

**Implementation:** Add new entries to `industries.ts` (or a new `use-cases.ts` that reuses the same route and component pattern). Reuse existing `IndustryPage` / `buildIndustryPageMetadata`; ensure sitemap and internal links include new slugs.

---

### 3. “Invoice generator for [platform / tool]”

| Keyword | How we use it |
|--------|----------------|
| invoice generator for shopify / woocommerce / wordpress | **Compare** or “for X” page: e.g. “Invoice generator for Shopify users” as a comparison or bridge page (like existing `compare/[slug]`). |
| invoice generator for excel | Comparison or “export to Excel” style FAQ; or `/invoice-generator/excel` if we have an Excel story. |
| invoice generator for paypal | Use in freelancer/payment landings; no need for a PayPal-only page unless we integrate. |

**Recommendation:** Prefer **comparison pages** (`compare/shopify`, `compare/woocommerce`) or a single “Invoice generator that works with Shopify, WooCommerce, PayPal” style landing that links to the builder.

---

### 4. Geography (country)

| Keyword | How we use it |
|--------|----------------|
| invoice generator for australia | Add or extend country page `invoice-generator/australia` (e.g. in `countries.ts`). |
| invoice generator for india | Likely already in country pages; confirm and strengthen. |
| invoice generator for uk | Add `invoice-generator/uk` if not present. |
| invoice generator for india (free, etc.) | Same page; use “free” in title/description. |

**Implementation:** Ensure `countries.ts` has entries for AU, UK, IN (and others from the research). Use “free invoice generator for [country]” in titles/descriptions.

---

### 5. Device / environment

| Keyword | How we use it |
|--------|----------------|
| invoice generator for pc / laptop / windows / mac | Use in meta and one short section or FAQ: “Works on any device—PC, Mac, laptop, phone.” No separate page per device. |
| invoice generator for iphone / mobile / phone | Same: “Mobile-friendly invoice generator” in titles and hero. |
| invoice generator for chromebook | One FAQ or same “works on any device” copy. |
| invoice generator for thermal printer | FAQ or feature mention if we support print-ready PDFs. |

**Recommendation:** Don’t create per-device pages. Use these phrases in **titles, descriptions, and one “works everywhere” block** on homepage or a single “features” page.

---

### 6. Modifiers (free, online, pdf, best, simple)

Use **everywhere** in titles and meta descriptions; do **not** build separate pages per modifier.

- **free** → “Free invoice generator for …”, “Free invoice generator for freelancers”, etc.
- **online** → “Online invoice generator”, “Create invoices online”.
- **pdf** → “PDF invoice generator”, “Export PDF invoices”.
- **best** → “Best free invoice generator for small business” (in title/description for that landing).
- **simple** / **easy** → Use in copy and meta.

**Implementation:** In `industries.ts`, `countries.ts`, and static landings, ensure each page’s `title` and `description` include the most relevant modifier (e.g. “free” for free product, “pdf” for download intent).

---

### 7. Format / use-case specifics

| Keyword | How we use it |
|--------|----------------|
| invoice generator format | One “Invoice format” or “What to include on an invoice” page or FAQ; link from builder. |
| invoice generator for hours worked | Industry page “invoice-generator/hourly-workers” or contractors. |
| invoice generator for service | Generic; cover on homepage and industry pages. |
| invoice generator for client / my business / company | Homepage + builder; no extra page. |
| invoice generator for rent | `invoice-generator/landlords` or “rent invoice” FAQ. |
| invoice generator for reimbursement | FAQ or small section. |
| invoice generator for gst | Country pages (e.g. India, AU) + FAQ on GST fields. |
| invoice generator for payment | Use in CTAs and meta (“Get paid faster with a clear invoice”). |
| invoice generator for llc | One FAQ or “for small business” page. |
| pdf invoice generator for freelancers with api support | If we add API: dedicated “API” or “for developers” page; otherwise omit. |

---

## Summary: What to Build vs What to Write

| Action | Where |
|--------|--------|
| **WebSite + Organization schema** | Done (homepage). |
| **More “invoice generator for [X]” landings** | Add entries to `industries.ts` (or use-case dataset) for: small-business, amazon-sellers, ebay-sellers, contractors, consultants, hotels, travel-agency, cleaning-services, photographers, content-creators, musicians, lawyers, video-editors, restaurants, taxi, gym, mechanics, trucking, car-rental, events, sole-traders, ndis. |
| **Country pages** | Ensure Australia, UK, India (and others) exist in `countries.ts` with “free invoice generator for [country]” style titles. |
| **Receipt / Estimate / Quote / PO** | Only when product supports them; or one “generators” hub. |
| **Platform (Shopify, WooCommerce, etc.)** | Prefer comparison or one “works with” landing. |
| **Modifiers (free, online, pdf, best)** | In titles and descriptions on existing and new pages. |
| **Device (PC, Mac, iPhone, etc.)** | In meta and one “works on any device” section; no per-device pages. |

---

## Suggested implementation order

1. **Schema** – Done (WebSite, Organization, SoftwareApplication on homepage).
2. **Titles and descriptions** – Audit About, Contact, FAQ and key landings; add “free”, “online”, “pdf” where relevant.
3. **Industry/use-case expansion** – Add 5–10 high-value industry slugs (e.g. small-business, contractors, amazon-sellers, photographers, consultants) to `industries.ts` and wire content.
4. **Country gaps** – Add or tighten Australia, UK, India (and any others missing).
5. **Receipt/Estimate/Quote** – When product supports them, add corresponding pages or hub.

This keeps the current architecture (invoice-generator/[slug], compare, templates, blog) and extends it with content that matches how people search (invoice generator for X, free, online, pdf, by country).
