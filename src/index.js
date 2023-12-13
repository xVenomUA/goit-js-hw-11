import { fetchinfo } from './js/api-pixabay';
import { createMarkup } from './js/createMarkUP';
import { Notify } from 'notiflix';
import Notiflix from 'notiflix';
const loadMore = document.querySelector('.load-more');
loadMore.classList.add('is-hidden');

export const refs = {
  search: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};
const per_page = 40;
let page = 1;
let searchValue = '';
refs.search.addEventListener('submit', onFetch);

async function onFetch(evt) {
  Notiflix.Loading.dots('Loading...');
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  searchValue = evt.target.searchQuery.value;
  searchValue = searchValue.toLowerCase().trim();
  if (searchValue === '') {
    Notify.info('Please write queary!');
    return;
  }
  page = 1;

  try {
    const { hits, totalHits } = await fetchinfo(searchValue, page);
    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      Notiflix.Loading.remove();
      evt.target.reset();
      return;
    } else {
      Notify.success(`Hooray! We found ${totalHits} totalHits images.`);
      Notiflix.Loading.remove();
      createMarkup(hits);
    }

    if (totalHits <= per_page) {
      loadMore.classList.add('is-hidden');
    } else {
      loadMore.classList.remove('is-hidden');
      loadMore.addEventListener('click', LoadingMore);
    }
  } catch (error) {
    throw new Error(error);
  }
  evt.target.reset();
}

async function LoadingMore() {
  page += 1;
  Notiflix.Loading.dots('Loading...');
  const { hits, totalHits } = await fetchinfo(searchValue, page);
  const lastPage = Math.ceil(totalHits / per_page);
  Notiflix.Loading.remove();
  createMarkup(hits);
  if (page === lastPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMore.classList.add('is-hidden');
  }
}
