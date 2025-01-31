import {useQuery, useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {axiosRouteWithToken} from "../../utils/httpInstance.js";

const fetchDashboard = async () => {
    const response = await axiosRouteWithToken.get('/users/dashboard');
    console.log("API Response:", response.data);
    return response.data;
};

const fetchUsers = async () => {
    const response = await axiosRouteWithToken.get('/users');
    console.log("API Response:", response.data);
    return response.data;
}

const fetchUser = async (id) => {
    const response = await axiosRouteWithToken.get(`/users/${id}`);
    console.log("API Response:", response.data);
    return response.data;
}

const storeUser = async (data) => {
    const response = await axiosRouteWithToken.post('/users', data);
    console.log("API Response:", response.data);
    return response.data;
}

const updateUser = async (id,data) => {
    const response = await axiosRouteWithToken.put(`/users/${id}`, data);
    console.log("API Response:", response.data);
    return response.data;
}

const deleteUser = async (id) => {
    const response = await axiosRouteWithToken.delete(`/users/${id}`);
    console.log("API Response:", response.data);
    return response.data;
}

export const getDashboard = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: fetchDashboard,
        refetchOnWindowFocus: false,
    });
}

export const getUsers = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,
    });
}

export const getUser = (id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
        refetchOnWindowFocus: false,
    });
}

export const createUser = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: storeUser,
        refetchQueries: ['users'],
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Created!",
                text: data?.data?.message || "User has been created successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                navigate('/users');
            });
        }
    });
}

export const editUser = (id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: (data) => updateUser(id,data),
        refetchQueries: ['users'],
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Updated!",
                text: data?.data?.message || "User has been updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                navigate('/users');
            });
        }
    });
}

export const destroyUser = (id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: () => deleteUser(id),
        refetchQueries: ['users'],
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(JSON.stringify(data));
            Swal.fire({
                title: "Deleted!",
                text: data?.data?.message || "User has been removed successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                navigate('/users');
            });
        }
    });
}