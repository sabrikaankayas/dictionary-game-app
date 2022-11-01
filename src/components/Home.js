import React from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <h1>Welcome to Dictionary Game!</h1>
        <div className='home__container'>
        
        <h3>In the game you will be given 10 words in order. <br/> Guess a word from the <span>dictionary definition</span> of given word to get points!</h3>
        <Link className='home__btn'  to={"quiz"}>Start</Link>
        </div>
    </div>
  )
}

export default Home



