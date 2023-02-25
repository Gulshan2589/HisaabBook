//This Is Hero Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Home/Hero.css';//importing stylesheet of Hero section

function Hero() {
  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <h1 className="app__header-h1">Save money,<br />without thinking<br />about it.</h1>
        <h2 className="app__header-h2">Manage your daily expense and income</h2>
        <NavLink to="/dashboard" className='herolink'>Get Started</NavLink>
      </div>
      <div className="app__wrapper_img">
        <lottie-player src="https://lottie.host/3c72af23-f40b-494f-8a7e-f63cddcda486/rxdCECf4w6.json"
          background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
    </div>
  )
}

export default Hero;