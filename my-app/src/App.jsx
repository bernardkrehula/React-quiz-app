import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SingleBtn from './Btn'
import { throttle } from 'lodash';

function App() {
  const [ question, setQuestion ] = useState('')
  const [ tokenId, setTokenId ] = useState('');
  const url = `https://opentdb.com/api.php?amount=5&category=24&difficulty=easy&type=multiple&token=${tokenId}`;
  
    const fetchData = async() => {
      const res = await fetch('https://opentdb.com/api_token.php?command=request')
      const result = await fetch('https://opentdb.com/api_count.php?category=10')
      const data = await res.json();
      const resData = await result.json()
      const token = data.token;
      setTokenId(token)
      fetchTokenData()
      console.log(resData)
    }
    const fetchTokenData = async() => {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=24&difficulty=easy&type=multiple&token=${tokenId}`)
      const data = await res.json();
      console.log(data)
    }

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
        <SingleBtn onClick={fetchData}>Start playing</SingleBtn>
      </div>
    </>
  )
}

export default App
