

const NotFound = () => {
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-900 sm:items-center sm:pt-0">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                    <div className="px-4 text-lg text-gray-300 border-r border-gray-400 tracking-wider">
                        404
                    </div>

                    <div className="ml-4 text-lg text-gray-300 uppercase tracking-wider">
                        NOT FOUND
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;