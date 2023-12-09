import axios from "axios";

const Api_key = '40756763-1e424adc67840c21112a3a2f8';
const base_url = 'https://pixabay.com/api/';

async function fetchinfo(q, page, per_page) { 
    const response = await axios.get(
      `${base_url}/?key=${Api_key}&=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    );
    return response.data;
}
export { fetchinfo }; 
