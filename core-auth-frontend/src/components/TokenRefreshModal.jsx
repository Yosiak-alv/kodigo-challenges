import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { doLogout, refreshAuthToken } from "../services/auth/AuthService.js";

const TokenRefreshModal = () => {
    const refreshMutation = refreshAuthToken();
    const logoutMutation = doLogout();
    const modalRef = useRef(false); // Track modal state
    const expiryTime = localStorage.getItem("expiresAt");

    useEffect(() => {
        const interval = setInterval(() => {
            if (!modalRef.current) {
                triggerModal();
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const triggerModal = () => {
        modalRef.current = true; // Mark modal as active
        let countdown = 60;

        const countdownInterval = setInterval(() => {
            countdown--;

            if (Swal.isVisible()) {
                Swal.update({
                    title: `Session Expiring, ${expiryTime}`,
                    text: `Your session is about to expire in ${countdown} seconds. Do you want to refresh your token?`,
                    icon: "warning",
                });
            }

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                Swal.close();
                modalRef.current = false;
                logoutMutation.mutate();
            }
        }, 1000);

        Swal.fire({
            title: `Session Expiring, ${expiryTime}`,
            text: `Your session is about to expire in 60 seconds. Do you want to refresh your token?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Refresh",
            cancelButtonText: "Logout",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.getConfirmButton().focus();
            },
            willClose: () => {
                clearInterval(countdownInterval);
                modalRef.current = false;
            },
        }).then((result) => {
            clearInterval(countdownInterval);
            modalRef.current = false;

            if (result.isConfirmed) {
                refreshMutation.mutate();
            } else {
                logoutMutation.mutate();
            }
        });
    };

    return null;
};

export default TokenRefreshModal;