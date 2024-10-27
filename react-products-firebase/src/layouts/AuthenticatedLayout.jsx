import NavBar from "../components/NavBar.jsx";
// eslint-disable-next-line react/prop-types
const AuthenticatedLayout = ({children}) => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <NavBar/>

                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AuthenticatedLayout;