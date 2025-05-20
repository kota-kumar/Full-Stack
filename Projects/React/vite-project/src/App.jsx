import React from 'react'
import NavSection from '../components/NavSection'
import Watchlist from '../components/Watchlist'
import MovieRecommendation from '../components/MovieRecommendation'
import Banner from '../components/banner'
import MoviesSection from '../components/MoviesSection'
function App() {
  return (
   <>
    <NavSection />
   <div className='space-y-8 flex flex-wrap'>
<Banner />
<MoviesSection /><MoviesSection /><MoviesSection />
   </div>

   
   </>
  )
}

export default App
