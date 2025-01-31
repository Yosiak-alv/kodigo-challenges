import Layout from "../Layout.jsx";
import {getAuthenticatedUser,updateAuthenticatedUserPassword} from "../../services/auth/AuthService.js";
import {useFormik} from "formik";
import * as Yup from "yup";
import InputError from "../../components/form/InputError.jsx";
import TextInput from "../../components/form/TextInput.jsx";
import InputLabel from "../../components/form/InputLabel.jsx";
import BaseButton from "../../components/BaseButton.jsx";

const Profile = () => {
    const updatePasswordMutation = updateAuthenticatedUserPassword();
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            password_confirmation:  "",
        },
        validationSchema: Yup.object().shape({
            currentPassword: Yup.string().required().min(8),
            password: Yup.string().required().min(8),
            password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            updatePasswordMutation.mutate(values);
        },
    });

    const {isLoading,isSuccess, isError, data, error } = getAuthenticatedUser();

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg  text-gray-900 dark:text-gray-100">
                        <div className="mt-6 space-y-6">
                            {isLoading && <div className="flex justify-center items-center w-full">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>}
                            {isError && <div
                                className="mt-4 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-800"
                            >
                                <svg className="shrink-0 w-4 h-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <div className="ms-3 text-sm font-medium">
                                    {error?.response?.data?.data?.message || "Something went wrong"}
                                    <ul className="mt-2 list-disc pl-4 text-sm text-red-800 dark:text-red-400">
                                        {error?.response?.data?.data?.errors && Object.keys(error?.response?.data?.data?.errors).map((key) => (
                                            <li key={key}>{error?.response?.data?.data?.errors[key]}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>}

                            {isSuccess && <div className="flex flex-wrap my-2">
                                <div className="mx-auto w-full text-center">
                                    <span className="inline text-3xl h-fit">{data?.data.user.name}</span>
                                    <div className="mt-2 text-lg">
                                        <span className="font-semibold">Email:</span> {data?.data.user.email}
                                        <br/>
                                        <span className="font-semibold">Created At:</span> {data?.data.user.created_at}
                                        <br/>
                                        <span className="font-semibold">Updated At:</span> {data?.data.user.updated_at}
                                    </div>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="w-full mt-8">
                                    <div className="text-center">
                                        <h2 className="text-4xl font-semibold mb-4">Update your Password</h2>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div>
                                            <InputLabel value="Current Password"/>
                                            <TextInput
                                                id="currentPassword"
                                                type="password"
                                                placeholder="Password"
                                                value={formik.values.currentPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.currentPassword}
                                                        error={formik.errors?.currentPassword}/>
                                        </div>
                                        <div>
                                            <InputLabel value="Password"/>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.password}
                                                        error={formik.errors?.password}/>
                                        </div>
                                        <div>
                                            <InputLabel value="Confirm Password"/>
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={formik.values.password_confirmation}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <InputError touched={formik.touched?.password_confirmation}
                                                        error={formik.errors?.password_confirmation}/>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <BaseButton
                                            type="submit"
                                            variant="primary"
                                            disabled={updatePasswordMutation.isPending}
                                        >
                                            {updatePasswordMutation.isPending ? "PROCESSING" : "Update Password"}
                                        </BaseButton>
                                    </div>
                                </form>
                            </div>}
                        </div>
                        {updatePasswordMutation.isError && <div
                            className="mt-4 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-800"
                        >
                            <svg className="shrink-0 w-4 h-4" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {updatePasswordMutation.error?.response?.data?.data?.message || "Something went wrong"}
                                <ul className="mt-2 list-disc pl-4 text-sm text-red-800 dark:text-red-400">
                                    {updatePasswordMutation.error?.response?.data?.data?.errors && Object.keys(updatePasswordMutation.error?.response?.data?.data?.errors).map((key) => (
                                        <li key={key}>{updatePasswordMutation.error?.response?.data?.data?.errors[key]}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export default Profile;