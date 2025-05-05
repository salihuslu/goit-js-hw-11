import{S as h,i}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();let y=new h(".gallery a");const g=document.querySelector("#search-form"),b=document.querySelector("input[name='searchQuery']"),c=document.querySelector(".gallery"),l=document.getElementById("loader"),L="50099197-cf66e6150e6b3edf0d1a830a4",$="https://pixabay.com/api/";g.addEventListener("submit",async a=>{a.preventDefault();const r=b.value.trim();if(!r){i.warning({message:"Please enter a search term!",position:"topRight"});return}c.innerHTML="",l.classList.remove("hidden");try{const o=await(await fetch(`${$}?key=${L}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`)).json();if(o.hits.length===0){i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const e=o.hits.map(({webformatURL:t,largeImageURL:s,tags:d,likes:u,views:p,comments:f,downloads:m})=>`
      <a class="photo-card" href="${s}">
        <img src="${t}" alt="${d}" loading="lazy" />
        <div class="info">
          <p><b>Likes</b> ${u}</p>
          <p><b>Views</b> ${p}</p>
          <p><b>Comments</b> ${f}</p>
          <p><b>Downloads</b> ${m}</p>
        </div>
      </a>
    `).join("");c.insertAdjacentHTML("beforeend",e),y.refresh()}catch(n){i.error({message:"An error occurred while fetching data.",position:"topRight"}),console.error("Fetch error:",n)}finally{l.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
