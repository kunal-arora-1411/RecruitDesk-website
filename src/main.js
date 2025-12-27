import './style.css'

// ==========================================
// RecruitDesk - Premium Interactive Website
// ==========================================

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavbar();
  initParallax();
  initScrollAnimations();
  initCountUp();
  initProgressRing();
  initScoreAnimations();
});

// ==========================================
// Cursor Glow Effect
// ==========================================
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');

  if (!cursorGlow) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hide on mobile
  if (window.innerWidth < 768) {
    cursorGlow.style.display = 'none';
  }
}

// ==========================================
// Navbar Scroll Effect
// ==========================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==========================================
// Parallax Scrolling Effect
// ==========================================
function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');

  if (parallaxSections.length === 0) return;

  // Create parallax elements for each section
  parallaxSections.forEach(section => {
    const speed = parseFloat(section.dataset.speed) || 0.5;
    section.style.setProperty('--parallax-speed', speed);
  });

  let ticking = false;

  function updateParallax() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const speed = parseFloat(section.dataset.speed) || 0.5;

      // Only apply parallax when section is visible
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const yPos = (scrollTop - section.offsetTop) * speed;

        // Apply parallax to background elements
        const bgElements = section.querySelector('.hero-bg-elements, .cta-bg');
        if (bgElements) {
          bgElements.style.transform = `translateY(${yPos * 0.5}px)`;
        }

        // Apply subtle parallax to floating shapes
        const shapes = section.querySelectorAll('.floating-shape, .cta-shape');
        shapes.forEach((shape, index) => {
          const shapeSpeed = speed * (0.3 + index * 0.1);
          shape.style.transform = `translateY(${yPos * shapeSpeed}px)`;
        });

        // Apply parallax to visual content
        const visualContent = section.querySelector('.visual-content');
        if (visualContent) {
          visualContent.style.transform = `translateY(${yPos * 0.15}px)`;
        }
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Initial update
  updateParallax();
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.feature-card, .security-feature, .benefit-card, .report-feature, .score-item'
  );

  if (animatedElements.length === 0) return;

  // Set initial state
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // Section headers animation
  const sectionHeaders = document.querySelectorAll('.section-header, .text-content');

  sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  sectionHeaders.forEach(el => headerObserver.observe(el));
}

// ==========================================
// Count Up Animation for Stats
// ==========================================
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.dataset.count);
        animateCountUp(target, count);
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(el => observer.observe(el));
}

function animateCountUp(element, target) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let frame = 0;

  function update() {
    frame++;
    current = Math.min(Math.ceil(easeOutQuart(frame / steps) * target), target);
    element.textContent = formatNumber(current);

    if (frame < steps) {
      requestAnimationFrame(update);
    }
  }

  update();
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
}

// ==========================================
// Progress Ring Animation
// ==========================================
function initProgressRing() {
  const progressRing = document.querySelector('.progress-ring-fill');

  if (!progressRing) return;

  // Add SVG gradient definition
  const svg = progressRing.closest('svg');
  if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea"/>
        <stop offset="100%" style="stop-color:#764ba2"/>
      </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);
  }

  // Reset animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressRing.style.animation = 'none';
        progressRing.offsetHeight; // Trigger reflow
        progressRing.style.animation = 'progressFill 2s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(progressRing);
}

// ==========================================
// Score Bar Animations
// ==========================================
function initScoreAnimations() {
  const scoreBars = document.querySelectorAll('.bar-fill');

  if (scoreBars.length === 0) return;

  // Reset bars
  scoreBars.forEach(bar => {
    bar.style.transform = 'scaleX(0)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.bar-fill');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
          }, index * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  const scoreBreakdown = document.querySelector('.score-breakdown');
  if (scoreBreakdown) {
    observer.observe(scoreBreakdown);
  }
}

// ==========================================
// Mobile Menu
// ==========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

// ==========================================
// Smooth Reveal on Scroll
// ==========================================
function reveal() {
  const reveals = document.querySelectorAll('[data-aos]');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ==========================================
// Typing Animation for Demo
// ==========================================
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing');

  typingElements.forEach(el => {
    // Add infinite typing animation
    el.classList.add('typing-active');
  });
}

initTypingAnimation();

// ==========================================
// Button Ripple Effect
// ==========================================
document.querySelectorAll('.primary-btn, .secondary-btn, .cta-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
          width: 200px;
          height: 200px;
          margin-left: -100px;
          margin-top: -100px;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ==========================================
// Preloader (Optional Enhancement)
// ==========================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Trigger initial animations
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.15}s`;
  });
});

console.log('🎯 RecruitDesk - Your AI-Powered Interview Practice Companion');
