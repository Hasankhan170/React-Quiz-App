import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])
  const [questionState,setQuestionState] = useState(0)
  const checkedInput = useRef([])

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
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);

    }
    setQuestionState(questionState + 1)
    if(questionState >= render.length - 1){
      setQuestionState(0)
      alert('Complete Quiz')
    }

    checkedInput.current.forEach(input=>{
      if(input){
        input.checked = false;
        input.value = "";
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

      </div>:<h1>Loading...</h1>
    }
    </>
  )
}

export default App;




// import axios from "axios";
// import { useState, useEffect } from "react";

// function App() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [shuffledAnswers, setShuffledAnswers] = useState([]);

//   useEffect(() => {
//     axios('https://the-trivia-api.com/v2/questions')
//       .then((res) => {
//         const fetchedQuestions = res.data;
//         setQuestions(fetchedQuestions);
//         if (fetchedQuestions.length > 0) {
//           shuffleAndSetAnswers(fetchedQuestions[0]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       shuffleAndSetAnswers(questions[currentQuestionIndex]);
//     }
//   }, [currentQuestionIndex, questions]);

//   function shuffleAndSetAnswers(question) {
//     const answers = [...question.incorrectAnswers, question.correctAnswer];
//     setShuffledAnswers(shuffleArray(answers));
//   }

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   function handleNextQuestion() {
//     setCurrentQuestionIndex((prevIndex) => {
//       const nextIndex = prevIndex + 1;
//       if (nextIndex >= questions.length) {
//         alert('Complete Quiz');
//         return 0;
//       }
//       return nextIndex;
//     });
//     setSelectedAnswer('');
//   }

//   return (
//     <>
//       <h1>Quiz App</h1>
//       {questions.length > 0 ? (
//         <div>
//           <h1>Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex].question.text}</h1>
//           <ul>
//             {shuffledAnswers.map((item, index) => (
//               <div key={index}>
//                 <li>
//                   <input
//                     id={`answer-${index}`}
//                     name="quiz"
//                     type="radio"
//                     value={item}
//                     checked={selectedAnswer === item}
//                     onChange={(e) => setSelectedAnswer(e.target.value)}
//                   />
//                   <label htmlFor={`answer-${index}`}>{item}</label>
//                 </li>
//               </div>
//             ))}
//           </ul>
//           <button onClick={handleNextQuestion}>Next</button>
//         </div>
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </>
//   );
// }

// export default App;


