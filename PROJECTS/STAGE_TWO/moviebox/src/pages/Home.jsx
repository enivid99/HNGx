import React from 'react'

import "../components/Home/Home.css"
import Banner from '../components/Home/Banner'
import Movies from '../components/Home/Movies'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Banner/>
      <Movies/>
      <Footer/>
    </>
  )
}

export default Home