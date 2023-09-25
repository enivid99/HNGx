import React from 'react'

const PopularMovies = ({ movieData }) => {

    if (!movieData || !movieData.title) {
        return null;
    }

  return (
    <div>
        <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt=""/>
    </div>
  )
}

export default PopularMovies