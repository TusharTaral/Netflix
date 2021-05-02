import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "448px",
    width: "100%",
    position:"relative",
    
  
  };
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

console.log(movie)
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backdropPosition: "center center",
      }}
    >
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      {/* Background image */}
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* 2 buttons */}
        <div className="banner_buttons">
          <button onClick={()=>handleClick(movie)} className="banner_button">Play</button>
          <button className="banner_button">My List </button>
        </div>

        {/* description */}
        <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
        
      </div>
     
      <div className="banner_fadeBottom" />
      
    </header>
  );
}

export default Banner;
