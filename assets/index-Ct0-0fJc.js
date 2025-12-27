(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{y(),b(),v(),x(),w(),q(),k()});function y(){const t=document.querySelector(".cursor-glow");if(!t)return;let n=0,r=0,s=0,e=0;document.addEventListener("mousemove",a=>{n=a.clientX,r=a.clientY});function o(){s+=(n-s)*.1,e+=(r-e)*.1,t.style.left=s+"px",t.style.top=e+"px",requestAnimationFrame(o)}o(),window.innerWidth<768&&(t.style.display="none")}function b(){const t=document.querySelector(".navbar");if(!t)return;let n=0;window.addEventListener("scroll",()=>{const r=window.pageYOffset;r>50?t.classList.add("scrolled"):t.classList.remove("scrolled"),r>n&&r>100?t.style.transform="translateY(-100%)":t.style.transform="translateY(0)",n=r}),document.querySelectorAll('a[href^="#"]').forEach(r=>{r.addEventListener("click",function(s){s.preventDefault();const e=document.querySelector(this.getAttribute("href"));e&&e.scrollIntoView({behavior:"smooth",block:"start"})})})}function v(){const t=document.querySelectorAll(".parallax-section");if(t.length===0)return;t.forEach(s=>{const e=parseFloat(s.dataset.speed)||.5;s.style.setProperty("--parallax-speed",e)});let n=!1;function r(){const s=window.pageYOffset,e=window.innerHeight;t.forEach(o=>{const a=o.getBoundingClientRect(),i=parseFloat(o.dataset.speed)||.5;if(a.bottom>0&&a.top<e){const l=(s-o.offsetTop)*i,d=o.querySelector(".hero-bg-elements, .cta-bg");d&&(d.style.transform=`translateY(${l*.5}px)`),o.querySelectorAll(".floating-shape, .cta-shape").forEach((p,g)=>{const h=i*(.3+g*.1);p.style.transform=`translateY(${l*h}px)`});const u=o.querySelector(".visual-content");u&&(u.style.transform=`translateY(${l*.15}px)`)}}),n=!1}window.addEventListener("scroll",()=>{n||(requestAnimationFrame(r),n=!0)}),r()}function x(){const t=document.querySelectorAll(".feature-card, .security-feature, .benefit-card, .report-feature, .score-item");if(t.length===0)return;t.forEach((e,o)=>{e.style.opacity="0",e.style.transform="translateY(40px)",e.style.transition=`opacity 0.6s ease ${o*.1}s, transform 0.6s ease ${o*.1}s`});const n=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&(o.target.style.opacity="1",o.target.style.transform="translateY(0)",n.unobserve(o.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});t.forEach(e=>n.observe(e));const r=document.querySelectorAll(".section-header, .text-content");r.forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.8s ease, transform 0.8s ease"});const s=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&(o.target.style.opacity="1",o.target.style.transform="translateY(0)",s.unobserve(o.target))})},{threshold:.2});r.forEach(e=>s.observe(e))}function w(){const t=document.querySelectorAll(".stat-number[data-count]");if(t.length===0)return;const n=new IntersectionObserver(r=>{r.forEach(s=>{if(s.isIntersecting){const e=s.target,o=parseInt(e.dataset.count);E(e,o),n.unobserve(e)}})},{threshold:.5});t.forEach(r=>n.observe(r))}function E(t,n){let s=0,e=0;function o(){e++,s=Math.min(Math.ceil(S(e/60)*n),n),t.textContent=L(s),e<60&&requestAnimationFrame(o)}o()}function S(t){return 1-Math.pow(1-t,4)}function L(t){return t>=1e3?(t/1e3).toFixed(0)+"K":t.toString()}function q(){const t=document.querySelector(".progress-ring-fill");if(!t)return;const n=t.closest("svg");if(n){const s=document.createElementNS("http://www.w3.org/2000/svg","defs");s.innerHTML=`
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea"/>
        <stop offset="100%" style="stop-color:#764ba2"/>
      </linearGradient>
    `,n.insertBefore(s,n.firstChild)}const r=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting&&(t.style.animation="none",t.offsetHeight,t.style.animation="progressFill 2s ease-out forwards",r.unobserve(e.target))})},{threshold:.5});r.observe(t)}function k(){const t=document.querySelectorAll(".bar-fill");if(t.length===0)return;t.forEach(s=>{s.style.transform="scaleX(0)"});const n=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting&&(e.target.querySelectorAll(".bar-fill").forEach((a,i)=>{setTimeout(()=>{a.style.transform="scaleX(1)"},i*200)}),n.unobserve(e.target))})},{threshold:.3}),r=document.querySelector(".score-breakdown");r&&n.observe(r)}const c=document.querySelector(".mobile-menu-btn"),f=document.querySelector(".nav-links");c&&f&&c.addEventListener("click",()=>{f.classList.toggle("active"),c.classList.toggle("active")});function m(){document.querySelectorAll("[data-aos]").forEach(n=>{const r=window.innerHeight;n.getBoundingClientRect().top<r-150&&n.classList.add("active")})}window.addEventListener("scroll",m);m();function A(){document.querySelectorAll(".typing").forEach(n=>{n.classList.add("typing-active")})}A();function C(){const t=document.createElement("div");t.id="coming-soon-modal",t.innerHTML=`
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-icon">🚀</div>
        <h3>Coming Soon!</h3>
        <p>We're working hard to bring you an amazing experience. Stay tuned!</p>
        <button class="modal-close-btn">Got it!</button>
      </div>
    </div>
  `;const n=document.createElement("style");return n.textContent=`
    #coming-soon-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
    }

    #coming-soon-modal.active {
      display: flex;
    }

    #coming-soon-modal .modal-overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease;
    }

    #coming-soon-modal .modal-content {
      background: linear-gradient(135deg, rgba(30, 30, 45, 0.95), rgba(20, 20, 35, 0.95));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 50px 60px;
      text-align: center;
      max-width: 400px;
      animation: scaleIn 0.3s ease;
      box-shadow: 0 25px 80px rgba(102, 126, 234, 0.3);
    }

    #coming-soon-modal .modal-icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: bounce 1s infinite;
    }

    #coming-soon-modal h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 15px;
    }

    #coming-soon-modal p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    #coming-soon-modal .modal-close-btn {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 14px 40px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    #coming-soon-modal .modal-close-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,document.head.appendChild(n),document.body.appendChild(t),t.querySelector(".modal-close-btn").addEventListener("click",()=>{t.classList.remove("active")}),t.querySelector(".modal-overlay").addEventListener("click",r=>{r.target===t.querySelector(".modal-overlay")&&t.classList.remove("active")}),t}const I=C();function Y(){I.classList.add("active")}document.querySelectorAll(".primary-btn, .secondary-btn, .cta-btn").forEach(t=>{t.addEventListener("click",function(n){n.preventDefault();const r=this.getBoundingClientRect(),s=n.clientX-r.left,e=n.clientY-r.top,o=document.createElement("span");o.style.cssText=`
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      left: ${s}px;
      top: ${e}px;
      width: 0;
      height: 0;
    `,this.style.position="relative",this.style.overflow="hidden",this.appendChild(o);const a=document.createElement("style");a.textContent=`
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
    `,document.head.appendChild(a),setTimeout(()=>o.remove(),600),setTimeout(()=>Y(),300)})});window.addEventListener("load",()=>{document.body.classList.add("loaded"),document.querySelectorAll(".hero-content > *").forEach((n,r)=>{n.style.animationDelay=`${r*.15}s`})});console.log("🎯 RecruitDesk - Your AI-Powered Interview Practice Companion");
