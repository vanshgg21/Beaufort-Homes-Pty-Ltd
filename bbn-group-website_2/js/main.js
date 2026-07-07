// Beaufort Homes — shared behaviour

// ---------- solid nav on scroll ----------
const nav = document.querySelector('.main-nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- mobile menu ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- smooth page transitions ----------
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    a.target === '_blank'
  ) return;
  e.preventDefault();
  document.body.classList.add('page-exit');
  setTimeout(() => { window.location.href = href; }, 380);
});

// restore state when returning via back/forward cache
window.addEventListener('pageshow', e => {
  if (e.persisted) document.body.classList.remove('page-exit');
});

// ---------- hero title: staggered letter entrance ----------
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  let i = 0;
  const split = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        [...child.textContent].forEach(ch => {
          if (ch.trim() === '') {
            frag.appendChild(document.createTextNode(ch));
          } else {
            const s = document.createElement('span');
            s.className = 'ht-letter';
            s.style.animationDelay = (0.25 + i * 0.045) + 's';
            s.textContent = ch;
            frag.appendChild(s);
            i++;
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        split(child);
      }
    });
  };
  split(heroTitle);
}

// ---------- headings: word-by-word mask reveal ----------
const splitTargets = document.querySelectorAll(
  '.page-hero h1, .section-head h2, .intro-grid h2, .cta-band h2'
);

splitTargets.forEach(el => {
  let w = 0;
  const splitWords = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(part => {
          if (part.trim() === '') {
            if (part) frag.appendChild(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.className = 'wi';
            inner.style.setProperty('--wi', w);
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
            w++;
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        splitWords(child);
      }
    });
  };
  splitWords(el);
  el.classList.add('wsplit');
});

const wordIO = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('words-in');
      wordIO.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.wsplit').forEach(el => wordIO.observe(el));

// close mobile menu on link tap (after transition handler)
if (toggle) {
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ---------- custom cursor: dot + trailing ring ----------
(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(ring);
  document.body.classList.add('has-cursor');

  let mx = innerWidth / 2, my = innerHeight / 2; // mouse
  let rx = mx, ry = my;                          // ring (lerped)
  let shown = false;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!shown) { document.body.classList.add('cursor-on'); shown = true; }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-on'); shown = false;
  });

  (function glide() {
    rx += (mx - rx) * 0.24;
    ry += (my - ry) * 0.24;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(glide);
  })();

  const HOVERABLE = 'a, button, input, select, textarea, label, .nav-toggle';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVERABLE)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVERABLE)) document.body.classList.remove('cursor-hover');
  });
  addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
  addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));
})();

// ---------- site-wide scroll progress bar ----------
(() => {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
})();
