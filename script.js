const API_KEY = 'Insert your API key here';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const toggleLoader = (show) => {
  document.getElementById('loader').style.display = show ? 'block' : 'none';
};

const fetchMovies = async (endpoint, containerId) => {
  try {
    toggleLoader(true);
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.results, containerId);
  } catch (err) {
    console.error(`Error loading ${endpoint}`, err);
  } finally {
    toggleLoader(false);
  }
};

const displayMovies = (movies, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  movies.forEach(movie => {
    if (movie.poster_path) {
      const wrapper = document.createElement('div');

      const img = document.createElement('img');
      img.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
      img.classList.add('poster');
      img.alt = movie.title;

      const title = document.createElement('p');
      title.textContent = movie.title;

      wrapper.appendChild(img);
      wrapper.appendChild(title);
      container.appendChild(wrapper);
    }
  });
};

const setHeroMovie = async () => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;

    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      const hero = document.getElementById('hero');
      const title = document.getElementById('hero-title');
      const description = document.getElementById('hero-description');

      if (randomMovie.backdrop_path) {
        hero.style.backgroundImage = `url('${IMAGE_BASE_URL}${randomMovie.backdrop_path}')`;
      }
      title.textContent = randomMovie.title || 'Untitled';
      description.textContent = randomMovie.overview || 'No description available.';
    }
  } catch (err) {
    console.error('Error setting hero movie:', err);
  }
};

// Load content
fetchMovies('/trending/movie/week', 'trending');
fetchMovies('/movie/top_rated', 'top-rated');
fetchMovies('/movie/now_playing', 'now-playing');
setHeroMovie();
