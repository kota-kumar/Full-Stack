import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MoviesSection from './MoviesSection'
function MoviesCards() {
    const [moviecards, setmoviecards] = useState([])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d9f6bfde6fe1971952f9beb3f97785ee&language=en-US&page=1`).then((Response)=>{
            setmoviecards(Response.data.results)
        })
    },)
  return (
    <div>
       <div className='space-y-8 flex flex-wrap gap-3 justify-evenly'>
        {
      moviecards.map((movieObj)=>(
            <MoviesSection  movieObj={movieObj} />
           
      ))
    
    }
 
      </div>
    </div>
  )
}

export default MoviesCards
