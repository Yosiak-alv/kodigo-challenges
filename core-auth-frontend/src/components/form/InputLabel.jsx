// eslint-disable-next-line react/prop-types
const InputLabel = ({ value, children }) => {
    return (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {value ? value : children}
        </label>
    );
}

export default InputLabel;