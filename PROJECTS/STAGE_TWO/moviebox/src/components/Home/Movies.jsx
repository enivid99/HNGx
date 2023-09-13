import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import MovieCard from './MovieCard'

const Movies = () => {
  const [ movies, setMovies ] = useState([])

  useEffect(() =>{
    const options = {
      method: 'GET',  
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkxZDdkODFjMTg3OGU2MDRiODY0ZmNkZjllM2UxMCIsInN1YiI6IjY1MDE4YzZlZTBjYTdmMDEyZWI5MzE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLX98sE7njMpbF7uaDLj0TfuxC0LQ-qUFhjnRaPzunY'
      }
    };
    
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err)
      );
  }, [])
  
  
  return (
    <div>
        <div>
          {movies.map((movie) => (
            <Link to={`/movie/:${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          ))}
        </div>
    </div>
  )
}

export default Movies