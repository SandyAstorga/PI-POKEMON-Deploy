import React from 'react';
import style from './LandingPage.module.css'
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div className={style.landing_container}> 
        {/* Alargar imagen */}
        <Link to='/home'>
        <button className={style.button_enter}>
            <span className={style.button_span}>PRESS START</span>
        </button>
        </Link>
        </div>

    )
}

export default Landing;