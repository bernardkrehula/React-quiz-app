import './Btn.css'

const SingleBtn = ({onClick, variation, type, children}) => {
    return(
        <button className={`btn ${variation}`} type={type} onClick={onClick}>{children}</button>
    )
}

export default SingleBtn;