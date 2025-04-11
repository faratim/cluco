import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, users = [], flash = {} }) {
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Get current page of users
    const currentUsers = users.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    // Calculate the range of users being displayed
    const startUser = currentPage * usersPerPage + 1;
    const endUser = Math.min((currentPage + 1) * usersPerPage, users.length);

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Delete user function
    const deleteUser = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.destroy", userId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Check if we need to go to the previous page
                    if (
                        currentUsers.length === 1 &&
                        currentPage > 0 &&
                        users.length > usersPerPage
                    ) {
                        setCurrentPage(currentPage - 1);
                    }
                },
            });
        }
    };

    // Determine if pagination is needed
    const needsPagination = users.length > usersPerPage;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-[#0dc5c1]">
                        User Management
                    </h2>
                </div>
            }
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-6 p-4 bg-[#0df0e7] bg-opacity-10 border border-[#0df0e7] text-[#0df0e7] rounded">
                            {flash.success}
                        </div>
                    )}

                    {flash.error && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 text-red-400 rounded">
                            {flash.error}
                        </div>
                    )}

                    <div className="bg-[#121b2b] overflow-hidden shadow-lg shadow-black/20 sm:rounded-lg border border-[#0df0e7]/30">
                        <div className="p-6 text-[#0df0e7] text-2xl font-bold mb-4 border-b border-[#0df0e7]/30">
                            User List
                        </div>

                        <div className="p-6 pt-0">
                            {users.length === 0 ? (
                                <div className="text-center py-6 text-[#7aedd6]">
                                    No users found.
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-[#0df0e7]/30">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0df0e7] uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0df0e7] uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0df0e7] uppercase tracking-wider">
                                                        Created
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0df0e7] uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#0df0e7]/30">
                                                {currentUsers.map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="hover:bg-[#0df0e7]/10 transition"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff]">
                                                            {user.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0df0e7]">
                                                            {user.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7aedd6]">
                                                            {user.created_at}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex gap-2">
                                                                <Link
                                                                    href={route(
                                                                        "users.edit",
                                                                        user.id
                                                                    )}
                                                                    className="text-[#0dc5c1] hover:text-[#0dc5c1]/80"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                                {/* Don't show delete button for the current user */}
                                                                {user.id !==
                                                                    auth.user
                                                                        .id && (
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteUser(
                                                                                user.id
                                                                            )
                                                                        }
                                                                        className="text-red-500 hover:text-red-400"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {needsPagination && (
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-sm text-[#0df0e7]">
                                                Showing {startUser}-{endUser} of{" "}
                                                {users.length} users
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={goToPreviousPage}
                                                    disabled={currentPage === 0}
                                                    className={`p-2 rounded-full ${
                                                        currentPage === 0
                                                            ? "text-gray-600 cursor-not-allowed"
                                                            : "text-[#0df0e7] hover:bg-[#0df0e7]/10"
                                                    }`}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={goToNextPage}
                                                    disabled={
                                                        currentPage ===
                                                        totalPages - 1
                                                    }
                                                    className={`p-2 rounded-full ${
                                                        currentPage ===
                                                        totalPages - 1
                                                            ? "text-gray-600 cursor-not-allowed"
                                                            : "text-[#0df0e7] hover:bg-[#0df0e7]/10"
                                                    }`}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
