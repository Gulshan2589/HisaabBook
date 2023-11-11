//This Is Hero Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Home/Hero.css';//importing stylesheet of Hero section

function Hero() {
  const myStyle = {
    width: '650px',
    height: '450px',
  };
  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <h1 className="app__header-h1">Save money,<br />without thinking<br />about it.</h1>
        <h2 className="app__header-h2">Manage your daily expense and income</h2>
        <NavLink to="/dashboard" className='herolink'>Get Started</NavLink>
      </div>
      <div className="app__wrapper_img">
        <dotlottie-player src="https://lottie.host/1579d1e1-f107-47b4-b20c-02a626f14882/fFarku58wz.json"
          background="transparent" speed="1" loop autoplay
          style={myStyle}></dotlottie-player>
      </div>
    </div>
  )
}

export default Hero;