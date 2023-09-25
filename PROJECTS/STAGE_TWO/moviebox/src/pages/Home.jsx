import React from 'react'

import "../components/Home/Home.css"
import Navbar from '../components/Navbar/Navbar'
import FetchBanner from '../components/Home/FetchBanner'
import Banner from '../components/Home/Banner'
import Movies from '../components/Home/Movies'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <FetchBanner/>
      <Banner/>
      <Movies/>
      <Footer/>
    </>
  )
}

export default Home