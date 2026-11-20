(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var style = document.createElement('style');
  style.textContent =
    '.scroll-progress{position:fixed;inset:0 auto auto 0;width:100%;height:3px;z-index:1000;background:linear-gradient(90deg,#f3a93a,#d8613a);transform:scaleX(0);transform-origin:left center;pointer-events:none}' +
    '.back-to-top{position:fixed;right:1.25rem;bottom:1.25rem;z-index:100;display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,243,232,.4);border-radius:50%;background:#2a1830;color:#fbf3e8;font:inherit;font-size:1.4rem;line-height:1;box-shadow:0 8px 24px rgba(34,22,31,.2);opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .25s,transform .25s,background .25s;cursor:pointer}' +
    '.back-to-top.is-visible{opacity:1;transform:translateY(0);pointer-events:auto}' +
    '.back-to-top:hover{background:#3d2445}' +
    '.back-to-top:focus-visible{outline:3px solid #f3a93a;outline-offset:3px}' +
    '.has-reveal .rev{transition-delay:var(--entry-delay,0ms)}' +
    '.tile.rev.in .ic{animation-delay:var(--entry-delay,0ms)}' +
    '@media(max-width:600px){.back-to-top{right:1rem;bottom:calc(1rem + env(safe-area-inset-bottom,0px))}}' +
    '@media(prefers-reduced-motion:reduce){.back-to-top{transition:none;transform:none}.has-reveal .rev{transition-delay:0ms!important}.tile.rev.in .ic{animation-delay:0ms!important}}';
  document.head.appendChild(style);

  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.textContent = '↑';
  document.body.appendChild(backToTop);

  var queued = false;

  function updateScrollEffects() {
    queued = false;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var amount = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
    progress.style.transform = 'scaleX(' + amount + ')';
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }

  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(updateScrollEffects);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateScrollEffects();

  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  });

  if (!reduceMotion.matches) {
    [
      document.querySelectorAll('.grid .ph'),
      document.querySelectorAll('.tiles .tile')
    ].forEach(function (group) {
      group.forEach(function (element, index) {
        element.style.setProperty('--entry-delay', Math.min(index * 90, 450) + 'ms');
      });
    });
  }
})();
