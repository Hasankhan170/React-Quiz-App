import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)
  const [score,setScore] = useState(0)
  const [WrongScore,setWrongScore] = useState(0)
  const checkedInput = useRef([])

 //Api Handling
  try {
    useEffect(()=>{
      axios('https://the-trivia-api.com/v2/questions')
      .then((res)=>{
        console.log(res.data)
        setRender(shuffleArray(res.data))
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
    
    console.log(render.length);
    
    const checkedButton = checkedInput.current.find(input => input.checked);

    if(!checkedButton){
      alert('Please select an option');
      return; 
    }

    
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);

      // store selectAnswer
      if(selectedValue === render[questionState].correctAnswer){
        setScore(score + 1)
        console.log(score);
      }else{
        setWrongScore(WrongScore + 1)
        console.log(WrongScore);
      }
      
      
  
    const next = questionState + 1
    if(next >= render.length - 1){
      alert(`Complete Quiz. Your score is ${score}/9`)
      // setQuestionState(0)
      // setScore(0);
      // setWrongScore(0);
      setRender(shuffleArray(render))
    }else{
      setQuestionState(next);
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
        <h3>{`Correct Answer :${score}`}</h3>
        <h3>{`Wrong Answer :${WrongScore}`}</h3>
        <h1>{`Total : 9`}</h1>
      </div>:<h1>Loading...</h1>
    }
    </>
  )
}

export default App;




