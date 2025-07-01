import React from 'react'
import MoviesCards from './MoviesCards'
function MoviesSection({movieObj}) {
  return (
   <>
 <div className='space-x-8 flex space-y-8'>
      <div className='w-[300px] h-[60vh] bg-center bg-cover' style={{backgroundImage:`URL(https://image.tmdb.org/t/p/original/${movieObj.backdrop_path})`}}>
      

    </div>
  
    </div>
   
    </>
  )
}

export default MoviesSection
