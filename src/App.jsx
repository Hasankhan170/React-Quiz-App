import axios from "axios"
import { useEffect } from "react"

function App(){

  useEffect(()=>{
    axios('https://the-trivia-api.com/v2/questions')
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  return (
    <h1>Hello world</h1>
  )
  
}

export default App