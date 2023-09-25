import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import imdb from '../../assets/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@ 1.png';
import fruit from '../../assets/PngItem_1381056 1.png';

const MovieCard = ({ movie }) => {
  
  const [isActive, setIsActive] = useState(false);

  const toggleFavourite = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
    
  };

  const iconClass = `favouriteIcon ${isActive ? 'active fa-solid' : 'fa-regular'} fa-heart`;

  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    if (movie && movie.genre_ids && Array.isArray(movie.genre_ids)) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` 
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
        <div className="movieCard">
            <Link to={`/movie/${movie.id}`} className='linkCard' data-testid='movie-card'>
              <div className='movieCardContent'>
                <div className='favouriteIconContainer'> 
                  <div className="circle" onClick={toggleFavourite}>
                    <i className={iconClass}></i>
                  </div>
                </div>
                <img className='movieposter' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} data-testid='movie-poster'/>
                
                <div className="movieInfo">
                <p className='movieReleaseDate' data-testid='movie-release-date'> USA, {movie.release_date.split('-')[0]}</p>
                <p className='movieTitle' data-testid='movie-title'>{movie.original_title}</p>
                <div className='movieRating'>
                  <div><img src={imdb} alt="IMDb logo" /><p>{Math.round(movie.vote_average * 10)} / 100</p></div>
                  <div><img src={fruit} alt="fruit icon" /><p>{Math.min(Math.round(movie.popularity), 100)}%</p></div>
                </div>
                <p className='moviegenres'>{genreNames.join(', ')}</p>
              </div>
              </div>
            </Link> 
          </div>
    </div>
  );
};

export default MovieCard;
