BEAUFORT HOMES — WEBSITE (first rendition)
==========================================

WHAT'S IN HERE
  index.html      Home page (video hero, intro, capabilities, featured projects)
  projects.html   Project portfolio (7 placeholder projects)
  about.html      About page (company, approach, leadership, values)
  contact.html    Contact details + enquiry form
  css/main.css    All styling (brand palette defined at the top as variables)
  js/main.js      Nav behaviour + scroll animations
  images/         Vectorised logo (logo.svg / logo-light.svg), favicon,
                  placeholder project artwork (ph-1..8.svg), hero poster frame
  videos/         hero.mp4, the AI-generated construction clip behind the
                  home-page hero (swap for real drone footage of your own
                  projects whenever you have it)

HOW TO VIEW
  Just open index.html in any browser. Everything works locally.

TO PUT IT LIVE
  Upload the whole folder to any static host — Netlify, Vercel, GitHub Pages,
  or your existing hosting's public_html. No server code is needed.

THINGS TO REPLACE BEFORE LAUNCH
  1. CONTACT FORM: create a free account at https://formspree.io, make a
     form, and replace YOUR_FORM_ID in contact.html with your form's ID.
     Submissions then arrive at your email.
  2. PROJECTS: swap "Project One..Seven" names, specs, descriptions and the
     placeholder images (images/ph-*.svg) with real photos as they become
     available.
  3. STATS on the home page (20+ projects, 48,000m², 15+ years) are
     placeholders. Update with real figures.
  4. Instagram links point to "#".
     Add your real Instagram URL.

SEO / GOOGLE (already built in)
  - Each page has a unique title, meta description, canonical tag, Open
    Graph + Twitter share tags, and JSON-LD business data (LocalBusiness /
    address / phone / area served) so Google understands the business.
  - robots.txt and sitemap.xml are included for search engines.
  To actually rank, once live: (1) verify the domain in Google Search
  Console and submit sitemap.xml, (2) create a free Google Business Profile
  for the company (this is what surfaces you for local "builder near me"
  type searches), (3) keep the page text describing what you do and where.
