import { fetchinfo } from './js/api-pixabay';
import { createMarkup } from './js/createMarkUP';
import { Notify } from 'notiflix';
import InfiniteScroll from 'infinite-scroll';
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
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  searchValue = evt.target.searchQuery.value;
  searchValue = searchValue.toLowerCase().trim();
  if (searchValue === '') {
    Notify.info('Please write queary!');
    return;
  }
  page = 1;
  fetchinfo(searchValue, page)
    .then(data => {
      console.log(data);
      let datasearch = data.hits;
      if (data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        evt.target.reset();
        return;
      } else {
        Notify.success(`Hooray! We found ${data.total} totalHits images.`);
        createMarkup(datasearch);
      }
      if (data.totalHits > per_page) {
        window.addEventListener('scroll', scrollinfinity);
      }
    })
    .catch(error => {
      console.log(error);
    });
  
  evt.target.reset();
}

async function LoadingMore() {
  page += 1;
  fetchinfo(searchValue, page).then(data => {
    const dseatch = data.hits;
    const lastPage = Math.ceil(data.totalHits / per_page);
    createMarkup(dseatch);
    if (page === lastPage) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      window.removeEventListener('scroll', scrollinfinity);
    }
  });
}
function scrollinfinity() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    LoadingMore();
  }
}
