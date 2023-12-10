import { fetchinfo, createMarkup } from './js/query-pixa';
import { Notify } from 'notiflix';
const loadMore = document.querySelector('.load-more');
loadMore.classList.add('is-hidden');
// const search = document.getElementById('search-form');
// const gallery = document.querySelector('.gallery');
const objectInfo = {
  search: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};
export { objectInfo };
const per_page = 40;
let page = 1;
let searchValue = '';
objectInfo.search.addEventListener('submit', onFetch);

async function onFetch(evt) {
  evt.preventDefault();
  objectInfo.gallery.innerHTML = '';
  searchValue = evt.target.searchQuery.value;
  searchValue = searchValue.toLowerCase().trim();
  if (searchValue === '') {
    Notify.info('Please write queary!');
    return;
  }
  page = 1;
  fetchinfo(searchValue, page, per_page)
    .then(data => {
      let datasearch = data.hits;
      if (data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMore.classList.add('is-hidden');
        evt.target.reset();
        return;
      } else {
        Notify.success(`Hooray! We found ${data.total} totalHits images.`);
        createMarkup(datasearch);
      }
      if (data.totalHits > per_page) {
        loadMore.classList.remove('is-hidden');
        window.addEventListener('scroll', scrollinfinity);
      }
    })
    .catch(error => {
      throw new Error(`${error}`);
    });

  loadMore.addEventListener('click', LoadingMore);
  evt.target.reset();
}

 async function LoadingMore() {
  page += 1;
  fetchinfo(searchValue, page, per_page).then(data => {
    const dseatch = data.hits;
    const lastPage = Math.ceil(data.totalHits / per_page);
    createMarkup(dseatch);
    if (page === lastPage) {
      loadMore.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMore.removeEventListener('click', LoadingMore);
      window.removeEventListener('scroll', scrollinfinity);
    }
  });
}
function scrollinfinity() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 80) {
    LoadingMore();
  }
}
