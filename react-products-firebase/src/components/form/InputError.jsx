const InputError = ({ touched, error }) => {
    return (
        <div className="mt-4 text-red-500 capitalize-first">
            {touched && error ? error : null}
        </div>
    );
}

export default InputError;