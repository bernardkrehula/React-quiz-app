import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SingleBtn from './Btn'
import { throttle } from 'lodash';

function App() {
  const [ questions, setQuestions ] = useState('')
  const [ questionsProperties, setQuestionsProperties ] = useState({
    amount: '10',
    category: 'sport',
    difficulty: 'easy'
  })
  const [ tokenId, setTokenId ] = useState('');

  const url = `https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple&token=${tokenId}`;
  
    const fetchData = async() => {
      const res = await fetch('https://opentdb.com/api_token.php?command=request')
      const result = await fetch('https://opentdb.com/api_category.php')
      const data = await res.json();
      const resData = await result.json()
      const token = data.token;
      setTokenId(token)
      fetchTokenData()
      console.log(resData)
    }
    const fetchTokenData = async() => {
      const res = await fetch(`https://opentdb.com/api.php?amount=20&category=20&difficulty=easy&token=${tokenId}`)
      const data = await res.json();
      console.log(data)
    }
    const handleChange = (e) => {
      const {name, value} = e.target;
      
      setQuestionsProperties(prev => ({
        ...prev,
        [name]: value
      }))

      
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      
      console.log(questionsProperties, 'radi')
    }

  return (
    <>
      <div className='main'>
        <h1>Quiz setup</h1>
        <form onSubmit={handleSubmit}>
          <li>
            <h2>Number of questions</h2>
            <input type="number" value={questionsProperties.amount} min={0} max={20} name='amount' onChange={handleChange}/>
          </li>
          <li>
            <h2>Category</h2>
            <select id="" name='category' value={questionsProperties.category} onChange={handleChange}>
              <option value="21">sports</option>
              <option value="22">geography</option>
              <option value="20">mytholoy</option>
              <option value="25">art</option>
            </select>
          </li>
          <li>
            <h2>Difficulty</h2>
            <select id="" name='difficulty' value={questionsProperties.difficulty} onChange={handleChange}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </li>
          <SingleBtn type='submit'>Start playing</SingleBtn>
        </form>
      </div>
    </>
  )
}

export default App
