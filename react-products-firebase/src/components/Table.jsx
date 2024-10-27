import {useNavigate, Link} from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Table = ({ headers, data, href }) => {
    const navigate = useNavigate();
    const navigateTo = (id) => navigate(href + "/" + id);
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-gray-700 text-xs uppercase bg-gray-50">
                    <tr>
                        {/* eslint-disable-next-line react/prop-types */}
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3">
                                {header.label}
                            </th>
                        ))}
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* eslint-disable-next-line react/prop-types */}
                    {data.length > 0 ? (
                        // eslint-disable-next-line react/prop-types
                        data.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                {/* eslint-disable-next-line react/prop-types */}
                                {headers.map((header) => (
                                    <td key={header.key} className="px-6 py-4">
                                        {item[header.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => navigateTo(item.id)}
                                        tabIndex="-1"
                                    >
                                        <svg
                                            fill="none"
                                            className="block w-6 h-6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                            ></path>
                                        </svg>
                                    </button>
                                    {/* <Link to={navigate(href + "/" + item.id)} tabIndex="-1">
                                        <svg
                                            fill="none"
                                            className="block w-6 h-6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                            ></path>
                                        </svg>
                                    </Link> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                colSpan={headers.length + 1}>
                                Sorry, no data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;