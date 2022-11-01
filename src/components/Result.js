import React from 'react'
import "../styles/Result.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const Result = () => {
    const location = useLocation()
    const score = location.state?.score
    const corQuestion = location.state?.corQuestion
    const def = location.state?.def



  return (
    <div className='question'>
        <h1 className='thanks'>Thanks for playing!</h1>
        <div className='question__container'>
            <h1>{location.state ? corQuestion : "first you should take the test"}</h1>
            <h4>{location.state ? def : "first you should take the test"}</h4>  
            <div className='question__submit'>
                <h1 className='result__score'>Final Score:  {location.state ? score : "first you should take the test"}</h1>
            </div>
            <Link to={"/quiz"} className='result__btn'>Try Again</Link>
        </div>
    </div>

    
  )
}

export default Result