import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)
  const checkedInput = useRef([])
  const [score,setScore] = useState(0)

 //Api Handling
  try {
    useEffect(()=>{
      axios('https://the-trivia-api.com/v2/questions')
      .then((res)=>{
        console.log(res.data)
        setRender(res.data)
      })
      .catch((err)=>{
        console.log(err);
        
      })
    },[])
  } catch (error) {
    console.log(error);
  }

  // shuffle Array 
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }

//  Next Question 
  function NextQuetsion(){

    const checkedButton = checkedInput.current.find(input => input.checked);

    if(!checkedButton){
      alert('Please select an option');
      return; 
    }

    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);

      // store selectAnswer
      if(selectedValue === render[questionState].correctAnswer){
        setScore(score + 1)
        console.log(score);
      }
      
      
      
    }
    setQuestionState(questionState + 1)
    if(questionState >= render.length - 1){
      alert(`Complete Quiz. Your score is ${score}/${render.length}`)
      setQuestionState(0)
      setScore(0);
      return 0;
    }



    checkedInput.current.forEach(input=>{
      if(input){
        input.checked = false;
      }
    })
  }

  
  
  //return JSX
  return (
    <>
    <h1>Quiz App</h1>
    {
      render.length > 0 ? <div>
        <h1>Q{questionState + 1} : {render[questionState].question.text}</h1>
        <ol>
          {shuffleArray([...render[questionState].incorrectAnswers , render[questionState].correctAnswer]).map((item,index)=>{
            return <div key={index}>
              <li><input id={item} name="quiz" type="radio" value={item} ref={e=>(checkedInput.current[index] = e)} />
              <label htmlFor={item}>{item}</label>
              </li>
            </div>
          })}
        </ol>
        <button onClick={NextQuetsion}>Next</button>
        <h1>{`Total Score :${score}/${render.length}`}</h1>
      </div>:<h1>Loading...</h1>
    }
    </>
  )
}

export default App;




