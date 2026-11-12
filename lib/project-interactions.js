// Client-side project interactions: expandable details, galleries and video modal.
import PROJECT_MEDIA from './project-media.js';

export function initProjectInteractions() {
  if (typeof window === 'undefined' || window.__projectInteractionsReady) return;
  window.__projectInteractionsReady = true;
  const M = PROJECT_MEDIA || {};
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const el = (tag, cls, attrs) => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e, attrs || {}); return e; };

  // Project Details toggles
  $$('[data-more]').forEach((btn) => {
    const target = document.getElementById(btn.dataset.more);
    if (!target) return;
    btn.addEventListener('click', () => {
      const open = target.hidden;
      target.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Modal
  const modal = el('div', 'media-modal');
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  const body = el('div', 'mm-body');
  const closeBtn = el('button', 'mm-close', { type: 'button', innerHTML: '&times;' });
  const prevBtn = el('button', 'mm-nav mm-prev', { type: 'button', innerHTML: '&#8249;' });
  const nextBtn = el('button', 'mm-nav mm-next', { type: 'button', innerHTML: '&#8250;' });
  closeBtn.setAttribute('aria-label', 'Close'); prevBtn.setAttribute('aria-label', 'Previous'); nextBtn.setAttribute('aria-label', 'Next');
  modal.append(closeBtn, prevBtn, body, nextBtn);
  document.body.appendChild(modal);

  let list = [], idx = 0, opener = null;
  function show() {
    body.textContent = '';
    const item = list[idx];
    const img = el('img', '', { src: item.src, alt: item.alt || '' });
    body.appendChild(img);
    if (item.caption) body.appendChild(el('p', 'mm-cap', { textContent: item.caption }));
    prevBtn.hidden = nextBtn.hidden = list.length < 2;
  }
  function open(fn) { opener = document.activeElement; fn(); modal.hidden = false; closeBtn.focus(); }
  function close() { modal.hidden = true; body.textContent = ''; if (opener) opener.focus(); }
  function openImages(items, i) { list = items; idx = i || 0; open(show); }
  function openVideo(url) {
    let node;
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) node = el('iframe', '', { src: 'https://www.youtube.com/embed/' + yt[1] + '?autoplay=1', allow: 'autoplay; encrypted-media; picture-in-picture', allowFullscreen: true });
    else if (/facebook\.com|fb\.watch/.test(url)) node = el('iframe', '', { src: 'https://www.facebook.com/plugins/video.php?show_text=false&autoplay=1&href=' + encodeURIComponent(url), allow: 'autoplay; encrypted-media; picture-in-picture', allowFullscreen: true });
    else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) node = el('video', '', { src: url, controls: true, autoplay: true, playsInline: true });
    else { window.open(url, '_blank', 'noopener'); return; }
    prevBtn.hidden = nextBtn.hidden = true;
    open(() => { body.textContent = ''; body.appendChild(node); });
  }
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => { idx = (idx - 1 + list.length) % list.length; show(); });
  nextBtn.addEventListener('click', () => { idx = (idx + 1) % list.length; show(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && !prevBtn.hidden) prevBtn.click();
    else if (e.key === 'ArrowRight' && !nextBtn.hidden) nextBtn.click();
  });

  // Media slots
  Object.keys(M).forEach((key) => {
    const m = M[key] || {};
    const gallery = (m.gallery || []).filter((g) => g && g.src);
    const cover = m.cover || (gallery[0] && gallery[0].src);
    const stage = document.querySelector('[data-stage="' + key + '"]');
    if (stage && (cover || m.video)) {
      stage.textContent = '';
      stage.classList.add('has-media');
      if (cover) stage.appendChild(el('img', '', { src: cover, alt: m.coverAlt || '', loading: 'lazy' }));
      if (m.video) stage.appendChild(el('button', 'play-btn', { type: 'button', innerHTML: '<i class="fas fa-play"></i>', ariaLabel: 'Play demo video' }));
      stage.addEventListener('click', () => (m.video ? openVideo(m.video) : gallery.length && openImages(gallery, 0)));
    }
    const strip = document.querySelector('[data-gallery="' + key + '"]');
    if (strip && gallery.length) {
      strip.textContent = '';
      strip.hidden = false;
      gallery.forEach((g, i) => {
        const b = el('button', '', { type: 'button' });
        b.appendChild(el('img', '', { src: g.src, alt: g.alt || '', loading: 'lazy' }));
        b.addEventListener('click', () => openImages(gallery, i));
        strip.appendChild(b);
      });
    }
    const vBtn = document.querySelector('[data-video="' + key + '"]');
    if (vBtn && m.video) { vBtn.disabled = false; vBtn.removeAttribute('title'); vBtn.addEventListener('click', () => openVideo(m.video)); }
    const gBtn = document.querySelector('[data-open-gallery="' + key + '"]');
    if (gBtn && gallery.length) { gBtn.disabled = false; gBtn.removeAttribute('title'); gBtn.addEventListener('click', () => openImages(gallery, 0)); }
  });
// Connect standalone video buttons (like Previous Resume) to the existing modal system
  $$('[data-open-video]').forEach((btn) => {
    btn.addEventListener('click', () => openVideo(btn.dataset.openVideo));
  });
}
