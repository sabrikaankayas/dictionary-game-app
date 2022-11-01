import React, { useEffect, useState } from 'react'
import "../styles/Question.css"
import { Link } from 'react-router-dom'

const Question = () => {

    const [randomword, setRandomWord] = useState("")
    const [question, setQuestion] = useState("")
    const [corQuestion, setCorQuestion] = useState("")
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState("")
    const [def, setDef] = useState("")
    const [warning, setWarning] = useState(false)
    const [round, setRound] = useState(0)
    const [finish, setFinish] = useState(false)
    const [buttonReady, setButtonReady] = useState(true)
    const [next, setNext] = useState(false)
    const [correct, setCorrect] = useState(false)

    const randomWord = async () => {
        setButtonReady(true)
        if (round >= 9) {
            setFinish(true)
        }
        try {
            const res = await fetch("https://random-word-api.herokuapp.com/word")
            const data = await res.json()
            setRandomWord(data[0])
            setWarning(false)
            setRound(round + 1)
        } catch(err) {
            console.log(err)
        }
    }
   
    const key = process.env.REACT_APP_API_KEY

    const fetchQuestion = async () => {
        try {
            const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/${randomword}?key=${key}`)
            const data = await res.json()
            if (typeof data[0] !== "string") {
                setQuestion(data[0].meta.id)
                console.log(data[0].shortdef)
                let sentence = ""
                for (let i=0; i < data[0].shortdef.length; i++ ) {
                    sentence += `${i+1} - ${data[0].shortdef[i]} ` 
                }
                setDef(sentence)
            }
            else {
                setRandomWord(data[0])
            }
        }catch(err) {
            console.log(err)
        }
    }

    const questionCorrector = () => {
        for (let i = 0; i < question.length; i++) {
            if (question[i] === ":") {
                let word = ""
                for (let j = 0; j < i; j++) {
                    word += question[j]
                }
                setCorQuestion(word) 
                break
            } else {
                setCorQuestion(question)
            }
        }
        setButtonReady(false)
        setNext (false)
        setAnswer("")
        setCorrect(false)
    }

    const playerAnswer = () => {
        if (def) {
            if (answer.toLowerCase() !== "" && answer.toLowerCase() !== "a" && answer.toLowerCase() !== "an" && answer.toLowerCase() !== "as" && answer.toLowerCase() !== "to" && answer.toLowerCase() !== "or" && answer.toLowerCase() !== "the") {
            let words = def.split(" ")
            for (let i = 0; i < words.length; i++) {
                if (answer.replace(/\s+/g, '').toLowerCase() === words[i].toLowerCase()) {
                    setScore(score + 1)
                    setCorrect(true)
                    setNext(true)
                } 
            }

            setNext(true)
        } else if (answer === "") {

            setNext(true)
        } else if (answer.replace(/\s+/g, '').toLowerCase() === "a" || "or" || "an" || "as" || "to" || "or" || "the") {
            setWarning(true)
        }
        }

    }

    const info = () => {
        setNext(false)
        randomWord()
    }


    useEffect(() => {
        fetchQuestion()

    }, [randomword])

    useEffect(() => {
        questionCorrector()

    }, [question])

    useEffect(() => {
        randomWord()
    }, [])

  return (
    <div className='question'>
        <div className='question__scores'>
            <h1>Score: {score}</h1>  
            <h1>Round: {round} / 10</h1>
        </div>
        <div className='question__container'>
            <h1>{corQuestion}</h1>
            {next && <h4 className={`${correct ? "green" : ""}`}>{def}</h4>}  
            <div className='question__submit'>
            <div className='question__submit2'>
            <input placeholder='Enter a word' type="text" onChange={(e) => {setAnswer(e.target.value)}} value={answer} disabled={next}/>
            {!finish && next && def && <button className='question__btn' onClick={info} disabled={buttonReady}>Next</button>}
            {!finish && !next && <button className='question__btn' onClick={playerAnswer} disabled={buttonReady}>Submit</button>}
            {finish && <Link to={"/result"} className='question__btn' state={{ score: score, def: def, corQuestion: corQuestion}}>End</Link>}
            </div>
            </div>
            {warning  && <h5>"a, an, or, as, to, the"cannot be used.</h5>}
        </div>
    </div>
  )
}

export default Question
