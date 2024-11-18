import axios from 'axios';
const API_KEY = '2746c5cfc141887e88dfb6ab1261b20b'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzQ2YzVjZmMxNDE4ODdlODhkZmI2YWIxMjYxYjIwYiIsIm5iZiI6MTcyODAyNzQ0OC44Mzc0OTQsInN1YiI6IjY2ZmU5OGVlYjE0NjI4MmY3Yjg0ZGY2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lRKCpKDU7K8bKrRH9dniGQe9lghs75xWIMlVyeuuxtk'
  }
};

// Function to get popular movies
export const getPopularMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, options);
    return response.data; // Return the data
  } catch (err) {
    console.error(err);
    throw err; // Optionally rethrow the error for further handling
  }
};

// Function to get movie images
export const getMovieImages = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, options);
    return response.data; // Return the data
  } catch (err) {
    console.error(err);
    throw err; // Optionally rethrow the error for further handling
  }
};


export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};