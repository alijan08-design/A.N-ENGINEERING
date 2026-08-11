/* ============================================================
   A.N Power Engineering & Services — Global JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Preloader ────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 1800);
    });
  }

  /* ── Navbar scroll ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Set active nav link ──────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Hamburger / Mobile Nav ───────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Back to Top ──────────────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ── Stats Counter ────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(n => counterObs.observe(n));
  }

  function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, step);
  }

  /* ── Testimonial Slider ───────────────────────────────────── */
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = track.children.length;
    let current = 0;
    const dots = document.querySelectorAll('.slider-dot');
    function goTo(i) {
      current = (i + slides) % slides;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    }
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    goTo(0);
    setInterval(() => goTo(current + 1), 5000);
  }

  /* ── Project Filter ───────────────────────────────────────── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.proj-item').forEach(item => {
          const match = filter === 'all' || item.dataset.cat === filter;
          item.style.display = match ? '' : 'none';
          item.style.opacity = match ? '1' : '0';
        });
      });
    });
  }

  /* ── Lightbox ─────────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = document.getElementById('lb-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let lbIndex = 0;
    const images = [];
    galleryItems.forEach((item, i) => {
      const src = item.querySelector('img').src;
      images.push(src);
      item.addEventListener('click', () => openLB(i));
    });
    function openLB(i) {
      lbIndex = i;
      lbImg.src = images[i];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('lb-close')?.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.getElementById('lb-prev')?.addEventListener('click', () => openLB((lbIndex - 1 + images.length) % images.length));
    document.getElementById('lb-next')?.addEventListener('click', () => openLB((lbIndex + 1) % images.length));
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') openLB((lbIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') openLB((lbIndex + 1) % images.length);
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── Contact / Apply Form — delivered straight to WhatsApp ──
     Every .js-form composes a clean, labelled message from whatever
     the visitor filled in, then opens WhatsApp (app on mobile, Web
     on desktop) with that message pre-filled, ready to send to the
     business number. No backend or API keys required. */
  const WHATSAPP_NUMBER = '923028289709'; /* 0302-8289709 */

  function fieldLabel(el) {
    if (el.dataset.waLabel) return el.dataset.waLabel;
    const prev = el.previousElementSibling;
    if (prev && prev.tagName === 'LABEL') {
      return prev.textContent.replace('*', '').trim();
    }
    if (el.tagName === 'SELECT') return 'Service';
    return el.getAttribute('placeholder') || el.name || 'Field';
  }

  document.querySelectorAll('.js-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.innerHTML;
      const successMsg = form.querySelector('.form-success');
      const errorMsg = form.querySelector('.form-error');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      btn.innerHTML = '<i class="fa fa-circle-notch fa-spin"></i> Preparing…';
      btn.disabled = true;
      if (errorMsg) errorMsg.style.display = 'none';

      const heading = form.dataset.waTitle || 'New Website Enquiry — A.N Power';
      const lines = ['*' + heading + '*', ''];
      const fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(el => {
        if (el.type === 'hidden' || el.type === 'checkbox' || el.type === 'submit' || el.type === 'button') return;
        const value = el.value && el.value.trim();
        if (!value) return;
        lines.push('*' + fieldLabel(el) + ':* ' + value);
      });
      lines.push('', 'Sent from the A.N Power website.');
      const waText = encodeURIComponent(lines.join('\n'));
      const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waText;

      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener');
        btn.innerHTML = '<i class="fa fa-check"></i> Opening WhatsApp…';
        if (successMsg) successMsg.style.display = 'block';
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
          form.reset();
          if (successMsg) successMsg.style.display = 'none';
        }, 4000);
      }, 500);
    });
  });

  /* ── 3D Tilt-on-hover (cards) — skipped on touch devices & reduced-motion ── */
  const canTilt = window.matchMedia('(pointer: fine)').matches &&
                   !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canTilt) {
    const tiltTargets = document.querySelectorAll('.service-card, .project-card, .team-card, .job-card');
    tiltTargets.forEach(el => {
      el.classList.add('tilt-3d');
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ── Particles ────────────────────────────────────────────── */
  const particleContainer = document.querySelector('.particles');
  if (particleContainer) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.6 + 0.2};
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── Lazy load images ─────────────────────────────────────── */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length) {
    const lazyObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          lazyObs.unobserve(e.target);
        }
      });
    });
    lazyImgs.forEach(img => lazyObs.observe(img));
  }
});