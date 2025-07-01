import React from 'react'
import NavSection from '../components/NavSection'
import Watchlist from '../components/Watchlist'
import MovieRecommendation from '../components/MovieRecommendation'
import Banner from '../components/banner'
import MoviesSection from '../components/MoviesSection'
import MoviesCards from '../components/MoviesCards'
function App() {
  return (
   <>
    <NavSection />
   <div className='space-y-8 flex flex-wrap'>
<Banner />
<MoviesCards />
   </div>

   
   </>
  )
}

export default App
