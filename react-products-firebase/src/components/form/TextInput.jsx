
const TextInput = ({ id, type, placeholder, value, onChange, onBlur }) => {
    return (
        <input
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

export default TextInput;