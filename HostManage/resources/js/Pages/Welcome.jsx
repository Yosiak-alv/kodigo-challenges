import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, accommodations }) {

    console.log(accommodations);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center text-center">
                               <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                    Welcome, this are our accommodations
                               </h1>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex flex-wrap justify-between gap-4 my-12">
                                {accommodations.length > 0 ? (
                                    accommodations.map((accommodation) => (
                                        <div
                                            key={accommodation.id}
                                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                                        >
                                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                                                {accommodation.name}
                                            </h5>
                                            <p className="font-normal text-gray-700">
                                                {accommodation.description}
                                            </p>
                                        </div>
                                    ))
                                    ) : (
                                    <div
                                        className="text-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                                        <p className="text-lg font-medium text-gray-700">
                                            Not Accommodations register yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
