import React, {useEffect, useRef, useState} from 'react';
import {Head, Link, useForm, usePage} from '@inertiajs/react';

const PuzzleView = () => {
    const {puzzle, flash} = usePage().props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [isMuted, setIsMuted] = useState(false);
    const [showCaptions, setShowCaptions] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [successCode, setSuccessCode] = useState('');
    const videoRef = useRef(null);

    const {data, setData, post, processing, errors, reset} = useForm({
        answer: '',
        puzzleId: puzzle.id
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
        setData('answer', e.target.value);
        setShowErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('puzzles.check'), {
            preserveScroll: true,
            onError: () => {
                setShowErrorMessage(true);
            }
        });
    };

    // Function to handle YouTube URL
    const getEmbedUrl = (url) => {
        if (!url) return '';
        // Extract video ID from YouTube URL
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }

        return url; // Return original if not a YouTube URL
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const toggleCaptions = () => {
        setShowCaptions(!showCaptions);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            setCurrentTime(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        }
    };

    const handleNext = () => {
        // Navigate to next puzzle
        window.location.href = route('puzzles.show', puzzle.id + 1);
    };

    const handlePrevious = () => {
        // Navigate to previous puzzle
        window.location.href = route('puzzles.show', puzzle.id - 1);
    };

    return (
        <>
            <Head title={`Puzzle #${puzzle?.number || ''} - ${puzzle?.name || ''}`}/>

            <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-6">
                <div className="flex justify-between w-full">
                    <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
                        <Link href={route('puzzles.index')}
                              className="text-teal-400 hover:text-teal-300 transition flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                            PUZZLE LIST
                        </Link>
                    </div>

                    <Link href={route('puzzles.index')}
                          className="text-4xl font-bold text-blue-400 mb-8 hover:text-blue-300 transition">
                        CLUCO
                    </Link>
                </div>

                <div className="w-full max-w-4xl mb-4 md:mb-6 mt-6 md:mt-10">
                    {/* Desktop layout (row) */}
                    <div className="hidden md:flex md:items-center md:justify-center md:justify-between">
                        <div className="text-teal-400 text-2xl font-bold">PUZZLE #{puzzle?.number || ''}</div>
                        <div className="text-teal-400">{puzzle?.name || ''}</div>
                        <div className="text-teal-400 flex items-center">
                            {puzzle?.solved ? (
                                <>
                                    <svg className="w-5 h-5 text-teal-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                    </svg>
                                    <span>SOLVED</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 text-teal-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
                                    </svg>
                                    <span>UN-SOLVED</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile layout (column) */}
                    <div className="flex flex-col items-center justify-center text-center gap-2 md:hidden">
                        <div className="text-teal-400 text-xl font-bold">PUZZLE #{puzzle?.number || ''}</div>
                        <div className="text-teal-400 text-sm">{puzzle?.name || ''}</div>
                        <div className="text-teal-400 text-sm flex items-center justify-center gap-1">
                            {puzzle?.solved ? (
                                <>
                                    <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                    </svg>
                                    <span>SOLVED</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
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
                            className="bg-gray-800 rounded-full p-2 text-teal-400 hover:bg-gray-700"
                            disabled={puzzle.id <= 1}
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-gray-800 rounded-full p-2 text-teal-400 hover:bg-gray-700"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </button>
                    </div>

                    {showSuccessScreen ? (
                        <div
                            className="border-2 border-teal-400 rounded bg-gray-800 aspect-video flex flex-col items-center justify-center p-4">
                            <div className="text-teal-400 text-xl md:text-2xl mb-4 md:mb-8 text-center">SOLVED!</div>
                            <div className="bg-blue-500 rounded-full p-4 md:p-6 mb-4 md:mb-8">
                                <svg className="w-10 h-10 md:w-16 md:h-16 text-white" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                </svg>
                            </div>
                            <div
                                className="bg-blue-500 px-4 md:px-8 py-2 md:py-3 rounded text-white text-base md:text-xl text-center">
                                ANSWER: {successCode}
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-teal-400 rounded">
                            <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                                {/* Using iframe for YouTube videos */}
                                {puzzle?.videoUrl?.includes('youtube') ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={getEmbedUrl(puzzle.videoUrl)}
                                        title={puzzle.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video
                                        ref={videoRef}
                                        onTimeUpdate={handleTimeUpdate}
                                        className="w-full h-full"
                                        src={puzzle?.videoUrl || ''}
                                        onClick={togglePlay}
                                    >
                                        {showCaptions && puzzle?.captionsUrl && (
                                            <track kind="subtitles" src={puzzle.captionsUrl} default/>
                                        )}
                                    </video>
                                )}

                                {/* Play Button Overlay - Only for direct video files */}
                                {!puzzle?.videoUrl?.includes('youtube') && !isPlaying && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                        onClick={togglePlay}
                                    >
                                        <div className="bg-blue-500 rounded-full p-6 opacity-80">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video Controls */}
                            <div
                                className="bg-gray-800 p-2 flex items-center justify-between flex-wrap space-x-1 md:space-x-4">
                                {/* Previous */}
                                <button
                                    onClick={handlePrevious}
                                    className="text-white"
                                    disabled={puzzle.id <= 1}
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                                    </svg>
                                </button>

                                {/* Play/Pause - Only active for direct video files */}
                                <button
                                    onClick={togglePlay}
                                    className={`text-white ${puzzle?.videoUrl?.includes('youtube') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={puzzle?.videoUrl?.includes('youtube')}
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {isPlaying ? (
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                                        ) : (
                                            <path d="M8 5v14l11-7z"></path>
                                        )}
                                    </svg>
                                </button>

                                {/* Next */}
                                <button
                                    onClick={handleNext}
                                    className="text-white"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                                    </svg>
                                </button>

                                {/* Volume - Only active for direct video files */}
                                <button
                                    onClick={toggleMute}
                                    className={`text-white ${puzzle?.videoUrl?.includes('youtube') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={puzzle?.videoUrl?.includes('youtube')}
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {isMuted ? (
                                            <path
                                                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                                        ) : (
                                            <path
                                                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                                        )}
                                    </svg>
                                </button>

                                {/* Time */}
                                {!puzzle?.videoUrl?.includes('youtube') && (
                                    <span
                                        className="text-white text-xs md:text-sm">{currentTime} / {puzzle.duration || "3:50"}</span>
                                )}

                                {/* Spacer */}
                                <div className="hidden md:block flex-grow"></div>

                                {/* Captions - Only active if captions are available */}
                                <button
                                    onClick={toggleCaptions}
                                    className={`px-1 md:px-2 border rounded text-xs md:text-sm ${showCaptions ? 'bg-white text-black' : 'text-white'} ${!puzzle?.captionsUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!puzzle?.captionsUrl}
                                >
                                    CC
                                </button>

                                {/* Settings */}
                                <button className="text-white">
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                                    </svg>
                                </button>

                                {/* Fullscreen */}
                                <button className="text-white">
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Answer Form - Only show if puzzle is not solved */}
                {!showSuccessScreen && (
                    <form onSubmit={handleSubmit} className="w-full max-w-4xl mt-6 md:mt-12 px-2 md:px-0">
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
