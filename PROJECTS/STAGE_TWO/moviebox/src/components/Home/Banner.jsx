import React from 'react'
import { useState, useEffect } from 'react';
import imdb from '../../assets/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@ 1.png';
import fruit from '../../assets/PngItem_1381056 1.png';

const Banner = ({ movieData }) => {

  const [videoLink, setVideoLink] = useState('');
  
  useEffect(() => { 
    if (movieData && movieData.title) {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

      // Construct the YouTube API URL with the query using movieData.title
      const query = movieData.title;
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&type=video`;

      // Make the API request to fetch the first video result
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Check if there are search results
          if (data.items && data.items.length > 0) {
            // Get the video ID of the first result
            const videoId = data.items[0].id.videoId;

            // Construct the YouTube video link
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // Update the state with the video link
            setVideoLink(videoUrl);
          } else {
            // Handle the case when no video results are found
            setVideoLink('No videos found');
          }
        })
        .catch((error) => {
          console.error('Error fetching YouTube video:', error);
        });
      }
    }, [movieData]);
    
    const handleWatchTrailer = () => {
      if (videoLink !== 'No videos found') {
        window.open(videoLink, '_blank');
      }
    };

  if (!movieData || !movieData.title) {
    return null;
  }

  const heroImg = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}')`,
  };


  return (
    <>
        <div className='heroImageOverlay' style={heroImg}>
          <div className='heroImage'>
            <div className='leftHeroContainer'>
              <h1>
                  {movieData.title}
              </h1>
              <div className='heroRatings'> 
                  <div>  
                      <img src={imdb} alt="IMDb logo" />
                      <p>{Math.round(movieData.vote_average * 10)} / 100</p>
                  </div>
                  <div>
                  <img src={fruit} alt="fruit icon" />
                  <p>{Math.min(Math.round(movieData.popularity), 100)}%</p>
                  </div>
              </div>
              <div className='heroSubtitle'>{movieData.overview}</div>
              <button onClick={handleWatchTrailer} className='heroButton'>
                <i className="fa-solid fa-circle-play"></i>
                <p>Watch trailer</p>
              </button>
            </div>

            <div className='rightHeroContainer'>
              <div>
                  <div className='line-1'></div>
              </div>
              <div className='rightnumbers'>
                <p>1</p>
                <p>2</p>
                <p className='thirdchild'>3</p>
                <p>4</p>
                <p>5</p>
              </div>      
            </div>
          </div>
            
        </div>
    </>
  )
}

export default Banner