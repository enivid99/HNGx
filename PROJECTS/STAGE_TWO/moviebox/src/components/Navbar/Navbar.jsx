import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import logoimg from '../../assets/logo2.png';
import './Navbar.css';
import { Link } from 'react-router-dom'
import { useNavbar } from '../../NavbarContext';

const Navbar = ({ isSearchPage }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSearchActive, setIsSearchActive } = useNavbar();

  const searchMovieHandler = (e) => {
    e.preventDefault();

    if (searchQuery === "") {
      alert("We would love to know the movie you are looking for");
      return;
    }

    const query = encodeURIComponent(searchQuery.trim());
    navigate(`/search?q=${query}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    
    
    setSearchQuery(query || '');
  }, [location.search]);

  const toggleSearch = () => {
    setIsSearchActive(!!searchInput.current.value);
  };

  const clearInputField = () => {
    setSearchQuery('');
    setIsSearchActive(false);
    setTimeout(() => {
      searchInput.current.focus();
    }, 0);
  };

  return (
    <div className={`navBarContainer ${isSticky ? 'fixed' : ''} ${isSearchPage ? 'searchNavBar' : ''}`}>
      <div className="logomain">
        <Link to="/">
          <img src={logoimg} alt="logo" />
        </Link>
      </div>
      <form className="searchField" onSubmit={searchMovieHandler}>
        <input
          type="text"
          placeholder="What do you want to watch?"
          ref={searchInput}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            toggleSearch();
          }}
        />
        <button className='searchButton'> 
          <i
            className={`fa-solid ${isSearchActive ? 'fa-xmark' : 'fa-magnifying-glass'}`}
            onClick={(event) => {
              if (isSearchActive) {
                event.preventDefault();
                clearInputField();
                event.stopPropagation();
              }
            }}
            id="searchIcon"
          ></i>
        </button>
      </form>
      <div className="cta-navbar">
        <NavLink to="/sign">Sign&nbsp;in</NavLink>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="18" fill="#BE123C" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.59998 14.4C9.59998 13.7373 10.1372 13.2 10.8 13.2H25.2C25.8627 13.2 26.4 13.7373 26.4 14.4C26.4 15.0628 25.8627 15.6 25.2 15.6H10.8C10.1372 15.6 9.59998 15.0628 9.59998 14.4Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.59998 21.6C9.59998 20.9373 10.1372 20.4 10.8 20.4H25.2C25.8627 20.4 26.4 20.9373 26.4 21.6C26.4 22.2628 25.8627 22.8 25.2 22.8H10.8C10.1372 22.8 9.59998 22.2628 9.59998 21.6Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
