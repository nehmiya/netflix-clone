import React, { useState, useEffect } from "react";
import Row from "../Row/Row";
import requests from "../../../Utils/Requests";

function RowList() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Row
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow={isLarge}
      />
      <Row
        title="Trending Now"
        fetchURL={requests.fetchTrending}
        isLargeRow={isLarge}
      />
     <Row title={'TV Shows'} fetchURL={requests.fetchTvShow} isLargeRow={isLarge}/>
      <Row title={'Action Movies'} fetchURL={requests.fetchActionMovies} isLargeRow={isLarge}/>
      <Row title={'Comedy Movies'} fetchURL={requests.fetchComedyMovies} isLargeRow={isLarge}/>
      <Row title={'Horror Movies'} fetchURL={requests.fetchHorrorMovies} isLargeRow={isLarge}/>
      <Row title={'Documentaries'} fetchURL={requests.fetchDocumentaries} isLargeRow={isLarge}/>
      
    </div>
  );
}

export default RowList;
