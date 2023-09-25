import { useState, useEffect} from 'react'


import MovieCard from './MovieCard'

const Movies = () => {
  const [ movies, setMovies ] = useState([])

  useEffect(() =>{
    const options = {
      method: 'GET',  
      headers: {
        accept: 'application/json',
        Authorization:  `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err)
      );
  }, [])
  
  
  return (
    <>
        <div className='moviesContainer'>
          <div className="featuredheader">
              <h2>Featured Movies</h2>
              <button>
                <p>See&nbsp;more</p>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
          </div>

          <div className='movies'>
            {movies.map((movie, index) => (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
          </div>    
        </div>
    </>
  )
}

export default Movies