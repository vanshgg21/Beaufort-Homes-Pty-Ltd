// Beaufort Homes — cinematic home page (GSAP ScrollTrigger)
// Progressive enhancement: without JS the page is fully readable.

(() => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  /* ================= DESKTOP CINEMATIC ================= */
  mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {

    /* ---- 1. hero: pin, zoom video, dim, lift content ---- */
    const heroVideo = document.querySelector('.hero-media video');
    const heroDim = document.querySelector('.hero-dim');
    const heroContent = gsap.utils.toArray('.hero > *:not(.hero-media)');

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=110%',
        pin: true,
        scrub: 0.6,
      }
    });
    if (heroVideo) heroTl.fromTo(heroVideo, { scale: 1 }, { scale: 1.16, ease: 'none' }, 0);
    if (heroDim) heroTl.fromTo(heroDim, { opacity: 0 }, { opacity: 0.75, ease: 'none' }, 0);
    heroTl.to(heroContent, { y: -90, opacity: 0, stagger: 0.015, ease: 'none' }, 0.12);

    /* ---- 2. statement: lines rise as you scroll (scrubbed) ---- */
    gsap.utils.toArray('.st-inner').forEach((el, i) => {
      gsap.fromTo(el, { yPercent: 115 }, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top 92%',
          end: 'top 55%',
          scrub: 0.5,
        }
      });
    });
    gsap.fromTo('.st-copy', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.st-copy', start: 'top 85%' }
    });

    /* ---- 4. capabilities: pinned chapter, items swap with progress ---- */
    const items = gsap.utils.toArray('.cap-item');
    const curNum = document.querySelector('.caps-num .cur');
    const bar = document.querySelector('.caps-progress .bar');
    if (items.length) {
      let active = -1;
      const setActive = (idx) => {
        if (idx === active) return;
        active = idx;
        items.forEach((it, i) => it.classList.toggle('active', i === idx));
        if (curNum) curNum.textContent = String(idx + 1).padStart(2, '0');
        if (bar) bar.style.width = ((idx + 1) / items.length * 100) + '%';
      };
      setActive(0);
      ScrollTrigger.create({
        trigger: '.caps-ch',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          setActive(idx);
        }
      });
    }

    /* ---- 5. horizontal project showcase ---- */
    const track = document.querySelector('.proj-track');
    const stage = document.querySelector('.proj-stage');
    if (track && stage) {
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
      gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.proj-ch',
          start: 'top top',
          end: () => '+=' + (getDist() + window.innerHeight * 0.2),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });
    }

    /* ---- 6. CTA: gentle parallax rise ---- */
    gsap.fromTo('.cta-band', { backgroundPositionY: '30px' }, {
      backgroundPositionY: '0px',
      ease: 'none',
      scrollTrigger: { trigger: '.cta-band', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    return () => {}; // gsap.matchMedia handles cleanup
  });

  /* ================= ALL DEVICES: counters ================= */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const fmt = (n) => n.toLocaleString('en-AU');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) { el.textContent = fmt(target) + suffix; return; }
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(target * eased)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); io.observe(el); });
  }

  /* refresh triggers once everything (fonts, video poster) settles */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
