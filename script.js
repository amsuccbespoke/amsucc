// Theme Management
function initTheme() {
  const themeSwitcher = document.getElementById('themeSwitcher');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const savedTheme = localStorage.getItem('fawlux-theme');
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'white');

  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeSwitcher) {
    themeSwitcher.setAttribute('aria-label', 
      currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'white' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('fawlux-theme', newTheme);

  const themeSwitcher = document.getElementById('themeSwitcher');
  if (themeSwitcher) {
    themeSwitcher.setAttribute('aria-label', 
      newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

// Mobile Navigation
function initMobileNav() {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  if(burger && nav){
    burger.addEventListener('click', (e)=>{
      e.stopPropagation();
      nav.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });

    document.addEventListener('click', (e) => {
      if(!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    nav.addEventListener('click', (e) => {
      if(e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
      element.classList.add('visible');
    } else if (elementBottom < 0 || elementTop > window.innerHeight) {
      element.classList.remove('visible');
    }
  });
};

// Loading Spinner
function initLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    // Show spinner for minimum 500ms to prevent flash
    setTimeout(() => {
      spinner.classList.add('hidden');
    }, 500);
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (backToTopButton) {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
  });

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Animated Statistics Counter - FIXED VERSION
function animateCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    if (stat.classList.contains('animated')) return;

    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const startTime = Date.now();
    const suffix = stat.getAttribute('data-target') === '98' ? '%' : '+';

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      
      const current = Math.floor(easeOutQuad * target);
      stat.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target + suffix;
        stat.classList.add('animated');
      }
    };

    updateCounter();
  });
}

// Portfolio Sliders
function initPortfolioSliders() {
  const sliders = document.querySelectorAll('.portfolio-slider');

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.portfolio-slide');
    const dots = slider.querySelectorAll('.dot');
    const prevArrow = slider.querySelector('.prev-arrow');
    const nextArrow = slider.querySelector('.next-arrow');

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      currentSlide = (n + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    if (nextArrow) {
      nextArrow.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevArrow) {
      prevArrow.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
      });
    });

    startAutoSlide();

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  });
}

// Testimonials Slider
function initTestimonialsSlider() {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevTestimonial = document.querySelector('.prev-testimonial');
  const nextTestimonial = document.querySelector('.next-testimonial');

  if (!testimonialSlides.length) return;

  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(n) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides[currentTestimonial].classList.add('active');
    if (testimonialDots[currentTestimonial]) {
      testimonialDots[currentTestimonial].classList.add('active');
    }
  }

  function nextTestimonialSlide() {
    showTestimonial(currentTestimonial + 1);
  }

  function prevTestimonialSlide() {
    showTestimonial(currentTestimonial - 1);
  }

  function startTestimonialAutoSlide() {
    testimonialInterval = setInterval(nextTestimonialSlide, 5000);
  }

  function stopTestimonialAutoSlide() {
    clearInterval(testimonialInterval);
  }

  if (nextTestimonial) {
    nextTestimonial.addEventListener('click', () => {
      stopTestimonialAutoSlide();
      nextTestimonialSlide();
      startTestimonialAutoSlide();
    });
  }

  if (prevTestimonial) {
    prevTestimonial.addEventListener('click', () => {
      stopTestimonialAutoSlide();
      prevTestimonialSlide();
      startTestimonialAutoSlide();
    });
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopTestimonialAutoSlide();
      showTestimonial(index);
      startTestimonialAutoSlide();
    });
  });

  startTestimonialAutoSlide();

  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', stopTestimonialAutoSlide);
    testimonialSlider.addEventListener('mouseleave', startTestimonialAutoSlide);
  }
}

// Google Business Integration
function initGoogleBusiness() {
  const contactTopRow = document.querySelector('.contact-top-row');
  if (contactTopRow && window.location.pathname.includes('contact.html')) {
    const businessHoursHTML = `
      <div class="business-hours">
        <h4>Business Hours</h4>
        <ul class="hours-list">
          <li><span>Monday - Friday</span> <span>9:00 AM - 7:00 PM</span></li>
          <li><span>Saturday</span> <span>9:00 AM - 6:00 PM</span></li>
          <li class="closed"><span>Sunday</span> <span>Closed</span></li>
        </ul>
      </div>
    `;

    const contactCard = contactTopRow.querySelector('.contact-card:last-child');
    if (contactCard) {
      contactCard.insertAdjacentHTML('beforeend', businessHoursHTML);
    }
  }
}

// Lazy Image Loading
function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
}

// Contact Form Validation
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    const phone = document.getElementById('phone');
    const name = document.getElementById('name');
    
    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
    if (phone && !phoneRegex.test(phone.value.replace(/\s/g, ''))) {
      e.preventDefault();
      alert('Please enter a valid Nigerian phone number (e.g., 08079444199)');
      phone.focus();
      return false;
    }
    
    if (name && name.value.trim().length < 2) {
      e.preventDefault();
      alert('Please enter your full name');
      name.focus();
      return false;
    }
    
    return true;
  });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initMobileNav();
  initLoadingSpinner();
  initBackToTop();
  initPortfolioSliders();
  initTestimonialsSlider();
  initGoogleBusiness();
  initLazyImages();
  initContactForm();
  
  // Theme switcher
  const themeSwitcher = document.getElementById('themeSwitcher');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', toggleTheme);
  }

  // Fade animations
  window.addEventListener('load', fadeInOnScroll);
  window.addEventListener('scroll', fadeInOnScroll);
  
  // Stats counter observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
      }
    });
  }, { 
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });

  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    statsObserver.observe(item);
  });
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('Script error:', e.error);
});