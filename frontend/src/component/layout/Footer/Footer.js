import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"
// import { Link } from 'react-router-dom';

 const Footer = () => {
  return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="" className="Appstore" />
        </div>

        <div className='midFooter'>
            <h1>CLOTHING STORE</h1>
            <p>Anish Enterprise serves you first</p>
            <p>Copyrights 2022 &copy; MeAnishSingh</p>
        </div>

        <div className='rightFooter'>
            <h1>Follow Us</h1>
            {/* <Link to="www.linkedin.com/in/anish-kumar-0817201a2">Instagram</Link>
            <Link to="www.linkedin.com/in/anish-kumar-0817201a2">Facebook</Link>
            <Link to="www.linkedin.com/in/anish-kumar-0817201a2">LinkedIn</Link> */}
            

            <a href='www.linkedin.com/in/anish-kumar-0817201a2'>Instagram</a>
            <a href='www.linkedin.com/in/anish-kumar-0817201a2'>Facebook</a>
            <a href='www.linkedin.com/in/anish-kumar-0817201a2'>LinkedIn</a>
        </div>


    </footer>
  )
}

export default Footer;