import { fetchinfo, createMarkup } from './js/query-pixa';
import { Notify } from 'notiflix';
const loadMore = document.querySelector('.load-more');
loadMore.setAttribute('hidden', true);

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
    Notify.failure('Please write queary!');
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
        return
      } else {
        Notify.success(`Hooray! We found ${data.total} totalHits images.`);
        createMarkup(datasearch);
      }
    })
    .catch(error => { 
      throw new Error(`${error}`); 
  })
}
