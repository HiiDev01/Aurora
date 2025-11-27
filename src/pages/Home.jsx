import React from 'react'
import Hero from '../component/Hero'
import BestSellers from '../component/BestSeller'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className='home'>
      <Hero/>
      <BestSellers/>
    </div>
  )
}

export default Home
