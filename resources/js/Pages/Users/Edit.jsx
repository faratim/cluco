import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-[#0df0e7]">
                        Edit User
                    </h2>
                </div>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#121b2b] overflow-hidden shadow-sm sm:rounded-lg border border-[#0df0e7]">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="password"
                                        value="New Password (leave blank to keep current)"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm New Password"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route("users.index")}
                                        className="text-[#0df0e7] hover:text-[#0df0e7]/80 font-semibold px-6 py-3"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#0df0e7] text-[#121b2b] hover:bg-[#0df0e7]/90 focus:ring-2 focus:ring-[#0df0e7]/50 font-bold uppercase tracking-wider px-8 py-3 rounded transition-all duration-200 shadow-lg shadow-[#0df0e7]/20"
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
