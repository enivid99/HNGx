import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const FetchBanner = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  // Display a loading spinner while loading
  if (loading) {
    return null;
  }

  // Check if there are no movies
  if (popularMovies.length === 0) {
    return null;
  }

  // Select a random movie from the response
  const randomIndex = Math.floor(Math.random() * popularMovies.length);
  const randomMovie = popularMovies[randomIndex];

  return (
    <div>
      {/* Update the prop name to match the change in Banner component */}
      <Banner movieData={randomMovie} />
    </div>
  );
};

export default FetchBanner;