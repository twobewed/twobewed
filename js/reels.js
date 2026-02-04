(function () {
    const overlay = document.getElementById('reelOverlay');
    const popup = document.getElementById('reelPopup');
    const mount = document.getElementById('reelMount');
    const closeBtn = document.getElementById('reelClose');
  
    if (!overlay || !popup || !mount || !closeBtn) return;
  
    function openEmbed(url) {
      // Inject minimal official embed blockquote
      mount.innerHTML = `
        <blockquote class="instagram-media"
          data-instgrm-permalink="${url}"
          data-instgrm-captioned
          data-instgrm-version="14"></blockquote>
      `;
  
      popup.classList.add('active');
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
  
      // Process AFTER visible
      if (window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process) {
        window.instgrm.Embeds.process();
      }
    }
  
    function closeEmbed() {
      popup.classList.remove('active');
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      mount.innerHTML = '';
    }
  
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-reel-url]');
      if (!trigger) return;
  
      // If click was inside popup itself, ignore
      if (e.target.closest('#reelPopup')) return;
  
      e.preventDefault();
      const url = (trigger.getAttribute('data-reel-url') || '').trim();
      if (!url) return;
  
      openEmbed(url);
    });
  
    overlay.addEventListener('click', closeEmbed);
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeEmbed();
    });
  
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEmbed();
    });
  })();
  