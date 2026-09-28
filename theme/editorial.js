(function(){'use strict';
 const root=new URL('../',document.currentScript.src);
 function init(){
  const bar=document.getElementById('mdbook-menu-bar');
  if(bar){const right=bar.querySelector('.right-buttons');if(right&&!right.querySelector('.school-brand')){const brand=document.createElement('a');brand.className='school-brand';brand.href='https://design.hnu.edu.cn/';brand.target='_blank';brand.rel='noopener noreferrer';brand.title='湖南大学设计学院';const img=document.createElement('img');img.src=new URL('images/hnusd-logo.png',root).href;img.alt='湖南大学设计学院 · School of Design, Hunan University';brand.append(img);right.append(brand);}}
  if(document.querySelector('.book-home')){
   const ending=document.createElement('section');ending.className='immersive-ending';ending.innerHTML='<p>设计艺术的含义 · 赵江洪 著</p><h2>现在，翻开第一篇。</h2><a href="preface.html">从前言开始 <span aria-hidden="true">→</span></a>';document.querySelector('main').append(ending);
   const foot=document.createElement('footer');foot.className='editorial-colophon';foot.innerHTML='<span>设计艺术的含义 / The Meaning of Design</span><span>赵江洪 著 · 湖南大学出版社 · 1999</span>';document.querySelector('main').append(foot);
  }
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!reduce.matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-once');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reading-intro,.book-explore-by__item,.book-explore__intro,.immersive-ending,.concept-node,.timeline-stage__body').forEach(e=>observer.observe(e));reduce.addEventListener('change',()=>{if(reduce.matches)observer.disconnect()});}
  const book=document.querySelector('.book-object');if(book)book.addEventListener('animationend',()=>{book.style.animation='none'},{once:true});
  let scheduled=false;function paint(){document.body.classList.toggle('has-scrolled',window.scrollY>12);scheduled=false}window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(paint)}},{passive:true});paint();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
