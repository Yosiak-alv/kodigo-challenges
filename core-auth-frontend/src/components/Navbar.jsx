import {useState} from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="shrink-0 flex items-center">
                            <img src="/vite.svg" alt="Logo" className="block h-9 w-auto fill-current text-gray-800"/>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700">
                                Dashboard
                            </Link>
                            <Link to="/users" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700">
                                Users
                            </Link>
                        </div>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={showingNavigationDropdown ? "hidden" : "inline-flex"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {showingNavigationDropdown && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/dashboard" className="text-sm font-medium leading-5 text-gray-500 block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                        <Link to="/users" className="text-sm font-medium leading-5 text-gray-500 block px-4 py-2 hover:bg-gray-100">Users</Link>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            {/* eslint-disable-next-line react/prop-types */}
                            <div className="font-medium text-base text-gray-800"></div>
                            {/* eslint-disable-next-line react/prop-types */}
                            <div className="font-medium text-sm text-gray-500"></div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link to="/logout" className="text-sm font-medium leading-5 text-gray-500 block px-4 py-2 hover:bg-gray-100">Log Out</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;