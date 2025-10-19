document.addEventListener('DOMContentLoaded',()=>{
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
});

// ===== IMPROVED SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const elementVisible = 150;
    
    // Add visible when entering viewport, remove when completely gone
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

// Loading Spinner
window.addEventListener('load', function() {
  const spinner = document.getElementById('loading-spinner');
  setTimeout(() => {
    spinner.classList.add('hidden');
  }, 1000); // Shows for 1 second
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});