import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Dashboard({ auth, puzzles = [], flash = [] }) {
    console.log("Puzzles prop:", puzzles);
    const [currentPage, setCurrentPage] = useState(0);
    const puzzlesPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(puzzles.length / puzzlesPerPage);

    // Get current page of puzzles
    const currentPuzzles = puzzles.slice(
        currentPage * puzzlesPerPage,
        (currentPage + 1) * puzzlesPerPage
    );

    // Calculate the range of puzzles being displayed
    const startPuzzle = currentPage * puzzlesPerPage + 1;
    const endPuzzle = Math.min(
        (currentPage + 1) * puzzlesPerPage,
        puzzles.length
    );

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

    // Delete puzzle function
    const deletePuzzle = (puzzleId) => {
        if (confirm("Are you sure you want to delete this puzzle?")) {
            router.delete(route("puzzles.destroy", puzzleId), {
                preserveScroll: true,
            });
        }
    };

    // Determine if pagination is needed
    const needsPagination = puzzles.length > puzzlesPerPage;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-[#0dc5c1]">
                        Puzzle Management
                    </h2>
                    <Link
                        href={route("puzzles.create")}
                        className="bg-[#0dc5c1] text-[#121b2b] px-4 py-2 rounded hover:bg-[#0dc5c1]/80 transition"
                    >
                        Add New Puzzle
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-6 p-4 bg-[#0dc5c1] bg-opacity-20 border border-[#0dc5c1] text-[#0dc5c1] rounded">
                            {flash.success}
                        </div>
                    )}

                    {flash.error && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded">
                            {flash.error}
                        </div>
                    )}

                    <div className="bg-[#121b2b] overflow-hidden shadow-sm sm:rounded-lg border border-[#0dc5c1]">
                        <div className="p-6 text-[#0dc5c1] text-2xl font-bold mb-4 border-b border-[#0dc5c1]/30">
                            Puzzle List
                        </div>

                        <div className="p-6 pt-0">
                            {puzzles.length === 0 ? (
                                <div className="text-center py-6 text-gray-300">
                                    No puzzles found. Click "Add New Puzzle" to
                                    create one.
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-[#0dc5c1]/30">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0dc5c1] uppercase tracking-wider">
                                                        #
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0dc5c1] uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0dc5c1] uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0dc5c1] uppercase tracking-wider">
                                                        Answer
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0dc5c1] uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#0dc5c1]/30">
                                                {currentPuzzles.map(
                                                    (puzzle, index) => (
                                                        <tr
                                                            key={puzzle.id}
                                                            className="hover:bg-[#0dc5c1]/10 transition"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                                {puzzle.number}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0dc5c1]">
                                                                {puzzle.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                                        puzzle.solved
                                                                            ? "bg-[#0dc5c1]/20 text-[#0dc5c1]"
                                                                            : "bg-blue-500/20 text-blue-500"
                                                                    }`}
                                                                >
                                                                    {puzzle.solved
                                                                        ? "SOLVED"
                                                                        : "UN-SOLVED"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                                {puzzle.answer}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                <div className="flex gap-2">
                                                                    <Link
                                                                        href={route(
                                                                            "puzzles.show",
                                                                            puzzle.id
                                                                        )}
                                                                        className="text-blue-500 hover:text-blue-400"
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
                                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                            />
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                            />
                                                                        </svg>
                                                                    </Link>
                                                                    <Link
                                                                        href={route(
                                                                            "puzzles.edit",
                                                                            puzzle.id
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
                                                                    <button
                                                                        onClick={() =>
                                                                            deletePuzzle(
                                                                                puzzle.id
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
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {needsPagination && (
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-sm text-[#0dc5c1]">
                                                Showing {startPuzzle}-
                                                {endPuzzle} of {puzzles.length}{" "}
                                                puzzles
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={goToPreviousPage}
                                                    disabled={currentPage === 0}
                                                    className={`p-2 rounded-full ${
                                                        currentPage === 0
                                                            ? "text-gray-600 cursor-not-allowed"
                                                            : "text-[#0dc5c1] hover:bg-[#0dc5c1]/10"
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
                                                            : "text-[#0dc5c1] hover:bg-[#0dc5c1]/10"
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
