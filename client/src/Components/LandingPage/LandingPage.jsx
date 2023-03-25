import style from './LandingPage.module.css'

const MyLp = () => {
    return (
        <div className={style.landing_container}> 
        {/* Alargar imagen */}
        <button className={style.button_enter}>
            <span className={style.button_span}>PRESS START</span>
        </button>
        </div>

    )
}

export default MyLp;