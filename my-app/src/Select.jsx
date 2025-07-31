

const Select = ({options, value, handleChange}) => {
    
    return(
        <select name='category' value={value} onChange={handleChange}>
            {options.map(option => {
                return(
                    <option key={option.value} value={option.value}>{option.type}</option>
                )
            })}
        </select>
    )
}

export default Select;