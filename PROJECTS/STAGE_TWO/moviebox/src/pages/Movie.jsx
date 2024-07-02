import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../components/Movie/Movie.css';
import Sidebar from '../components/Sidebar/Sidebar';
import FetchPopularMovies from '../components/Movie/FetchPopularMovies';

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovieDetail] = useState({});
  const [director, setDirector] = useState('');
  const [writer, setWriter] = useState('');
  const [stars, setStars] = useState('');
  const [videoKey, setVideoKey] = useState('');
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data

      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
      const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

      try {
        // Fetch movie details
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Movie details not found');
        }
        const data = await response.json();
        setMovieDetail(data);

        // Fetch credits (director, writer, stars)
        const creditsResponse = await fetch(creditsUrl);
        if (!creditsResponse.ok) {
          throw new Error('Credits not found');
        }
        const creditsData = await creditsResponse.json();
        const directors = creditsData.crew.filter((crewMember) => crewMember.job === 'Director');
        const writers = creditsData.crew.filter((crewMember) => crewMember.job === 'Screenplay' || crewMember.job === 'Writer');
        const cast = creditsData.cast.map((castMember) => castMember.name);
        setDirector(directors.map((director) => director.name).join(', '));
        setWriter(writers.map((writer) => writer.name).join(', '));
        setStars(cast.slice(0, 3).join(', '));

        // Fetch movie videos
        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
          throw new Error('Videos not found');
        }
        const videosData = await videosResponse.json();
        // Filter videos for trailers
        const trailers = videosData.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');
        // Check if there are any trailer videos, and if so, set the video key for the first one
        if (trailers.length > 0) {
          setVideoKey(trailers[0].key);
        }

        setLoading(false); // Set loading to false when fetch is complete
      } catch (err) {
        console.error(err); // Handle error (you can log the error)
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [movieId]);

  // Function to handle custom play button click
  const handlePlayButtonClick = () => {
    // Programmatically trigger video play/pause based on your needs
    // You can use the YouTube IFrame Player API for more control
    // Example: iframe.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <div className='movieDetailsContainer'>
        <div><Sidebar /></div>
        <div className='movieDetailsInfo'>
          <div className='movieDetailsVideo'>
            {videoKey ? (
              <>
                <iframe
                  title='Trailer'
                  width='100%'
                  height='100%'
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  frameBorder='0'
                  allowFullScreen
                ></iframe>
                <button className='custom-play-button' onClick={handlePlayButtonClick}>
                  <i className="fa-solid fa-play"></i>
                </button>
              </>
            ) : (
              <p className='displayMessage'><i className="fa-solid fa-video-slash fa-bounce"></i>No trailer available</p>
            )}
          </div>
          <div className='titleDescription'>
            <div className='titleContainer'>
              <div>
                <h2 data-testid='movie-title'>{movie.original_title || 'Title not available'}</h2>
                <p data-testid='movie-release-date'>{movie.release_date ? movie.release_date.split('-')[0] : 'Release date not available'}</p>
                <p data-testid='movie-runtime'>
                  {isNaN(movie.runtime)
                    ? 'Runtime not available'
                    : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                </p>
              </div>
              <div className='titlebuttons'>
                {movie.genres && Array.isArray(movie.genres) && movie.genres.map((genre, index) => (
                  <button key={index}>{genre.name}</button>
                ))}
              </div>
            </div>
            <div className='ratings'>
              <i className="fa-solid fa-star movieiconsize1 movieiconcolor1"></i>
              <h2>
                <span>{Math.round(movie.vote_average * 10)}</span> | 100
              </h2>
            </div>
          </div>
          <div className='overviewDetails'>
            <div className='overviewContainer'>
              <p className='titletags movieiconcolor3' data-testid='movie-overview'>{movie.overview}</p>
              <p className='titletags titlecontenttags'>Director : <span className='movieiconcolor3'>{director}</span></p>
              <p className='titletags titlecontenttags'>Writer : <span className='movieiconcolor3'>{writer}</span></p>
              <p className='titletags titlecontenttags'>Stars : <span className='movieiconcolor3'>{stars}</span></p>
              <div className='movieRatingandAwards'>
                <button className='titletags buttontags movieiconcolor2'>
                  <span>Top rated movie #65</span>
                </button>
                <div className='navigate buttontags'>
                  <div>
                    <span>Awards 9 nominations</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='showtimesContainer'>
              <div className='showtimesbuttons'>
                <button className='buttontags flexcontent movieiconcolor2'>
                  <i className="fa-solid fa-ticket movieiconsize1"></i>
                  <span>See Showtimes</span>
                </button>
                <button className='buttontags flexcontent movieiconcolor3'>
                  <i className="fa-solid fa-list-ul"></i>
                  <span>More watch options</span>
                </button>
              </div>
              <div className='showtimesCards'>
                <FetchPopularMovies/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
