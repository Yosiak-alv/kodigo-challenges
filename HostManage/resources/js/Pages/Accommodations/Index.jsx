import {Head, Link , router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Paginator from "@/Components/Paginator.jsx";
import Modal from "@/Components/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Table from "@/Components/Table.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";

export default function Index({accommodations, filters}){
    const [search, setSearch] = useState(filters.search || "");
    const isFirstRender = useRef(true);
    const [showModal, setShowModal] = useState(false);
    const [accommodationId, setAccommodationId] = useState(null);

    // Debounced search handler
    const handleSearch = useCallback(
        debounce((value) => {
            router.get("/accommodations", { search: value }, { preserveState: true, replace: true });
        }, 500), []
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handleSearch(search);
        return () => handleSearch.cancel();
    }, [search, handleSearch]);

    const openModal = (id) => {
        setAccommodationId(id);
        setShowModal(true);
    }

    const editAccommodation = (id) => {
        router.get(route('accommodations.edit', id));
    }
    const closeModal = () => {
        setAccommodationId(null);
        setShowModal(false);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   Accommodations
                </h2>
            }
        >
            <Head title="Accommodations" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div
                            className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/3">
                                <div className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500"
                                                 fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="text" id="search"
                                               value={search}
                                               onChange={(e) => setSearch(e.target.value)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                                               placeholder="Search"/>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link
                                    href={route('accommodations.create')}
                                    className="block w-full md:w-auto"
                                >
                                    <PrimaryButton>
                                        New Accommodation
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                        <Table
                            heading={
                                <>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </>
                            }
                        >
                            {accommodations.data.map((accommodation) => (
                                <tr key={accommodation.id}>
                                    <td className="px-6 py-4 border-b">{accommodation.name}</td>
                                    <td className="px-6 py-4 border-b">{accommodation.description}</td>
                                    <td className="px-6 py-4 border-b space-x-2">
                                        <SecondaryButton onClick={() => editAccommodation(accommodation.id)}>
                                            Edit
                                        </SecondaryButton>
                                        <DangerButton onClick={() => openModal(accommodation.id)} className="ms-3">
                                            Delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </Table>

                        <div className="flex justify-center mt-6">
                            <Paginator links={accommodations.links}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {accommodationId && (
                <Modal show={showModal} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete this reservation?
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                            <Link
                                method="delete"
                                as="button"
                                href={route('accommodations.destroy', accommodationId)}
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
    )
}
