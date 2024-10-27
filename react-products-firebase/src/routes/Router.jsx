import {Route, Routes, BrowserRouter} from "react-router-dom";
import Index from "../pages/products/Index.jsx";
import Show from "../pages/products/Show.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Error from "../pages/Error.jsx";
import Create from "../pages/products/Create.jsx";
import Edit from "../pages/products/Edit.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Add routes here */}
                <Route path="/products" element={<Index />} />
                <Route path="/products/create" element={<Create/>} />
                <Route path="/products/edit/:id" element={<Edit/>} />
                <Route path="/products/:id" element={<Show/>} />

                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="*" element={<Error/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;