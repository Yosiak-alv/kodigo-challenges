const InputLabel = ({ value, children }) => {
    return (
        <label className="block font-medium text-sm text-gray-700">
            {value ? value : children}
        </label>
    );
}

export default InputLabel;