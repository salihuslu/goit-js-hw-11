import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Lightbox örneği
let lightbox = new SimpleLightbox(".gallery a");

const form = document.querySelector("#search-form");
const input = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector(".gallery");
const loader = document.getElementById("loader");

const API_KEY = "50099197-cf66e6150e6b3edf0d1a830a4";
const BASE_URL = "https://pixabay.com/api/";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search term!",
            position: "topRight",
        });
        return;
    }

    gallery.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`
        );
        const data = await response.json();

        if (data.hits.length === 0) {
            iziToast.info({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }

        const markup = data.hits.map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
      <a class="photo-card" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </a>
    `
        ).join("");

        gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();

    } catch (error) {
        iziToast.error({
            message: "An error occurred while fetching data.",
            position: "topRight",
        });
        console.error("Fetch error:", error);
    } finally {
        loader.classList.add("hidden");
    }
});
