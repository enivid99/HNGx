import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

import '../components/Movie/Movie.css';

const Movie = () => {
  const { movieId } = useParams(); // Use useParams to get the movieId
  const [movie, setMovieDetail] = useState({});

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkxZDdkODFjMTg3OGU2MDRiODY0ZmNkZjllM2UxMCIsInN1YiI6IjY1MDE4YzZlZTBjYTdmMDEyZWI5MzE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLX98sE7njMpbF7uaDLj0TfuxC0LQ-qUFhjnRaPzunY',
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then((response) => response.json())
      .then((data) => setMovieDetail(data))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      <h2>{movie.original_title}</h2>
    </div>
  );
};

export default Movie;
