import Layout from "../Layout.jsx";
import {getDashboard} from "../../services/user/UserService.js";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";
const Dashboard = () => {
    const {isLoading,isSuccess, isError, data: userStatistics, error } =  getDashboard();

    return (
        <Layout>
            <div className="py-12">
                <div className="flex justify-center items-center w-full">
                    {isLoading && <div role="status" className="flex items-center">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>}

                    {isError && <div
                                     className="mt-4 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-800"
                    >
                        <svg className="shrink-0 w-4 h-4" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            {error.response?.data?.data?.message || "Something went wrong"}
                            <ul className="mt-2 list-disc pl-4 text-sm text-red-800 dark:text-red-400">
                                {error?.response?.data?.data?.errors && Object.keys(error.response?.data?.data?.errors).map((key) => (
                                    <li key={key}>{error.response?.data?.data?.errors[key]}</li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                    {isSuccess && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900 dark:text-gray-100">
                        {/* Daily Registrations */}
                        <div
                            className="p-6 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                            <FaCalendarDay className="text-blue-500 text-4xl mb-2"/>
                            <h3 className="font-semibold text-lg text-center">Daily Registrations</h3>
                            <ul className="mt-2 text-gray-700 dark:text-gray-300">
                                {userStatistics?.data.daily.map((item, index) => (
                                    <li key={index} className="text-center">
                                        {item.date}: <span className="font-semibold">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Weekly Registrations */}
                        <div
                            className="p-6 bg-green-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                            <FaCalendarWeek className="text-green-500 text-4xl mb-2"/>
                            <h3 className="font-semibold text-lg text-center">Weekly Registrations</h3>
                            <ul className="mt-2 text-gray-700 dark:text-gray-300">
                                {userStatistics?.data.weekly.map((item, index) => (
                                    <li key={index} className="text-center">
                                        {item.week}: <span className="font-semibold">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Monthly Registrations */}
                        <div
                            className="p-6 bg-yellow-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                            <FaCalendarAlt className="text-yellow-500 text-4xl mb-2"/>
                            <h3 className="font-semibold text-lg text-center">Monthly Registrations</h3>
                            <ul className="mt-2 text-gray-700 dark:text-gray-300">
                                {userStatistics?.data.monthly.map((item, index) => (
                                    <li key={index} className="text-center">
                                        {item.month}: <span className="font-semibold">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>
        </Layout>
    )
};

export default Dashboard;