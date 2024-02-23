import { useCallback, useRef, useState } from 'react';
import completeImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz() {
    const shuffleAnswers=useRef();
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState===''? userAnswers.length: userAnswers.length-1;
    ;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleClick(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        }
        )
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong')
            }
            setTimeout(()=>{
                setAnswerState('');
            },2000)
        }, 1000);
    },
        [activeQuestionIndex]);
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={completeImg} alt="" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }
    if(!shuffleAnswers.current){
         shuffleAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
        shuffleAnswers.current.sort(() => Math.random() - 0.5)
    }
   



    return (

        <div id="quiz">
            <div id="question">
                <h2>
                    {QUESTIONS[activeQuestionIndex].text}
                </h2>
                <ul id="answers">
                    {shuffleAnswers.current.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] ===answer;
                        let cssClass='';
                        if(answerState ==='answered' && isSelected){
                            cssClass = 'selected';
                        }
                        if((answerState ==='correct' || answerState==='wrong') && isSelected){
                            cssClass = answerState;
                        }
                        return (<>
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}
                                    className={cssClass}>
                                    {answer}
                                </button>

                            </li>
                        </>

                        )

                    }
                    )
                    }
                    <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={handleSkipAnswer} />
                </ul>
            </div>
        </div>


    );
}