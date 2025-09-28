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

    // Close menu when clicking on a link (optional)
    nav.addEventListener('click', (e) => {
      if(e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});