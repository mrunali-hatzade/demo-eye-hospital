/* =============================================
   VisionCare Eye Hospital – JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────
  // 0. PRELOADER & ENTRY EFFECTS
  // ──────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  
  // Setup word-by-word animation for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    let delay = 0;
    // Process child nodes — wrap plain text words individually,
    // but treat special elements (like .gradient-text) as whole animated units
    function wrapWords(node) {
      const result = document.createDocumentFragment();
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const words = child.textContent.split(/(\s+)/);
          words.forEach(part => {
            if (part.trim() === '') {
              result.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'word';
              span.style.animationDelay = `${delay}s`;
              span.textContent = part;
              result.appendChild(span);
              delay += 0.08;
            }
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.tagName === 'BR') {
            result.appendChild(child.cloneNode());
          } else if (child.classList.contains('gradient-text')) {
            // Animate the entire gradient-text span as one block
            const clone = child.cloneNode(true);
            clone.classList.add('word');
            clone.style.animationDelay = `${delay}s`;
            result.appendChild(clone);
            delay += 0.08;
          } else {
            const clone = child.cloneNode(false);
            const innerFragment = wrapWords(child);
            clone.appendChild(innerFragment);
            result.appendChild(clone);
          }
        }
      });
      return result;
    }
    const wrapped = wrapWords(heroTitle);
    heroTitle.innerHTML = '';
    heroTitle.appendChild(wrapped);
  }
  
  // We use window.onload to ensure all assets (like images) are fully loaded
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        document.body.classList.add('loaded');
        preloader.remove();
      }, 300); // Shorter fade-out transition
    } else {
      document.body.classList.add('loaded');
    }
  });

  // Fallback in case window.load doesn't fire (e.g. cached pages)
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      document.body.classList.add('loaded');
      setTimeout(() => preloader.remove(), 300);
    } else if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
  }, 1500); // Trigger fallback much faster

  // ──────────────────────────────────────────
  // 1. NAVBAR – scroll effect & active links
  // ──────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top visibility
    const btt = document.getElementById('back-to-top');
    if (window.scrollY > 400) btt.classList.add('visible');
    else btt.classList.remove('visible');

    // Active nav link highlight
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click (including mobile-only CTAs)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  function updateActiveNavLink() {
    const sections  = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 80;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ──────────────────────────────────────────
  // 2. HERO PARTICLES
  // ──────────────────────────────────────────
  const particleContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 50;

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
    `;

    // Randomize colors
    const colors = ['#ffffff', '#bfdbfe', '#93c5fd', '#e0f2fe', '#7dd3fc'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    particleContainer.appendChild(p);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

  // ──────────────────────────────────────────
  // 3. STAT COUNTER ANIMATION
  // ──────────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const heroSection = document.querySelector('.hero');
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      statsAnimated = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString();
          if (current >= target) clearInterval(timer);
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run on load too

  // ──────────────────────────────────────────
  // 4. AOS – ANIMATE ON SCROLL (custom impl)
  // ──────────────────────────────────────────
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  initAOS();

  // ──────────────────────────────────────────
  // 5. TESTIMONIAL SLIDER
  // ──────────────────────────────────────────
  const track     = document.getElementById('testimonial-track');
  const cards     = track.querySelectorAll('.testimonial-card');
  const dotsWrap  = document.getElementById('slider-dots');
  const prevBtn   = document.getElementById('prev-btn');
  const nextBtn   = document.getElementById('next-btn');

  let currentSlide  = 0;
  let slidesPerView = getSlidesPerView();
  let totalSlides   = Math.ceil(cards.length / slidesPerView);
  let autoSlideTimer;

  function getSlidesPerView() {
    if (window.innerWidth < 641) return 1;
    if (window.innerWidth < 901) return 2;
    return 3;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    totalSlides = Math.ceil(cards.length / slidesPerView);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === currentSlide ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goToSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap
    track.style.transform = `translateX(-${currentSlide * cardWidth * slidesPerView}px)`;
    updateDots();
    resetAutoSlide();
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  buildDots();
  startAutoSlide();

  window.addEventListener('resize', () => {
    const newSPV = getSlidesPerView();
    if (newSPV !== slidesPerView) {
      slidesPerView = newSPV;
      currentSlide  = 0;
      track.style.transform = 'translateX(0)';
      buildDots();
    }
  });

  // ──────────────────────────────────────────
  // 6. APPOINTMENT FORM
  // ──────────────────────────────────────────
  const form        = document.getElementById('appointment-form');
  const successMsg  = document.getElementById('form-success');
  const submitBtn   = document.getElementById('submit-btn');

  // Open the booking form as an on-screen window instead of navigating away.
  const appointmentWindow = document.getElementById('appointment');
  const appointmentClose = document.getElementById('appointment-close');

  function openAppointmentWindow() {
    appointmentWindow.classList.add('is-open');
    appointmentWindow.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-open');
    setTimeout(() => document.getElementById('patient-name')?.focus(), 100);
  }

  function closeAppointmentWindow() {
    appointmentWindow.classList.remove('is-open');
    appointmentWindow.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-open');
  }

  document.querySelectorAll('a[href="#appointment"]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openAppointmentWindow();
      navLinks?.classList.remove('active');
      hamburger?.classList.remove('active');
    });
  });

  appointmentClose?.addEventListener('click', closeAppointmentWindow);
  appointmentWindow?.addEventListener('click', (e) => {
    if (e.target === appointmentWindow) closeAppointmentWindow();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentWindow?.classList.contains('is-open')) {
      closeAppointmentWindow();
    }
  });

  // Set min date to today
  const dateInput = document.getElementById('apt-date');
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) dateInput.min = today;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('#patient-name').value.trim();
    const phone = form.querySelector('#patient-phone').value.trim();
    const svc   = form.querySelector('#service-select').value;

    if (!name || !phone || !svc) {
      shakeForm();
      return;
    }

    // Simulate submission
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      successMsg.classList.add('show');
      submitBtn.querySelector('.btn-text').textContent = 'Confirm Appointment';
      submitBtn.disabled = false;

      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 6000);
    }, 1500);
  });

  function shakeForm() {
    const formWrap = document.querySelector('.apt-form-wrap');
    formWrap.style.animation = 'none';
    formWrap.offsetHeight; // reflow
    formWrap.style.animation = 'shake 0.4s ease';
    setTimeout(() => { formWrap.style.animation = ''; }, 400);
  }

  // Shake animation
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ──────────────────────────────────────────
  // 7. BACK TO TOP
  // ──────────────────────────────────────────
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────
  // 8. SMOOTH SCROLL for anchor links
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#appointment') return;
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ──────────────────────────────────────────
  // 9. HERO SCROLL INDICATOR
  // ──────────────────────────────────────────
  const heroScroll = document.getElementById('hero-scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const services = document.getElementById('services');
      if (services) services.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ──────────────────────────────────────────
  // 10. SERVICE CARD RIPPLE EFFECT
  // ──────────────────────────────────────────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 60%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `;

      const rippleStyle = document.createElement('style');
      rippleStyle.textContent = `
        @keyframes ripple-expand {
          to { width: 400px; height: 400px; opacity: 0; }
        }
      `;
      if (!document.getElementById('ripple-style')) {
        rippleStyle.id = 'ripple-style';
        document.head.appendChild(rippleStyle);
      }

      this.style.position = 'relative';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ──────────────────────────────────────────
  // 11. TECH CARD GLOW ON HOVER
  // ──────────────────────────────────────────
  document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.backgroundImage = `
        radial-gradient(circle at ${x}% ${y}%, rgba(0,198,255,0.07) 0%, transparent 60%),
        linear-gradient(135deg, rgba(13,26,53,0.6) 0%, rgba(6,13,31,0.95) 100%)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });

  // ──────────────────────────────────────────
  // 12. NAVBAR glow on scroll position
  // ──────────────────────────────────────────
  function updateNavGlow() {
    const progress = Math.min(window.scrollY / 400, 1);
    navbar.style.setProperty('--nav-glow', `rgba(0, 114, 255, ${progress * 0.05})`);
  }

  window.addEventListener('scroll', updateNavGlow);

  // ──────────────────────────────────────────
  // 13. INPUT LABEL FLOAT EFFECT
  // ──────────────────────────────────────────
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // ──────────────────────────────────────────
  // 14. DOCTOR CARD - hover tilt effect
  // ──────────────────────────────────────────
  document.querySelectorAll('.doctor-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  console.log('✅ VisionCare Eye Hospital website loaded successfully!');
});
