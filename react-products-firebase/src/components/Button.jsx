// eslint-disable-next-line react/prop-types
const Button = ({ children, type = 'button', variant = 'primary', onClick, disabled }) => {
    let baseStyle = "inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150";

    let variantStyles = {
        primary: "bg-gray-800 border-transparent text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:ring-indigo-500",
        secondary: "bg-white border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-indigo-500",
        danger: "bg-red-600 border-transparent text-white hover:bg-red-500 active:bg-red-700 focus:ring-red-500"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variantStyles[variant]} ${disabled ? "opacity-25 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
};

export default Button;