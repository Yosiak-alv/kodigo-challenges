import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from "@/Components/Paginator.jsx";
import { Head, Link } from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";

export default function Index({reservations}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const openModal = (reservation) => {
        setSelectedReservation(reservation);
        setShowModal(true);
    }

    const closeModal = () => {
        setSelectedReservation(null);
        setShowModal(false);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reservations
                </h2>
            }
        >
            <Head title="Reservations" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div
                            className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/3">
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Your Reservations
                                </h2>
                            </div>
                            <div
                                className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link
                                    href={route('reservations.create')}
                                    className="block w-full md:w-auto"
                                >
                                    <PrimaryButton>
                                        Make a reservation
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between gap-4 my-12">
                            {reservations.data.length > 0 ? (
                                reservations.data.map((reservation) => (
                                    <button onClick={() => openModal(reservation)} key={reservation.id}>
                                        <div
                                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                                        >
                                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                                                {reservation.accommodation.name}
                                            </h5>
                                            <p className="font-normal text-gray-700">
                                                Check-in: {reservation.check_in}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div
                                    className="text-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <p className="text-lg font-medium text-gray-700">
                                        You don't have any reservations yet.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center mt-6">
                            <Paginator links={reservations.links}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedReservation && (
                <Modal show={showModal} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {selectedReservation.accommodation.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            {selectedReservation.accommodation.description}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                            Check-in: {selectedReservation.check_in}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <Link
                                method="delete"
                                as="button"
                                href={route('reservations.destroy', selectedReservation.id)}
                            >
                                <DangerButton onClick={closeModal} className="ms-3">
                                    Delete Reservation
                                </DangerButton>
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}

        </AuthenticatedLayout>
    );
}
