import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate,useParams } from "react-router-dom";
import { save } from "../../services/useProducts.jsx";
import { ProductService } from "../../services/productService.js";

import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import InputLabel from "../../components/form/InputLabel.jsx";
import TextInput from "../../components/form/TextInput.jsx";
import InputError from "../../components/form/InputError.jsx";
import Button from "../../components/Button.jsx";

const Create = () => {
    const navigate = useNavigate();
    const {saveProduct, loading, data, error} = save();

    const formik = useFormik({
        initialValues: {
            name: "",
            price:  0,
            stock: 0,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required().min(3),
            price: Yup.number().required().positive(),
            stock: Yup.number().required().positive().integer(),
        }),
        onSubmit: async (values) => {
            await saveProduct(values);
            if(!loading && !error) {
                navigate("/products");
            }
        },
    });

    return(
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg text-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create Product</h1>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <InputLabel value="Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            placeholder="Enter a name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputError touched={formik.touched.name} error={formik.errors.name} />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel value="Price" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputError touched={formik.touched.price} error={formik.errors.price} />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel value="Stock" />
                                        <TextInput
                                            id="stock"
                                            type="number"
                                            value={formik.values.stock}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputError touched={formik.touched.stock} error={formik.errors.stock} />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <div role="status" className="mr-2">
                                                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        )}
                                        Create Product
                                    </Button>
                                </div>
                            </form>
                            {error && (
                                <div className="flex justify-start">
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">Error:</strong>
                                        <span className="block sm:inline">{error.message || "Something went wrong!"}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
)
};

export default Create;