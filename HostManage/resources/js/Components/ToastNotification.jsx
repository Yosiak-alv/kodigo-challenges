import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function ToastNotification() {
    const { props } = usePage(); // Accessing Inertia props
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Update toast state when props change
        const toast = props.toast || {};
        if (toast.message && !show) {
            setType(toast.type || "");
            setMessage(toast.message || "");
            setShow(true);

            // Auto-hide the toast after 5 seconds
            const timeout = setTimeout(() => {
                close();
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [props.toast, show]);

    const close = () => {
        setShow(false);
        setType("");
        setMessage("");
        props.toast.type = null;
        props.toast.message = null;
        console.log(props.toast);
    };

    if (!show || !message) return null;

    return (
        <div
            id="alert-border-3"
            className={`flex items-center p-4 mb-4 max-w-7xl mx-auto fixed inset-x-0 bottom-0 text-green-800 border-t-4 rounded-lg shadow-lg
        ${type === "success" && "text-green-800 border-green-300 bg-green-50"}
        ${type === "error" && "text-red-800 border-red-300 bg-red-50"}
        ${type === "warning" && "text-yellow-800 border-yellow-300 bg-yellow-50"}
      `}
            role="alert"
        >
            <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium">{message}</div>
            <button
                type="button"
                className={`ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8
          ${type === "success" && "bg-green-50 text-green-500"}
          ${type === "error" && "bg-red-50 text-red-500"}
          ${type === "warning" && "bg-yellow-50 text-yellow-500"}
        `}
                aria-label="Close"
                onClick={close}
            >
                <span className="sr-only">Dismiss</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};
