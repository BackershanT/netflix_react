import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { API_KEY, imageUrl } from '../../Constants/Constants'
import YouTube from 'react-youtube'
import axios from '../../axios/axios'

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null); 

  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch(err => {
        console.log('Network error:', err);
      });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    }
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]); 
        } else {
          console.log('No video found');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt='poster'
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost
