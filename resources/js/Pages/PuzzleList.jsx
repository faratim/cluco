import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

const PuzzleList = () => {
    const { puzzles } = usePage().props;
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

    // Determine if pagination is needed
    const needsPagination = puzzles.length > puzzlesPerPage;

    return (
        <>
            <Head title="List" />

            <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-6">
                <div className="text-4xl font-bold text-blue-400 mb-12">
                    <Link
                        href={route("puzzles.index")}
                        className="hover:text-blue-300 transition"
                    >
                        CLUCO
                    </Link>
                </div>

                <div className="w-full max-w-4xl relative">
                    <div className="border-2 border-teal-400 rounded bg-gray-800 p-6 min-h-[500px] flex flex-col">
                        {/* Puzzle List */}
                        <div className="flex-grow">
                            {currentPuzzles.map((puzzle, index) => (
                                <div key={puzzle.id} className="group">
                                    <Link
                                        href={route("puzzles.show", puzzle.id)}
                                        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-4 group-hover:bg-gray-700 px-4 rounded-sm"
                                        preserveScroll
                                    >
                                        <div className="flex items-center w-full sm:w-auto">
                                            <span className="text-white text-xl font-medium mr-4 min-w-[40px]">
                                                {puzzle.number}
                                            </span>
                                            <span className="text-teal-400 text-xl break-words line-clamp-2 sm:line-clamp-none">
                                                {puzzle.name}
                                            </span>
                                        </div>
                                        <span
                                            className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm self-end sm:self-auto ${
                                                puzzle.solved
                                                    ? "text-teal-400 bg-teal-400/20"
                                                    : "text-blue-400 bg-blue-400/20"
                                            }`}
                                        >
                                            {puzzle.solved
                                                ? "SOLVED"
                                                : "UN-SOLVED"}
                                        </span>
                                    </Link>
                                    {index < currentPuzzles.length - 1 && (
                                        <div className="border-b border-teal-400/20 mx-4 group-hover:border-transparent"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination Info */}
                        {needsPagination && (
                            <div className="text-center mt-4 text-teal-400">
                                Puzzles {startPuzzle}-{endPuzzle} of{" "}
                                {puzzles.length}
                            </div>
                        )}
                    </div>

                    {/* Previous/Next Navigation - Only show if multiple pages */}
                    {needsPagination && (
                        <div className="mt-4 flex justify-center space-x-4 sm:space-x-0">
                            <button
                                onClick={goToPreviousPage}
                                className="bg-gray-800 rounded-full p-2 sm:absolute sm:left-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:-translate-x-16"
                                disabled={currentPage === 0}
                            >
                                <svg
                                    className={`w-8 h-8 ${
                                        currentPage === 0
                                            ? "text-gray-600"
                                            : "text-teal-400"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                                </svg>
                            </button>

                            <button
                                onClick={goToNextPage}
                                className="bg-gray-800 rounded-full p-2 sm:absolute sm:right-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:translate-x-16"
                                disabled={currentPage === totalPages - 1}
                            >
                                <svg
                                    className={`w-8 h-8 ${
                                        currentPage === totalPages - 1
                                            ? "text-gray-600"
                                            : "text-teal-400"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PuzzleList;
