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

function onFetch(evt) {
  evt.preventDefault();
  objectInfo.gallery.innerHTML = ""; 
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
        return
      } else {
        Notify.success(`Hooray! We found ${data.total} totalHits images.`);
        createMarkup(datasearch);
        loadMore.classList.remove("is-hidden"); 
      }
      loadMore.addEventListener('click', LoadingMore); 
      evt.target.reset(); 
    })
    .catch(error => { 
      throw new Error(`${error}`); 
  })
}
function LoadingMore() {
  page += 1; 
  fetchinfo(searchValue, page, per_page)
    .then(data => { 
      datasearch = data.hits;
      createMarkup(datasearch);    
  })
}