BBN GROUP — SCAFFOLDING WHOLESALER WEBSITE
==========================================

Same design system and palette as the Beaufort Homes site.

WHAT'S IN HERE
  index.html      Home (hero, who we are, category grid, how it works)
  products.html   Full catalogue: 45 products in 8 categories, each with a
                  quantity stepper and "Add to Enquiry". A floating Enquiry
                  button opens a drawer listing chosen items; the form sends
                  the list by email. NO online payment, NO stock levels shown.
  about.html      Company, how we work, leadership, group companies
  contact.html    Phone, emails, warehouse address + general form
  js/products.js  The catalogue data AND the enquiry logic. To add, rename
                  or remove a product, edit the CATALOGUE array at the top.
  images/         BBN Group logo traced from the official card artwork
                  (bbng-logo.svg + light version), favicon, share image,
                  product photos (images/products/), sister logos
  videos/         Hero background video (hero.mp4) with poster fallback

BEFORE LAUNCH
  1. FORMS: create a Formspree form for BBN Group and replace YOUR_FORM_ID
     in BOTH products.html and contact.html.
  2. PRODUCT PHOTOS: real photos from the old site are included at
     images/products/, one per product, matched by name. To change one,
     replace its jpg (lowercase name, spaces as hyphens, e.g.
     "Double Coupler" = double-coupler.jpg).
  3. STATS on the home page are derived from the catalogue (45+ lines, 8
     categories); adjust if the range changes.
  4. DOMAIN: bbngroup.com.au currently points at the old PHP site. Deploy
     this folder (GitHub + Netlify like Beaufort) and repoint the domain,
     OR upload these files over the old hosting. The old products data has
     been fully migrated so nothing is lost either way.

The catalogue was migrated from the previous bbngroup.com.au products
section: Forged Clamps (6), Pressed Steel Clamps (2), Quick Lock System
(7), Jacks & Base Plates (3), Props & Column Clamps (2), Steel Boards (2),
Special Products (15), Fencing & Site Supplies (8).

NOTES (July 2026 update)
  - Hire/rental removed site-wide: the business is sales only now.
  - Fax removed. General enquiry emails: info@bbngroup.com.au and
    sushil@bbngroup.com.au.
  - All three group sites now cross-link each other in their footers.
