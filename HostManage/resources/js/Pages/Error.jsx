import React from "react";
const ErrorPage = ({ status }) => {
    const description = {
        503: "SERVICE UNAVAILABLE.",
        500: "SERVER ERROR.",
        404: "PAGE NOT FOUND.",
        403: "ACTION NOT AUTHORIZED.",
    }[status];

    return (
        <>
            <title>Error</title>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                        <div className="px-4 text-lg text-gray-300 border-r border-gray-400 tracking-wider">
                            {status}
                        </div>
                        <div className="ml-4 text-lg text-gray-300 uppercase tracking-wider">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ErrorPage;
