import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";

const PuzzleView = () => {
    const { puzzle, flash } = usePage().props;
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [successCode, setSuccessCode] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        answer: "",
        puzzleId: puzzle.id,
    });

    // Check flash messages from the server response
    useEffect(() => {
        if (flash.success) {
            // Puzzle has been successfully solved
            showSuccessWithAnswer();
        } else if (flash.error) {
            // Answer was incorrect
            setShowErrorMessage(true);
        }
    }, [flash]);

    const showSuccessWithAnswer = () => {
        // Display the correct answer as the success code
        setSuccessCode(puzzle.answer.toUpperCase());
        setShowSuccessScreen(true);
    };

    const handleAnswerChange = (e) => {
        setData("answer", e.target.value);
        setShowErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("puzzles.check"), {
            preserveScroll: true,
            onError: () => {
                setShowErrorMessage(true);
            },
        });
    };

    // Function to handle YouTube URL
    const getEmbedUrl = (url) => {
        if (!url) return "";
        // Extract video ID from YouTube URL
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }

        return url; // Return original if not a YouTube URL
    };

    const handleNext = () => {
        if (puzzle.hasNext) {
            // Navigate to next puzzle using Inertia router
            router.visit(route("puzzles.show", puzzle.id + 1));
        } else {
            // Handle case where there's no next puzzle
            router.visit(route("puzzles.index"));
        }
    };

    const handlePrevious = () => {
        if (puzzle.hasPrevious) {
            // Navigate to previous puzzle using Inertia router
            router.visit(route("puzzles.show", puzzle.id - 1));
        } else {
            // Handle case where there's no previous puzzle
            router.visit(route("puzzles.index"));
        }
    };

    return (
        <>
            <Head title={`#${puzzle?.number || ""} - ${puzzle?.name || ""}`} />

            <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-6">
                <div className="flex justify-between w-full">
                    <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
                        <Link
                            href={route("puzzles.index")}
                            className="text-teal-400 hover:text-teal-300 transition flex items-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            LIST
                        </Link>
                    </div>

                    <Link
                        href={route("puzzles.index")}
                        className="text-4xl font-bold text-blue-400 mb-8 hover:text-blue-300 transition"
                    >
                        CLUCO
                    </Link>
                </div>

                <div className="w-full max-w-4xl mb-4 md:mb-6 mt-6 md:mt-10">
                    {/* Desktop layout (row) */}
                    <div className="hidden md:flex md:items-center md:justify-between">
                        <div className="text-teal-400 text-2xl font-bold">
                            #{puzzle?.number || ""}
                        </div>
                        <div className="text-teal-400">
                            {puzzle?.name || ""}
                        </div>
                        <div className="text-teal-400 flex items-center">
                            {puzzle?.solved ? (
                                <>
                                    <svg
                                        className="w-5 h-5 text-teal-400 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                    </svg>
                                    <span>SOLVED</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5 text-teal-400 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
                                    </svg>
                                    <span>UN-SOLVED</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile layout (column) */}
                    <div className="flex flex-col items-center justify-center text-center gap-2 md:hidden">
                        <div className="text-teal-400 text-xl font-bold">
                            #{puzzle?.number || ""}
                        </div>
                        <div className="text-teal-400 text-sm">
                            {puzzle?.name || ""}
                        </div>
                        <div className="text-teal-400 text-sm flex items-center justify-center gap-1">
                            {puzzle?.solved ? (
                                <>
                                    <svg
                                        className="w-4 h-4 text-teal-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                    </svg>
                                    <span>SOLVED</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-4 h-4 text-teal-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
                                    </svg>
                                    <span>UN-SOLVED</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-4xl relative">
                    {/* Side Navigation - Positioned above the video player only */}
                    <div className="w-full flex justify-between items-center mb-4">
                        <button
                            onClick={handlePrevious}
                            className={`bg-gray-800 rounded-full p-2 ${
                                puzzle.hasPrevious
                                    ? "text-teal-400 hover:bg-gray-700"
                                    : "text-gray-600 cursor-not-allowed"
                            }`}
                            disabled={!puzzle.hasPrevious}
                        >
                            <svg
                                className="w-6 h-6 md:w-8 md:h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className={`bg-gray-800 rounded-full p-2 ${
                                puzzle.hasNext
                                    ? "text-teal-400 hover:bg-gray-700"
                                    : "text-gray-600 cursor-not-allowed"
                            }`}
                            disabled={!puzzle.hasNext}
                        >
                            <svg
                                className="w-6 h-6 md:w-8 md:h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </button>
                    </div>

                    {showSuccessScreen ? (
                        <div className="border-2 border-teal-400 rounded bg-gray-800 aspect-video flex flex-col items-center justify-center p-4">
                            <div className="text-teal-400 text-xl md:text-2xl mb-4 md:mb-8 text-center">
                                SOLVED!
                            </div>
                            <div className="bg-blue-500 rounded-full p-4 md:p-6 mb-4 md:mb-8">
                                <svg
                                    className="w-10 h-10 md:w-16 md:h-16 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                </svg>
                            </div>
                            <div className="bg-blue-500 px-4 md:px-8 py-2 md:py-3 rounded text-white text-base md:text-xl text-center">
                                ANSWER: {successCode}
                            </div>
                            <div className="text-teal-400 text-xl md:text-2xl mb-4 md:mb-8 text-center mt-4">
                                {puzzle.solvedMessage}
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-teal-400 rounded">
                            <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                                {/* Using iframe for YouTube videos */}
                                <iframe
                                    className="w-full h-full"
                                    src={getEmbedUrl(puzzle.videoUrl)}
                                    title={puzzle.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                {/* Answer Form - Only show if puzzle is not solved */}
                {!showSuccessScreen && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-4xl mt-6 md:mt-12 px-2 md:px-0"
                    >
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={data.answer}
                                onChange={handleAnswerChange}
                                placeholder="Solve the puzzle"
                                className="flex-grow p-2 md:p-3 bg-gray-700 border border-gray-600 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm md:text-base"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-teal-400 hover:bg-teal-500 text-gray-900 font-bold rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center ml-2 md:ml-4"
                            >
                                GO
                            </button>
                        </div>

                        {/* Error message */}
                        {showErrorMessage && (
                            <div className="bg-red-500 text-white p-2 md:p-3 rounded mt-3 md:mt-4 text-sm md:text-base">
                                Incorrect answer, try again.
                            </div>
                        )}
                    </form>
                )}

                {/* Footer */}
                <div className="mt-auto pt-8 md:pt-16 text-teal-400 text-xs md:text-sm text-center">
                    © 2025 The Clue Collective all rights reserved
                </div>
            </div>
        </>
    );
};

export default PuzzleView;
