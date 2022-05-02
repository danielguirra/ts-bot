import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.RAPID;

export async function getImage(query: string) {
  if (!token) return console.log(token);
  const options = {
    url:
      'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {
      q: query,
      pageNumber: '1',
      pageSize: '10',
      autoCorrect: 'true',
      safeSearch: 'true',
    },
    headers: {
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
      'X-RapidAPI-Key': token,
    },
  };

  const data = await axios.request(options);
  console.log(data.data.value[0].url);
  return data.data.value[0].url;
}
