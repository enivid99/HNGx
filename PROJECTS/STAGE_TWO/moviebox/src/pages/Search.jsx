import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import MovieCard from '../components/Home/MovieCard';
import '../components/Search/Search.css';
import Footer from '../components/Footer/Footer';

const Search = () => {
  const [noResult, setNoResult] = useState(false);
  const [movies, setMovies] = useState([]);
  const { search } = useLocation();
  const query = decodeURIComponent(search.split("=")[1]); // Decode the query

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length < 1) {
          setNoResult(true);
          return;
        } else {
          setMovies(data.results);
        }
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div>
      <Navbar isSearchPage={true} />
      <div className="container">
        <div className="featuredheader">
          <h2>Search Results for '{`${query}`}'</h2>
          <Link className="searchRedirect" to="/">
            <button className="searchRedirectBtn">
              <span>Back&nbsp;Home</span>
              <i className="searchRedirectBtnIcon fa-solid fa-chevron-right"></i>
            </button>
          </Link>
        </div>
        <div className="searchResults">
          {movies.length > 1 &&
            movies.map((movie) =>
              movie.poster_path && <MovieCard key={movie.id} movie={movie} />
            )}
          {noResult && <h2 className="noresult">No Movie found</h2>}
        </div>
      </div>    
      <Footer />
    </div>
  );
};

export default Search;
