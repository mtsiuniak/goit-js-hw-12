
export function createMarkup({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) {
  
        return `<li>
        <div>
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}">
        </a>
        </div>
        <div class="text-content">
        <p><span class="text-span">Likes</span><br>${likes}</p>
        <p><span class="text-span">Views</span><br>${views}</p>
        <p><span class="text-span">Comments</span><br>${comments}</p>
        <p><span class="text-span">Downloads</span><br>${downloads}</p>
        </div>
        </li>`;
}


