import './Btn.css'

const SingleBtn = ({onClick, children}) => {
    return(
        <button className="btn" onClick={onClick}>{children}</button>
    )
}

export default SingleBtn;