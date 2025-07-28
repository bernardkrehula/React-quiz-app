import './Btn.css'

const SingleBtn = ({onClick, type, children}) => {
    return(
        <button className="btn" type={type} onClick={onClick}>{children}</button>
    )
}

export default SingleBtn;