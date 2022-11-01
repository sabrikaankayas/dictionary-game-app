import React from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <h1>Welcome to Dictionary Game!</h1>
        <div className='home__container'>
        
        <h3>In the game you will be given 10 words in order. Try to guess one word from the dictionary definition to get point!</h3>
        <Link className='home__btn'  to={"quiz"}>Start</Link>
        </div>
    </div>
  )
}

export default Home



