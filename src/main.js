import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPictures } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.searchForm');
const loader = document.querySelector('.css-loader');
const gallery = document.querySelector('.galleryDetails');

form.addEventListener('submit', onFormHandler);

function onFormHandler(event) {
    event.preventDefault();
    loader.classList.add('loader');

    gallery.innerHTML = "";
    const query = event.target.elements.name.value.trim();

    if (!query) {
        loader.classList.remove('loader');
        return iziToast.warning({ message: "Must be filled" });
    }

    getPictures(query)
        .then(data => {
            if (!data.hits || data.hits.length === 0) {
                return iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
            }

            const images = data.hits;
            const markup = images.map(image => createMarkup(image)).join('');

            gallery.innerHTML = markup;

            const lightbox = new SimpleLightbox('div a', {
                captionsData: 'alt',
                captionDelay: 250,
                preloading: true,
            });
            lightbox.refresh();
            loader.classList.remove('loader');
        })
        .catch(() => {
            iziToast.error({ message: "Error occurred while fetching images. Please try again later!" });
        }).finally(() => {
            loader.classList.remove('loader');
        });

    form.reset();
}