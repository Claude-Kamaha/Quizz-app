import { useEffect, useState } from "react"

export default function QuestionTimer({timeOut, onTimeOut}){
    const [remainingTime, setRemainingTime] = useState(timeOut);
    useEffect(()=>{
        const timer= setTimeout(onTimeOut, timeOut);
        return()=>{clearTimeout(timer)}
        console.log("timeOut");
    },[timeOut, onTimeOut])

    useEffect(()=>{
        console.log("intervals");
        setInterval(()=>{
           const interval= setRemainingTime((prevTime)=> prevTime -100);
           return ()=>{clearInterval(interval)}
        
        },100);
    },[])
    return(
        <progress id="question-time" max={timeOut}  value={remainingTime}/>
    )
}