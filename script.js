
document.addEventListener('DOMContentLoaded',()=>{
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });
  }
});
