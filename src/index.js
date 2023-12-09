import { fetchinfo } from "./js/query-pixa";
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css'; 
const loadMore = document.querySelector('.load-more');
loadMore.setAttribute('hidden', true); 

const search = document.getElementById('search-form');

const per_page = 40; 
let page = 1; 
let searchValue = '';
search.addEventListener('submit', onFetch); 

function onFetch(evt) {
  evt.preventDefault(); 
  searchValue = evt.target.searchQuery.value; 
  console.log(searchValue);
}




