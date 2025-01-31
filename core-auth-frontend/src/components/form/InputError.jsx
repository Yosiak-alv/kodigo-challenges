// eslint-disable-next-line react/prop-types
const InputError = ({ touched, error }) => {
    return (
        <div>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {touched && error ? error : null}
            </p>
        </div>
    );
}

export default InputError;