import {React,useState,useEffect} from "react";
import "./Banner.css";
import axios from "../../Utils/axios"
import requests from "../../Utils/Requests";
import { hexToRgb } from "@mui/material/styles";

function Banner() {
    const [movie,setMovie] = useState({})
    useEffect(()=>{
       ( async()=>{
            try {
                const request = await axios.get(requests.fetchNetflixOriginals)
                // console.log(request)
                setMovie(request.data.results[
                    Math.floor(Math.random()*request.data.results.length)
                ])
            } catch (error) {
                console.error("Err: ",error)
            }
        })()
    },[])


  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner-desc">{movie?.overview}</p>
        <div className="banner-btns">
          <button className="banner-btn play">Play</button>
          <button className="banner-btn">My List</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
