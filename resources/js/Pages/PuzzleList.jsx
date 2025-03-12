import React, {useState} from 'react';
import {Head, Link, usePage} from '@inertiajs/react';

const PuzzleList = () => {
    const {puzzles} = usePage().props;
    const [currentPage, setCurrentPage] = useState(0);
    const puzzlesPerPage = 10;

    // For now, using dummy data
    const dummyPuzzles = [
        {id: 1, number: '01', name: 'PUZZLE NAME', solved: true},
        {id: 2, number: '02', name: 'PUZZLE NAME', solved: true},
        {id: 3, number: '03', name: 'PUZZLE NAME', solved: true},
        {id: 4, number: '04', name: 'PUZZLE NAME', solved: false},
        {id: 5, number: '05', name: 'PUZZLE NAME', solved: true},
        {id: 6, number: '06', name: 'PUZZLE NAME', solved: true},
        {id: 7, number: '07', name: 'PUZZLE NAME', solved: false},
        {id: 8, number: '08', name: 'PUZZLE NAME', solved: false},
        {id: 9, number: '09', name: 'PUZZLE NAME', solved: true},
        {id: 10, number: '10', name: 'PUZZLE NAME', solved: false},
        {id: 11, number: '11', name: 'PUZZLE NAME', solved: false},
        {id: 12, number: '12', name: 'PUZZLE NAME', solved: false},
        {id: 13, number: '13', name: 'PUZZLE NAME', solved: true},
        {id: 14, number: '14', name: 'PUZZLE NAME', solved: false},
        {id: 15, number: '15', name: 'PUZZLE NAME', solved: true},
        {id: 16, number: '16', name: 'PUZZLE NAME', solved: false},
    ];

    // Use real data if available, otherwise use dummy data
    const allPuzzles = puzzles || dummyPuzzles;

    // Calculate total pages
    const totalPages = Math.ceil(allPuzzles.length / puzzlesPerPage);

    // Get current page of puzzles
    const currentPuzzles = allPuzzles.slice(
        currentPage * puzzlesPerPage,
        (currentPage + 1) * puzzlesPerPage
    );

    // Calculate the range of puzzles being displayed
    const startPuzzle = currentPage * puzzlesPerPage + 1;
    const endPuzzle = Math.min((currentPage + 1) * puzzlesPerPage, allPuzzles.length);

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
    const needsPagination = allPuzzles.length > puzzlesPerPage;

    return (
        <>
            <Head title="Puzzle List"/>

            <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-6">
                <div className="text-4xl font-bold text-blue-400 mb-12">CLUCO</div>

                <div className="text-3xl text-teal-400 mb-6">SOLVED/UNSOLVED</div>

                <div className="w-full max-w-4xl relative">
                    <div className="border-2 border-teal-400 rounded bg-gray-800 p-6 min-h-[500px] flex flex-col">
                        {/* Puzzle List */}
                        <div className="flex-grow">
                            {currentPuzzles.map((puzzle) => (
                                <Link
                                    key={puzzle.id}
                                    href={route('puzzles.show', puzzle.id)}
                                    className="flex justify-between items-center py-4 hover:bg-gray-700 px-4 rounded-sm"
                                >
                                    <div className="flex items-center">
                                        <span className="text-white text-xl font-medium mr-4">{puzzle.number}</span>
                                        <span className="text-teal-400 text-xl">{puzzle.name}</span>
                                    </div>
                                    <span className={puzzle.solved ? 'text-teal-400' : 'text-blue-400'}>
                    {puzzle.solved ? 'SOLVED' : 'UN-SOLVED'}
                  </span>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Info */}
                        {needsPagination && (
                            <div className="text-center mt-4 text-teal-400">
                                Puzzles {startPuzzle}-{endPuzzle} of {allPuzzles.length}
                            </div>
                        )}
                    </div>

                    {/* Previous/Next Navigation - Only show if multiple pages */}
                    {needsPagination && (
                        <>
                            <button
                                onClick={goToPreviousPage}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-gray-800 rounded-full p-2"
                                disabled={currentPage === 0}
                            >
                                <svg
                                    className={`w-8 h-8 ${currentPage === 0 ? 'text-gray-600' : 'text-teal-400'}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                                </svg>
                            </button>

                            <button
                                onClick={goToNextPage}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-gray-800 rounded-full p-2"
                                disabled={currentPage === totalPages - 1}
                            >
                                <svg
                                    className={`w-8 h-8 ${currentPage === totalPages - 1 ? 'text-gray-600' : 'text-teal-400'}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PuzzleList;
