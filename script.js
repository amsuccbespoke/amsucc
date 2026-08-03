// ===== THEME MANAGEMENT - ALWAYS FOLLOW DEVICE THEME =====

// Function to apply theme based on device preference
function applyDeviceTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'white';
  
  // Apply theme to HTML
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update theme switcher button
  const themeSwitcher = document.getElementById('themeSwitcher');
  if (themeSwitcher) {
    themeSwitcher.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

// Listen for device theme changes (LIVE UPDATES!)
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// This fires whenever user changes their device theme
darkModeMediaQuery.addEventListener('change', function(e) {
  applyDeviceTheme();
});

// Apply theme on page load
document.addEventListener('DOMContentLoaded', applyDeviceTheme);

// Also apply immediately if script runs after DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  applyDeviceTheme();
}

// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  if(burger && nav){
    burger.addEventListener('click', (e)=>{
      e.stopPropagation();
      nav.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if(!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking on a link
    nav.addEventListener('click', (e) => {
      if(e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== THEME SWITCHER - Manual override (resets on refresh) =====
  const themeSwitcher = document.getElementById('themeSwitcher');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'white' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      themeSwitcher.setAttribute('aria-label', 
        newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }
});

// ===== SCROLL ANIMATIONS =====
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

// Run on load and scroll
window.addEventListener('load', fadeInOnScroll);
window.addEventListener('scroll', fadeInOnScroll);

// ===== LOADING SPINNER =====
window.addEventListener('load', function() {
  const spinner = document.getElementById('loading-spinner');
  setTimeout(() => {
    if (spinner) {
      spinner.classList.add('hidden');
    }
  }, 1000);
});

// ===== BACK TO TOP BUTTON =====
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

// ===== ANIMATED STATISTICS COUNTER =====
function animateCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.ceil(current) + (stat.getAttribute('data-target') === '98' ? '%' : '+');
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target + (stat.getAttribute('data-target') === '98' ? '%' : '+');
        stat.classList.add('animated');
      }
    };

    updateCounter();
  });
}

// Intersection Observer to trigger animation when visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== PORTFOLIO SLIDERS =====
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

    // Touch support for mobile
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

// ===== TESTIMONIALS SLIDER =====
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

// ===== GOOGLE BUSINESS INTEGRATION =====
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

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  initPortfolioSliders();
  initTestimonialsSlider();
  initGoogleBusiness();

  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    setTimeout(() => {
      spinner.classList.add('hidden');
    }, 1000);
  }
});

// ===== ENHANCED ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Script error:', e.error);
});

// ===== HERO SLIDER =====
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  let currentSlide = 0;
  let slideInterval;
  const autoPlayDelay = 5000;

  if (!slides.length) return;

  slides.forEach(slide => {
    slide.style.animation = 'none';
    slide.style.opacity = '';
    slide.style.zIndex = '';
  });

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  const slider = document.querySelector('.hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    }
  });

  showSlide(0);
  startAutoPlay();
});

// ===== PRODUCT SLIDER =====
function initProductSliders() {
  const sliders = document.querySelectorAll('.product-slider');

  sliders.forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = track.querySelectorAll('.product-card');
    const dotsContainer = slider.parentElement.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.prev-slide');
    const nextBtn = slider.querySelector('.next-slide');

    if (!slides.length) return;

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    let maxIndex = Math.max(0, totalSlides - slidesPerView);

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      const totalDots = Math.ceil(totalSlides / slidesPerView);
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToSlide(i * slidesPerView));
        dotsContainer.appendChild(dot);
      }
    }

    function getSlidesPerView() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    }

    function updateSlides() {
      slidesPerView = getSlidesPerView();
      maxIndex = Math.max(0, totalSlides - slidesPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateSlider();
    }

    function updateSlider() {
      const slideWidth = slides[0].offsetWidth + 20; // + gap
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Update active states
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i >= currentIndex && i < currentIndex + slidesPerView);
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        const activeDot = Math.floor(currentIndex / slidesPerView);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeDot);
        });
      }
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateSlider();
    }

    function nextSlide() {
      if (currentIndex + slidesPerView < totalSlides) {
        goToSlide(currentIndex + slidesPerView);
      } else {
        goToSlide(0);
      }
    }

    function prevSlide() {
      if (currentIndex - slidesPerView >= 0) {
        goToSlide(currentIndex - slidesPerView);
      } else {
        goToSlide(maxIndex);
      }
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSlides, 200);
    });

    // Initial update
    setTimeout(updateSlides, 100);
  });
}

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('fawlux-cart')) || [];

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
    badge.classList.toggle('hidden', total === 0);
  }
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.code}</p>
      </div>
      <button class="cart-item-remove" data-index="${index}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');

  // Remove buttons
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem('fawlux-cart', JSON.stringify(cart));
      renderCart();
      updateCartBadge();
    });
  });
}

function addToCart(productCode, productName, productImage) {
  const existing = cart.find(item => item.code === productCode);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      code: productCode,
      name: productName,
      image: productImage,
      quantity: 1
    });
  }
  localStorage.setItem('fawlux-cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
  
  // Open cart modal
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.add('open');
}

// ===== CART EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.product-card');
      const code = this.dataset.code;
      const name = card.dataset.name;
      const image = card.dataset.image;
      
      addToCart(code, name, image);
    });
  });

  // Cart icon toggle
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const cartClose = document.getElementById('cartClose');

  if (cartIcon && cartModal) {
    cartIcon.addEventListener('click', () => {
      cartModal.classList.toggle('open');
      renderCart();
    });
  }

  if (cartClose && cartModal) {
    cartClose.addEventListener('click', () => {
      cartModal.classList.remove('open');
    });
  }

  // Close modal on outside click
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('open');
      }
    });
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) return;
      
      let message = 'Hello FAWLUX! I\'d like to order:\n\n';
      cart.forEach(item => {
        message += `• ${item.name} (${item.code}) x${item.quantity}\n`;
      });
      message += '\n\nPlease let me know the total cost and delivery options.';
      
      const phone = '2348079444199';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  // Initial render
  updateCartBadge();
  renderCart();

  // Initialize sliders
  initProductSliders();
});