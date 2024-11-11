(function() {
  const MAX_DANDELIONS = 90; 
  let currentDandelions = 0;

  function createStars() {
    for(let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 80}vh`; 
      star.style.animationDelay = `${Math.random() * 1}s`;
      document.body.appendChild(star);
    }
  }

  function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.5);
    
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    const colors = ['#ffffff', '#f0f0f0', '#e0e0e0'];
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const angle = (i / 30) * Math.PI * 2;
      const velocity = 100 + Math.random() * 50;
      
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
      particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
      
      firework.appendChild(particle);
    }
    
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
  }

  function releaseSeeds(dandelion) {
    const rect = dandelion.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    
    for(let i = 0; i < 20; i++) {
      const seed = document.createElement('div');
      seed.className = 'floating-seed';
      seed.style.left = centerX + 'px';
      seed.style.top = centerY + 'px';
      
      const angle = (Math.random() * Math.PI/2) - Math.PI/4;
      const distance = 300 + Math.random() * 200;
      
      seed.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      seed.style.setProperty('--ty', (Math.sin(angle) - 1) * distance + 'px');
      
      document.body.appendChild(seed);
      setTimeout(() => seed.remove(), 8000);
    }
  }

  function createDandelion() {
    const dandelion = document.createElement('div');
    dandelion.className = 'dandelion';
    dandelion.innerHTML = `
      <div class="stem"></div>
      <div class="flower-center"></div>
      <div class="seeds-container">
        ${Array(20).fill('<div class="seed"></div>').join('')}
      </div>
    `;
    
    
    const size = 30 + Math.random() * 30;
    dandelion.style.width = `${size}vmin`;
    dandelion.style.height = `${size}vmin`;
    
    
    const xPos = 5 + Math.random() * 90;
    dandelion.style.left = `${xPos}vw`;
    
    
    dandelion.style.zIndex = Math.floor(100 - size);
    
    
    const container = document.querySelector('.dandelion-container') || document.body;
    container.appendChild(dandelion);
    currentDandelions++;
    
    
    dandelion.addEventListener('click', (e) => {
      releaseSeeds(dandelion);
      e.stopPropagation();
    });
    
    return dandelion;
  }

  function createGround() {
    const ground = document.createElement('div');
    ground.className = 'ground';
    ground.innerHTML = `
      <div class="water"></div>
      <div class="vegetation"></div>
    `;
    document.body.appendChild(ground);
  }

  function addNewDandelions() {
    if (currentDandelions < MAX_DANDELIONS) {
      
      createDandelion();
      createDandelion();
      createFirework();
    }
  }

  function init() {
   
    document.querySelectorAll('.star, .dandelion, .floating-seed, .firework, .ground').forEach(el => el.remove());
    currentDandelions = 0;
    
    
    if (!document.querySelector('.dandelion-container')) {
      const container = document.createElement('div');
      container.className = 'dandelion-container';
      document.body.appendChild(container);
    }
    
    
    createGround();
    
    
    createStars();
    
    
    createDandelion();
    
    
    document.body.addEventListener('click', (e) => {
      if (e.target === document.body && currentDandelions < MAX_DANDELIONS) {
        addNewDandelions();
      }
    });
    
  
    setInterval(createFirework, 3000);
  }

 
  window.addEventListener('load', init);
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      init();
    }
  });
})();
