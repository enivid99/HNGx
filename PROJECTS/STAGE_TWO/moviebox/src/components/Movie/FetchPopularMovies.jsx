import React, { useState, useEffect } from 'react';
import PopularMovies from './PopularMovies';

const FetchPopularMovies = () => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRelatedMovies(data.results);
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

  // Check if there are no movies or less than 3 movies
  if (relatedMovies.length < 3) {
    return null;
  }

  // Select three random movies from the response
  const randomMovies = [];
  while (randomMovies.length < 3) {
    const randomIndex = Math.floor(Math.random() * relatedMovies.length);
    const randomMovie = relatedMovies[randomIndex];
    if (!randomMovies.includes(randomMovie)) {
      randomMovies.push(randomMovie);
    }
  }

  return (
    <div className='cards'>
        <div className='cardsContent'>
            {randomMovies.map((movie, index) => (
            <PopularMovies key={index} movieData={movie} />
          ))}
        </div>
        <div className='showimesnavigate flexcontent movieiconcolor2'>
            <i className="fa-solid fa-video movieiconsize2"></i>
            <span className='othersizes'>See Popular Movies</span>
        </div>
     </div>
      );
};

export default FetchPopularMovies;

