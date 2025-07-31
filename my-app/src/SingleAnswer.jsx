import './SingleAnswer.css'

const SingleAnswer = ({onClick, answer}) => {
    return(
        <button className='singleAnswer' onClick={onClick}>{answer}</button>
    )
}

export default SingleAnswer;