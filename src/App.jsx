import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)
  const [selectAnswer,setSelectAnswer] = useState('')

  try {
    useEffect(()=>{
      axios('https://the-trivia-api.com/v2/questions')
      .then((res)=>{
        console.log(res.data);
        setRender(res.data)
      })
      .catch((err)=>{
        console.log(err);
        
      })
    },[])
  } catch (error) {
    console.log(error);
    
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }

  function NextQuetsion(){
    setQuestionState(questionState + 1)
    if(questionState === render.length - 1){
      setQuestionState(0)
      alert('Complete Quiz')
    }

    setSelectAnswer("");
  }
  return (
    <>
    <h1>Quiz App</h1>
    {
      render.length > 0 ? <div>
        <h1>Q{questionState + 1} : {render[questionState].question.text}</h1>
        <ul>
          {shuffleArray([...render[questionState].incorrectAnswers , render[questionState].correctAnswer]).map((item,index)=>{
            return <div key={index}>
              <li><input id={`${index}`} name="quiz" type="radio" value={item} checked ={selectAnswer === item} onChange={(e)=>setSelectAnswer(e.target.value)} />
              <label htmlFor={`${index}`}>{item}</label>
              </li>
            </div>
          })}
        </ul>
        <button onClick={NextQuetsion}>Next</button>

      </div>:<h1>Loading...</h1>
    }
    </>
  )
}

export default App;

