import {useFormik} from "formik";
import * as Yup from "yup";
import {createUser} from "../../services/user/UserService.js";
import Layout from "../Layout.jsx";
import BaseButton from "../../components/BaseButton.jsx";
import InputLabel from "../../components/form/InputLabel.jsx";
import TextInput from "../../components/form/TextInput.jsx";
import InputError from "../../components/form/InputError.jsx";

const Create = () => {
    const createMutationUser = createUser();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password:  "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8)
        }),
        onSubmit: async (values) => {
            createMutationUser.mutate(values);
        },
    });

    return(
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <div className="p-6">
                            <div className="flex flex-wrap justify-between items-center p-5 ">
                                <h1 className="text-4xl font-semibold mb-4">Create User</h1>
                            </div>
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div>
                                            <InputLabel value="Name"/>
                                            <TextInput
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.name} error={formik.errors?.name}/>
                                        </div>
                                        <div>
                                            <InputLabel value="Email"/>
                                            <TextInput
                                                id="email"
                                                type="text"
                                                placeholder="name@company.com"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.email} error={formik.errors?.email}/>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <InputLabel value="Password"/>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.password}
                                                        error={formik.errors?.password}/>
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2">
                                        <BaseButton
                                            type="submit"
                                            variant="primary"
                                            disabled={createMutationUser.isPending}
                                        >
                                            {createMutationUser.isPending ? "PROCESSING" : "Create User"}
                                        </BaseButton>
                                    </div>
                                </form>

                                {createMutationUser.isError && (
                                    <div
                                        className="mt-4 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-800"
                                    >
                                        <svg className="shrink-0 w-4 h-4" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        <div className="ms-3 text-sm font-medium">
                                            {createMutationUser.error.response?.data?.data?.message || "Something went wrong"}
                                            <ul className="mt-2 list-disc pl-4 text-sm text-red-800 dark:text-red-400">
                                                {createMutationUser.error.response?.data?.data?.errors && Object.keys(createMutationUser.error.response?.data?.data?.errors).map((key) => (
                                                    <li key={key}>{createMutationUser.error.response?.data?.data?.errors[key]}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Create;