import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)

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

  function NextQuetsion(){
    setQuestionState(questionState + 1)
    if(questionState === render.length - 1){
      setQuestionState(0)
      alert('Complete Quiz')
    }
  }
  return (
    <>
    <h1>Quiz App</h1>
    {
      render.length > 0 ? <div>
        <h1>Q{questionState + 1} : {render[questionState].question.text}</h1>
        <ul>
          {[...render[questionState].incorrectAnswers , render[questionState].correctAnswer].map((item,index)=>{
            return <div key={index}>
              <li>{item}</li>
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

