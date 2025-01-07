import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";


export default function CreateEdit({accommodation}) {
    const { data, setData, post, patch, errors, processing} =
        useForm({
            name: accommodation ? accommodation.name : '',
            description: accommodation ? accommodation.description : '',
        });

    const submit = (e) => {
        e.preventDefault();
        accommodation ? patch(route('accommodations.update', accommodation.id)) : post(route('accommodations.store'));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {accommodation ? 'Edit' : 'Create'} Accommodation
                </h2>
            }
        >
            <Head title={accommodation ? 'Edit Accommodation' : 'Create Accommodation' } />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name"/>

                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.name}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description"/>
                                <TextInput
                                    id="description"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.description}/>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    {accommodation ? 'Update' : 'Create'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
