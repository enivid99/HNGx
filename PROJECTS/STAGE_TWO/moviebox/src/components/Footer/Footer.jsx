import React from 'react'

import '../Footer/Footer.css'

const Footer = () => {
  return (
    <>

      <div className="footerContainer">
          <div className="socialIcons">
            <a href="https://web.facebook.com/enivid99" target='_blanks'><i className='bx bxl-facebook-circle icons'></i></a>
            <a href="https://www.instagram.com/_e.n.i.v.i.d/" target='_blanks'><i className='bx bxl-instagram-alt icons'></i></a>
            <a href="https://twitter.com/enivid99" target='_blanks'><i className="fa-brands fa-x-twitter icons"></i></a>
            <a href="https://www.youtube.com/" target='_blanks'><i className='bx bxl-youtube icons'></i></a>
          </div>
          <div className="footerLinks">
              <a href="condition">Conditions of Use</a>   
              <a href="condition">Privacy & Policy</a>
              <a href="condition">Press Room</a>
          </div>
          <div className="tradeMark">
              <p>© 2021 MovieBox by Divine Chibueze Uchenna.</p>
          </div>
      </div>

    </>
  )
}

export default Footer