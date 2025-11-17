// script.js - FAWLUX BESPOKE

document.addEventListener('DOMContentLoaded', function() {
  // Loading Spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  
  // Hide loading spinner after page loads
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadingSpinner.classList.add('hidden');
    }, 1000);
  });

  // Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('primary-nav');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Update aria-expanded attribute
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const navAnchors = navLinks.querySelectorAll('a');
    navAnchors.forEach(anchor => {
      anchor.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Testimonials Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevTestimonialBtn = document.querySelector('.prev-testimonial');
  const nextTestimonialBtn = document.querySelector('.next-testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    
    currentTestimonial = index;
  }
  
  // Previous testimonial button
  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', function() {
      let newIndex = currentTestimonial - 1;
      if (newIndex < 0) {
        newIndex = testimonialSlides.length - 1;
      }
      showTestimonial(newIndex);
    });
  }
  
  // Next testimonial button
  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', function() {
      let newIndex = currentTestimonial + 1;
      if (newIndex >= testimonialSlides.length) {
        newIndex = 0;
      }
      showTestimonial(newIndex);
    });
  }
  
  // Testimonial dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showTestimonial(index);
    });
  });
  
  // Auto-rotate testimonials
  let testimonialInterval = setInterval(function() {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonialSlides.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  }, 5000);
  
  // Pause auto-rotation on hover
  const testimonialSlider = document.querySelector('.testimonials-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      testimonialInterval = setInterval(function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) {
          newIndex = 0;
        }
        showTestimonial(newIndex);
      }, 5000);
    });
  }

  // Portfolio Sliders
  const portfolioSliders = document.querySelectorAll('.portfolio-slider');
  
  portfolioSliders.forEach(slider => {
    const slides = slider.querySelectorAll('.portfolio-slide');
    const prevArrow = slider.querySelector('.prev-arrow');
    const nextArrow = slider.querySelector('.next-arrow');
    const dots = slider.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show current slide and activate corresponding dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentSlide = index;
    }
    
    // Previous arrow
    if (prevArrow) {
      prevArrow.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
          newIndex = slides.length - 1;
        }
        showSlide(newIndex);
      });
    }
    
    // Next arrow
    if (nextArrow) {
      nextArrow.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
      });
    }
    
    // Dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showSlide(index);
      });
    });
  });

  // Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
  
  // Intersection Observer for animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // If it's a stat number, animate it
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
});