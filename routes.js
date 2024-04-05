import { API_KEY } from "@env";
export const baseUrl = "https://movies-api14.p.rapidapi.com";
export const imageUrl = "https://image.tmdb.org/t/p/original";



// const options = {
//   method: 'GET',
//   url: 'https://movies-api14.p.rapidapi.com/movies',
//   headers: {
//     'X-RapidAPI-Key': 'ee0bb87444msh6e0164788236e5bp1d9940jsn8bbdb8bf4252',
//     'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
//   }
// };


const options = {
  method: 'GET',
  url: 'https://movies-api14.p.rapidapi.com/movies',
  headers: {
    'X-RapidAPI-Key': 'ee0bb87444msh6e0164788236e5bp1d9940jsn8bbdb8bf4252',
    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
  }
};


export const route = {
  now_playing: options,
  popular: `${baseUrl}/movies?api_key=${API_KEY}&language=en-US`,
  top_rated: `${baseUrl}/movies?api_key=${API_KEY}&language=en-US`,
  upcoming: `${baseUrl}/movies?api_key=${API_KEY}&language=en-US`,
  trending: `${baseUrl}/movies?api_key=${API_KEY}&language=en-US`,
  search: `${baseUrl}/search?api_key=${API_KEY}&language=en-US`
};
