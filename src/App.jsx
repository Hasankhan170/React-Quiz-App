import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App(){
  const [render,setRender] = useState([])

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
  return (
    <>
    <h1>Quiz App</h1>
    {
      <h1>Q:1{render.question.text}</h1>
    }
    </>
  )
}

export default App;

