import React ,{useState,useEffect}from 'react'
import axios from '../../../Utils/axios'
import './Row.css'



function Row({title,fetchURL,isLargeRow}) {

    const [movies,setMovies] = useState([])

    // const base_url = "https://image.tmdb.org/t/p/original"

    useEffect(()=>{
        (async()=>{
            try {
                console.log(fetchURL)
                const request = await axios.get(fetchURL);
                console.log(request)
                setMovies(request.data.results)
            } catch (error) {
                console.error(`Err: ${error}`)
            }
        })()
    },[])

  return (
    <div>
        {console.log(movies)}
    </div>
  )
}

export default Row
