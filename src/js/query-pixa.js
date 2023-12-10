import axios from "axios";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { objectInfo } from "../index";
const Api_key = '40756763-1e424adc67840c21112a3a2f8';
const base_url = 'https://pixabay.com/api/';

async function fetchinfo(q, page, per_page) { 
    const response = await axios.get(
      `${base_url}/?key=${Api_key}&&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    );
    return response.data;
}

function createMarkup(datasearch) { 
  const array = datasearch.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card"><a class="gallery_link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a><div class="info"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div>`;
    }
  ).join("");
  objectInfo.gallery.innerHTML += array; 
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

}







export { fetchinfo, createMarkup }; 

