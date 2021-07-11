import React, { useState, useEffect } from "react";
import axios from "../axios";
import styles from "./Row.module.css"
import Youtube from "react-youtube";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  const opts = {
    height: "700px",
    width: "100%",

  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

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

  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row_posters}>
        {movies.map(
          (movie) =>
            movie.backdrop_path !== null && (
              <div className={styles.row_container}>
                <img
                  className={`${styles.row_poster} ${isLargeRow && styles.row_posterLarge}`}
                  src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                  alt={movie.name}
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                ></img>
                <h3 style={{ margin: "10px" }}>  {movie?.title || movie?.name || movie?.original_name}</h3>
              </div>
            )
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
