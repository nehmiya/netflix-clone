import { React, useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../Utils/axios";
import requests from "../../Utils/Requests";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovies(request.data.results);
        setMovieIndex(0);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    })();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const handleNext = () => {
    setMovieIndex((prevIndex) =>
      prevIndex + 1 < movies.length ? prevIndex + 1 : 0
    );
  };

  const movie = movies[movieIndex];

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h2 className="banner-desc">{truncate(movie?.overview, 150)}</h2>

        <div className="banner-btns">
          <button className="banner-btn play">Play</button>
          <button className="banner-btn">My List</button>
          <button className="banner-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <div className="banner-fadeBottom" />
    </div>
  );
}

export default Banner;
