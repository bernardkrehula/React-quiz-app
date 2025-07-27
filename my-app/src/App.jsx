import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SingleBtn from './Btn'

function App() {
  
  const url = `https://opentdb.com/api.php?amount=5&category=24&difficulty=easy&type=multiple`;
 
  return (
    <>
      <div className='main'>
        <h1>Quiz setup</h1>
        <ul>
          <li>
            <h2>Number of questions</h2>
            <input type="number" value='10'/>
          </li>
          <li>
            <h2>Category</h2>
            <select name="" id="">
              <option value="">Sports</option>
            </select>
          </li>
          <li>
            <h2>Difficulty</h2>
            <select name="" id="">
              <option value=""></option>
            </select>
          </li>
        </ul>
        <SingleBtn>Start playing</SingleBtn>
      </div>
    </>
  )
}

export default App
