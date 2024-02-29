import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPictures } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.searchForm');
const loader = document.querySelector('.css-loader');
const gallery = document.querySelector('.galleryDetails');
const loadBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('div a', {
                captionsData: 'alt',
                captionDelay: 250,
                preloading: true,
            });

let page = 1;
const limit = 15;
let current_query;
let current_page;

form.addEventListener('submit', onFormHandler);

function onFormHandler(event) {
    event.preventDefault();
    loader.classList.add('loader');

    gallery.innerHTML = null;
    const query = event.target.elements.name.value.trim();

    if (!query) {
        loader.classList.remove('loader');
        return iziToast.warning({ message: "Must be filled" });
    }

    getPictures(query, limit, page)
        .then(data => {
            if (!data.hits || data.hits.length === 0) {
                return iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
            }
           
            const images = data.hits;
            const markup = images.map(image => createMarkup(image)).join('');

            gallery.innerHTML = markup;
            current_query = query;
            current_page = page;
            loadBtn.classList.remove('visually-hidden')
            
             if (data.totalHits < limit) {
                iziToast.warning({ message: `Only ${data.totalHits} pictures with your request were found`});
                loadBtn.classList.add('visually-hidden')
             }
            
            lightbox.refresh();
            loader.classList.remove('loader');
        })
        .catch(() => {
            iziToast.error({ message: "Error occurred while fetching images. Please try again later!" });
        }).finally(() => {
            loader.classList.remove('loader');
        });
    
    loadBtn.addEventListener('click', onClickHandler);

    function onClickHandler() {
        current_page++;
        getPictures(current_query, limit, current_page).then(data => {

            const firstGalleryItem = document.querySelector('li')
            const { height } = firstGalleryItem.getBoundingClientRect();
    
            const images = data.hits;
            const markup = images.map(image => createMarkup(image)).join('');

            gallery.insertAdjacentHTML('beforeend', markup);

            window.scrollBy({
            top: height * 2, 
            behavior: 'smooth',
            });

            const totalHits = data.totalHits;
            const totalPages = Math.floor(totalHits / limit);

            if (current_page > totalPages) {
                iziToast.error({ message: "We're sorry, but you've reached the end of search results." });
                loadBtn.classList.add('visually-hidden')
            }
            lightbox.refresh();
        }).catch(() => {
            iziToast.error({ message: "Error occurred while fetching images. Please try again later!" });
        })
    }
     form.reset();
    
}

