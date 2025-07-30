import { useState } from 'react'
import './App.css'
import SingleBtn from './Btn'

//Ako trazis vise od 20 pitanja za neku kategoriju pod nekim uvjetima a nema toliko pitanja napisi npr nismo u mogucnosti isporuciti 20 teskih pitanja 
function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ question, setQuestion ] = useState({});
  const [ questionsProperties, setQuestionsProperties ] = useState({
    amount: '10',
    category: '21',
    difficulty: 'easy'
  });
  const [ isStartClicked, setStartClicked ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ correctCount, setCorrectCount ] = useState(0);
  const [ isFinished, setFinished ] = useState(false);
  
    const fetchData = async() => {
      const res = await fetch('https://opentdb.com/api_token.php?command=request')
      const data = await res.json();
    
      fetchTokenData(data.token)
    }
    const fetchTokenData = async(token) => {
      const res = await fetch(`https://opentdb.com/api.php?amount=${questionsProperties.amount}&category=${questionsProperties.category}&difficulty=${questionsProperties.difficulty}&token=${token}`)
      const data = await res.json();
      setQuestions(data.results)
      setQuestion(data.results[currentIndex]);
    }
    const handleChange = (e) => {
      const {name, value} = e.target;
      
      setQuestionsProperties(prev => ({
        ...prev,
        [name]: value
      }))
    }
    const handleSubmit = async(e) => {
      e.preventDefault();
      await fetchData();
      setStartClicked(true)
    }
    const handleAnswer = (answer) => {
      const isCorrect = answer === question.correct_answer
      if(isCorrect) setCorrectCount(prev => prev + 1);

      const nextIndex = currentIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setQuestion(questions[nextIndex]);
      }
      else setFinished(true);
    }
    

    const answers = [...(question?.incorrect_answers || []), question.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <>
      <div className='main'>
        {!isStartClicked ? 
        <>
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
          </>
          :
          <>
            <h2>Correct answers: {correctCount}/{questions.length}</h2>
            <h1>{question.question}</h1>
            <ul>
              {answers.map((answer, index) => (
                <SingleBtn key={index} variation='answer' onClick={() => { handleAnswer(answer)}}>{answer}</SingleBtn>
              ))}
            </ul>
            <SingleBtn variation='next-question' onClick={ handleAnswer}>Next question</SingleBtn>
            {isFinished ? 
              <li className='finish'>
                <h3>Game Over!</h3>
                <p>You answered {correctCount} / {questions.length} or {correctCount/questions.length * 100}% </p>
                <SingleBtn onClick={() => setFinished(false)}>Play again?</SingleBtn>
              </li>
            :
            ''
            }
            
          </>
          }      
      </div>
    </>
  )
}

export default App
