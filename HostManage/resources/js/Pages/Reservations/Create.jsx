import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, Head } from '@inertiajs/react';
import { useRef } from 'react';
import {Transition} from "@headlessui/react";
export default function Create({accommodations}) {

    const { data, setData, post, processing, errors} = useForm({
        accommodation_id: '',
        check_in:  '',
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('reservations.store'));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Reservation
                </h2>
            }
        >
            <Head title="Create Reservation" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="accommodations" value="Accommodations"/>
                                <select
                                    id="accommodation_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                    value={data.accommodation_id}
                                    onChange={(e) => setData('accommodation_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select an accommodation</option>
                                    {accommodations.map((accommodation) => (
                                        <option key={accommodation.id} value={accommodation.id}>
                                            {accommodation.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.accommodation_id}/>
                             </div>

                            <div>
                                <InputLabel htmlFor="check_in" value="Check in"/>
                                <input required type="date" id="check_in"
                                       value={data.check_in}
                                       onChange={(e) => setData('check_in', e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:border-red-500 focus:ring-red-500 block w-full ps-10 p-2.5"/>
                                <InputError className="mt-2" message={errors.check_in}/>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Create Reservation
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
