import React from 'react'
import Watchlist from './Watchlist'
import MovieRecommendation from './MovieRecommendation'
import SignIn from './SignIn'

function NavSection() {
  return (
    <>
        <div className='bg-black w-[full] p-2 pl-5 flex gap-7 items-center text-white h-[10vh]'>
        <h2 className='text-black font-sans bg-yellow-400 w-[80px] h-[6vh] text-center text-2xl font-black'>IMDB</h2>

            <div className=' w-fit h-[6vh] pr-3 bg-white flex items-center justify-center'>
              <select id='category' className='w-auto border text-black pl-2 h-[6vh]' >
        <option value="all" >All</option>
        <option value="titles" >Titles</option>
        <option value="tv-episodes" >TV Episodes</option>
        <option value="celebs" >Celebs</option>
        <option value="companies" >Companies</option>
        <option value="keywords">Keywords</option>
              </select>
              
        <input type='text' placeholder='Search your faviourate Movie/TV shows' className='bg-white text-black w-[30vw] pl-3'/>
 <i class="fa-solid fa-magnifying-glass text-xl text-black"></i>
        
    </div>
   <div className='flex gap-7 justify-center '>
 <Watchlist />
    <MovieRecommendation />
    <SignIn />
   </div>
    </div>
    </>

  )
}

export default NavSection
