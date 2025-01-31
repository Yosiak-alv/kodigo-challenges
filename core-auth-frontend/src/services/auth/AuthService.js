import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from "react-router-dom";
import {axiosRouteWithoutToken, axiosRouteWithToken} from "../../utils/httpInstance.js";
import Swal from "sweetalert2";

const login = async (credentials) => {
    const response = await axiosRouteWithoutToken.post('/auth/login', credentials);
    console.log("API Response:", response.data);
    return response.data;
};

const logout = async () => {
    const response = await axiosRouteWithToken.post('/auth/logout');
    console.log("API Response:", response.data);
    return response.data;
}

const getCurrentUser = async () => {
    const response = await axiosRouteWithToken.get('/auth/me');
    console.log("API Response:", response.data);
    return response.data;
}

const updatePassword = async (passwords) => {
    const response = await axiosRouteWithToken.patch('/auth/update-password', passwords);
    console.log("API Response:", response.data);
    return response.data;
}

const refreshToken = async () => {
    const response = await axiosRouteWithToken.post('/auth/refresh-token');
    console.log("API Response:", response.data);
    return response.data;
}

export const doLogin = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: login,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            localStorage.setItem('authToken', data?.data?.token);
            localStorage.setItem('expiresAt', data?.data?.expires_at);
            navigate('/dashboard');
        },
    });
}

export const doLogout = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: logout,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('expiresAt');
            queryClient.clear();
            navigate('/');
        },
    });
}

export const getAuthenticatedUser = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ['authUser'],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
    });
}

export const updateAuthenticatedUserPassword = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: updatePassword,
        refetchQueries: ['authUser'],
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('authUser');
            Swal.fire({
                title: "Updated!",
                text: data?.data?.message || "User password has been updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            });
        },
    });
}

export const refreshAuthToken = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: refreshToken,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            queryClient.clear();
            localStorage.setItem('authToken', data?.data?.token);
            localStorage.setItem('expiresAt', data?.data?.expires_at);
        },
    });
}