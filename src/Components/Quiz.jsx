import {useState} from 'react';
import completeImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
;
const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    function handleClick(selectedAnswer){
        setUserAnswers((prevState)=>{
        return [...prevState, selectedAnswer]}
        )
    }
if(quizIsComplete){
    return(
        <div id="summary">
            <img src={completeImg} alt="" />
            <h2>Quiz Completed!</h2>
        </div>
    )
}
const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
shuffleAnswers.sort(()=>Math.random() -0.5)
    return (

<div id="quiz">
<div id="question">
<h2>
    {QUESTIONS[activeQuestionIndex].text}
</h2>
<ul id="answers">
    {shuffleAnswers.map((answer)=>{
        return(<>
            <li key={answer} className="answer">
        <button onClick={()=>handleClick(answer)}>
            {answer}
            </button>
         
    </li>
        </>
    
) 
          
    }
    )
    }
     <QuestionTimer timeOut={10000} onTimeOut={()=>handleClick(null)}/>
</ul>
        </div>
</div>

     
    );
}