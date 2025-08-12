import React, { useState, useEffect } from "react";
import axios from "../../../Utils/axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
      } catch (error) {
        console.error(`Err: ${error}`);
      }
    })();
  }, [fetchURL]);

  const handleClick = (movie) => {
    if (showTrailer) {
      setShowTrailer(false);
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlparams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlparams.get("v"));
          setShowTrailer(true);
        })
        .catch(() => {
          console.error("No trailer found for", movie?.title);
        });
    }
  };

  const opts = {
    height: "480",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row-posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            key={index}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
          />
        ))}
      </div>

      {showTrailer && (
        <div className="trailer-overlay">
          <div className="trailer-container">
            <button className="close-btn" onClick={() => setShowTrailer(false)}>
              ✖
            </button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
