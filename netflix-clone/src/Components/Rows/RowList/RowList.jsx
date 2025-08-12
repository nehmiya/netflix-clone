import React from 'react'
import Row from '../Row/Row'
import requests from '../../../Utils/Requests';

function RowList() {
  return (
    <div>
      <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals}/>
      <Row title="Trending" fetchURL={requests.fetchTrending}/>
    </div>
  );
}

export default RowList
