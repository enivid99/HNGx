import React, { useEffect, useState } from 'react';

const MovieCard = ({ movie }) => {
  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    if (movie && movie.genre_ids && Array.isArray(movie.genre_ids)) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkxZDdkODFjMTg3OGU2MDRiODY0ZmNkZjllM2UxMCIsInN1YiI6IjY1MDE4YzZlZTBjYTdmMDEyZWI5MzE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLX98sE7njMpbF7uaDLj0TfuxC0LQ-qUFhjnRaPzunY'
        }
      };

      // Fetch genre data from the API
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.genres && Array.isArray(data.genres)) {
            const genreMap = new Map(data.genres.map((genre) => [genre.id, genre.name]));
            const movieGenreNames = movie.genre_ids.map((genreId) => genreMap.get(genreId));
            setGenreNames(movieGenreNames);
          } else {
            console.error('Invalid genre data received from API:', data);
          }
        })
        .catch((error) => console.error('Error fetching genre data:', error));
    }
  }, [movie]);

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
      <p>{movie.release_date}</p>
      <p>Genres: {genreNames.join(', ')}</p>
      <p>{movie.original_title}</p>
      <div>
        <p>{movie.vote_average}</p>
        <p>{movie.vote_count}</p>
      </div>
    </div>
  );
};

export default MovieCard;
