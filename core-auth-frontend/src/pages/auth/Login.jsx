import TextInput from "../../components/form/TextInput.jsx";
import InputLabel from "../../components/form/InputLabel.jsx";
import InputError from "../../components/form/InputError.jsx";
import BaseButton from "../../components/BaseButton.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {doLogin} from "../../services/auth/AuthService.js";
const Login = () => {
    const loginMutation = doLogin();

    const formik = useFormik({
        initialValues: {
            email: "",
            password:  "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        }),
        onSubmit: async (values) => {
            loginMutation.mutate(values);
        },
    });

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
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
                            <div>
                                <InputLabel value="Password"/>
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <InputError touched={formik.touched?.password} error={formik.errors?.password}/>
                            </div>
                            <div className="flex items-center justify-end">
                                <BaseButton
                                    type="submit"
                                    variant="primary"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "PROCESSING" : "Sign up"}
                                </BaseButton>
                            </div>

                            {loginMutation.isError && (
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
                                        {loginMutation.error.response?.data?.data?.message || "Something went wrong"}
                                        <ul className="mt-2 list-disc pl-4 text-sm text-red-800 dark:text-red-400">
                                            {loginMutation.error.response?.data?.data?.errors && Object.keys(loginMutation.error.response?.data?.data?.errors).map((key) => (
                                                <li key={key}>{loginMutation.error.response?.data?.data?.errors[key]}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login