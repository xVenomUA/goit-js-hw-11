import axios from "axios";

const Api_key = '40756763-1e424adc67840c21112a3a2f8';
const base_url = 'https://pixabay.com/api/? ';

export async function fetchinfo(q, page) { 
  const option = new URLSearchParams({
    key: '40756763-1e424adc67840c21112a3a2f8',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
    const response = await axios.get(`${base_url}&${option}`);
    return response.data;
}





