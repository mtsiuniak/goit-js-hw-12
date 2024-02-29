import{i as c,S as d}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function p(o){const s=`https://pixabay.com/api/?key=42459429-d6d7a0fe637ea3675bc35ddeb&q=${o}`;return fetch(s).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).catch(r=>console.log(r))}function m({webformatURL:o,largeImageURL:s,likes:r,views:a,comments:e,downloads:t,tags:n}){return`<li>
        <div>
        <a href="${s}">
        <img src="${o}" alt="${n}">
        </a>
        </div>
        <div class="text-content">
        <p><span class="text-span">Likes</span><br>${r}</p>
        <p><span class="text-span">Views</span><br>${a}</p>
        <p><span class="text-span">Comments</span><br>${e}</p>
        <p><span class="text-span">Downloads</span><br>${t}</p>
        </div>
        </li>`}const u=document.querySelector(".searchForm"),i=document.querySelector(".css-loader"),l=document.querySelector(".galleryDetails");u.addEventListener("submit",f);function f(o){o.preventDefault(),i.classList.add("loader"),l.innerHTML="";const s=o.target.elements.name.value.trim();if(!s)return i.classList.remove("loader"),c.warning({message:"Must be filled"});p(s).then(r=>{if(!r.hits||r.hits.length===0)return c.error({message:"Sorry, there are no images matching your search query. Please try again!"});const e=r.hits.map(n=>m(n)).join("");l.innerHTML=e,new d("div a",{captionsData:"alt",captionDelay:250,preloading:!0}).refresh(),i.classList.remove("loader")}).catch(()=>{c.error({message:"Error occurred while fetching images. Please try again later!"})}).finally(()=>{i.classList.remove("loader")}),u.reset()}
//# sourceMappingURL=commonHelpers.js.map
