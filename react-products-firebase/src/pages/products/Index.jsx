import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { findAllProducts } from "../../services/useProducts.jsx";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button.jsx";

const Index = () => {
    const navigate = useNavigate();
    const {loading, data: products, error} = findAllProducts();
    
    return(
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white rounded-md shadow-md">
                        <div
                            className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                            <div
                                className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <Button
                                        onClick={() => navigate("/products/create")}
                                        variant="primary"
                                    >
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path d="M5 12h14"/>
                                            <path d="M12 5v14"/>
                                        </svg>
                                        &nbsp; Create Product
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {loading ? ( 
                            <div role="status" className="flex justify-center items-center">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error:</strong>
                                <span className="block sm:inline">{error.message || "Something went wrong!"}</span>
                            </div>
                        ) : (
                            <Table
                                headers={[
                                    { label: "ID", key: "id" },
                                    { label: "Name", key: "name" },
                                    { label: "Price", key: "price" },
                                    { label: "Stock", key: "stock" },
                                ]}
                                data={products}
                                href="/products"
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;