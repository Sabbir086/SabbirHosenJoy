// Client-only interactions retained from the original portfolio and adapted for Next.js.
export function initPortfolioInteractions() {
  if (typeof window === 'undefined' || window.__portfolioInteractionsReady) return;
  window.__portfolioInteractionsReady = true;

// --- Loader Removal ---
const loader = document.getElementById('loader');
if (loader) {
  loader.style.opacity = '0';
  setTimeout(() => { loader.style.display = 'none'; }, 500);
}

// --- Navbar Effects ---
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navMore = document.getElementById('navMore');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute('id');
  });
  let moreActive = false;
  navLinks.forEach(l => {
    const isActive = l.getAttribute('href') === '#' + current;
    l.classList.toggle('active', isActive);
    if (isActive && navMore && navMore.contains(l)) moreActive = true;
  });
  if (navMore) navMore.classList.toggle('has-active', moreActive);
}, { passive: true });

// --- Nav "More" dropdown ---
const navMoreToggle = document.getElementById('navMoreToggle');
if (navMore && navMoreToggle) {
  const setMore = (open) => {
    navMore.classList.toggle('open', open);
    navMoreToggle.setAttribute('aria-expanded', String(open));
  };
  navMoreToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMore(!navMore.classList.contains('open'));
  });
  document.addEventListener('click', (e) => { if (!navMore.contains(e.target)) setMore(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMore(false); });
  navMore.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => setMore(false)));
}

const navToggle = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');
if (navToggle && navLinksList) navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});
if (navLinksList) document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// --- High-Performance Scroll Reveal (Staggered) ---
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const children = entry.target.querySelectorAll('.stagger-child');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 120);
      });
      if (entry.target.classList.contains('stagger-child')) {
        entry.target.classList.add('visible');
      }
      observer.unobserve(entry.target);
    }
  });
};

const hasIntersectionObserver = 'IntersectionObserver' in window;
const revealObserver = hasIntersectionObserver ? new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) : null;
const tallRevealObserver = hasIntersectionObserver ? new IntersectionObserver(revealCallback, { threshold: 0, rootMargin: '0px 0px -50px 0px' }) : null;

document.querySelectorAll('.reveal-on-scroll:not([data-reveal="early"]), .experience-section').forEach(el => {
  if (revealObserver) revealObserver.observe(el); else el.classList.add('visible');
});
document.querySelectorAll('[data-reveal="early"]').forEach(el => { if (tallRevealObserver) tallRevealObserver.observe(el); else el.classList.add('visible'); });

const itemRevealObserver = hasIntersectionObserver ? new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }) : null;
document.querySelectorAll('.reveal-item').forEach(el => { if (itemRevealObserver) itemRevealObserver.observe(el); else el.classList.add('visible'); });

// --- Subtle 3D Tilt Effect for Project/CP Cards ---
const isMobile = window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isMobile && !prefersReducedMotion) {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3; 
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
    });
  });
}

// --- Cinematic Deep Space Background (High Performance) ---
const canvas = document.getElementById('cinematicBgCanvas');
if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  const numStars = isMobile ? 80 : 200;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.2,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.1,
      glow: Math.random() > 0.8
    };
  }

  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }

  let time = 0;

  function animateCinematicBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    time += 0.002;
    const orbX = canvas.width * 0.5 + Math.sin(time) * (canvas.width * 0.2);
    const orbY = canvas.height * 0.5 + Math.cos(time * 0.8) * (canvas.height * 0.2);
    
    const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, canvas.width > 768 ? 600 : 300);
    gradient.addColorStop(0, 'rgba(16, 153, 103, 0.055)');
    gradient.addColorStop(1, 'rgba(240, 249, 244, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(s => {
      s.x += s.speedX;
      s.y += s.speedY;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
      
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      
      if (s.glow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#119768';
        ctx.fillStyle = `rgba(75, 190, 143, ${s.opacity})`;
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(17, 151, 104, ${s.opacity})`;
      }
      ctx.fill();
    });
    requestAnimationFrame(animateCinematicBg);
  }
  animateCinematicBg();
}

// --- Award Photography Showcase Integration ---
const initAwardShowcase = () => {
  const mainImg = document.getElementById('awardMainImg');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  if (!mainImg || thumbBtns.length === 0) return;

  let currentIndex = 0;
  let slideshowInterval;

  const updateImage = (index) => {
    thumbBtns.forEach(btn => btn.classList.remove('active'));
    thumbBtns[index].classList.add('active');
    
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = thumbBtns[index].dataset.src;
      mainImg.alt = thumbBtns[index].dataset.alt || 'Award Photo';
      mainImg.style.opacity = '1';
    }, 300);
    currentIndex = index;
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % thumbBtns.length;
    updateImage(nextIndex);
  };

  const startSlideshow = () => {
    slideshowInterval = setInterval(nextImage, 4000); // 4 second auto-rotation
  };

  const resetSlideshow = () => {
    clearInterval(slideshowInterval);
    startSlideshow();
  };

  thumbBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateImage(index);
      resetSlideshow(); // Pause and restart rotation on manual interaction
    });
  });

  // Start the slideshow immediately
  startSlideshow();
};

initAwardShowcase();


// --- Video Introduction: autoplays (muted) when it scrolls into view ---
// Browsers block autoplay WITH sound until the visitor interacts with the page,
// so it starts muted and switches the sound on at the first click / tap / key press.
// A visible "Tap to unmute" button is also shown. Reduced-motion users keep click-to-play.
(() => {
  const box = document.querySelector('.video-facade');
  if (!box) return;
  const ytId = box.dataset.yt;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originParam = /^https?:$/.test(location.protocol)
    ? '&origin=' + encodeURIComponent(location.origin) : '';

  let iframe = null;
  let unmuteBtn = null;
  let started = false;
  let muted = true;
  let interacted = false;

  const send = (func, args) => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*');
    }
  };

  const unmute = () => {
    if (!iframe || !muted) return;
    muted = false;
    send('unMute');
    send('setVolume', [100]);
    send('playVideo');
    if (unmuteBtn) unmuteBtn.hidden = true;
  };

  const startVideo = (withSound) => {
    if (started) return;
    started = true;
    muted = !withSound;
    iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + ytId +
      '?autoplay=1&rel=0&playsinline=1&enablejsapi=1' + (withSound ? '' : '&mute=1') + originParam;
    iframe.title = 'Video Introduction';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('frameborder', '0');
    box.textContent = '';
    box.appendChild(iframe);
    if (!withSound) {
      unmuteBtn = document.createElement('button');
      unmuteBtn.type = 'button';
      unmuteBtn.className = 'video-unmute';
      unmuteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i> Tap to unmute';
      unmuteBtn.addEventListener('click', unmute);
      box.appendChild(unmuteBtn);
    }
  };

  // First interaction anywhere on the page turns the sound on
  const onFirstInteraction = () => {
    interacted = true;
    unmute();
    ['pointerdown', 'touchstart', 'keydown'].forEach(evt => window.removeEventListener(evt, onFirstInteraction));
  };
  ['pointerdown', 'touchstart', 'keydown'].forEach(evt =>
    window.addEventListener(evt, onFirstInteraction, { passive: true }));

  // Manual play (also the fallback for reduced-motion users): start with sound
  const facadeBtn = box.querySelector('.video-facade-btn');
  if (facadeBtn) facadeBtn.addEventListener('click', () => startVideo(true));

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  // Autoplay when at least half of the video is visible; pause when it scrolls away
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= 0.5 && !started) startVideo(interacted);
      else if (entry.intersectionRatio < 0.1 && started) send('pauseVideo');
    });
  }, { threshold: [0, 0.1, 0.5] });
  io.observe(box);
})();

// --- Achievements: category filter + "Show all" ---
(() => {
  const list = document.getElementById('achList');
  const toggle = document.getElementById('achToggle');
  const filters = document.querySelectorAll('.ach-filter');
  if (!list || !toggle) return;
  const rows = Array.from(list.querySelectorAll('.award-row'));
  const LIMIT = 10;
  let cat = 'all';
  let expanded = false;

  const render = () => {
    const matches = rows.filter(r => cat === 'all' || r.dataset.cat === cat);
    rows.forEach(r => { r.hidden = true; });
    matches.forEach((r, i) => { r.hidden = !(expanded || i < LIMIT); });
    if (matches.length > LIMIT) {
      toggle.hidden = false;
      toggle.innerHTML = expanded
        ? '<i class="fas fa-chevron-up"></i> Show less'
        : '<i class="fas fa-chevron-down"></i> Show all ' + matches.length + ' awards';
    } else {
      toggle.hidden = true;
    }
  };

  filters.forEach(btn => btn.addEventListener('click', () => {
    cat = btn.dataset.filter;
    expanded = false;
    filters.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    render();
  }));

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (!expanded) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
})();

}
