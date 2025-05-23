import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        puzzle_name: "",
        video_url: "",
        answer: "",
        solved_message: "", // Add this line
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("puzzles.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-[#0df0e7]">
                        Create New Puzzle
                    </h2>
                </div>
            }
        >
            <Head title="Create Puzzle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#121b2b] overflow-hidden shadow-sm sm:rounded-lg border border-[#0df0e7]">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="puzzle_name"
                                        value="Puzzle Name"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="puzzle_name"
                                        type="text"
                                        name="puzzle_name"
                                        value={data.puzzle_name}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "puzzle_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.puzzle_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="video_url"
                                        value="Video URL"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="video_url"
                                        type="text"
                                        name="video_url"
                                        value={data.video_url}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData("video_url", e.target.value)
                                        }
                                    />
                                    <p className="text-xs text-[#7aedd6] mt-1">
                                        Enter a YouTube URL (e.g.,
                                        https://www.youtube.com/watch?v=8XKubqcgJxU)
                                    </p>
                                    <InputError
                                        message={errors.video_url}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="answer"
                                        value="Puzzle Answer"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="answer"
                                        type="text"
                                        name="answer"
                                        value={data.answer}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData("answer", e.target.value)
                                        }
                                    />
                                    <p className="text-xs text-[#7aedd6] mt-1">
                                        Enter the correct answer users must
                                        submit to solve this puzzle
                                    </p>
                                    <InputError
                                        message={errors.answer}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-6">
                                    <InputLabel
                                        htmlFor="solved_message"
                                        value="Solved Message (Optional)"
                                        className="text-[#0df0e7] font-semibold text-base mb-2"
                                    />
                                    <TextInput
                                        id="solved_message"
                                        type="text"
                                        name="solved_message"
                                        value={data.solved_message}
                                        className="w-full bg-[#0e1421] border-[#0dc5c1] text-[#ffffff] focus:border-[#0df0e7] focus:ring-[#0df0e7]"
                                        onChange={(e) =>
                                            setData(
                                                "solved_message",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-xs text-[#7aedd6] mt-1">
                                        Custom message to show when the puzzle
                                        is solved (leave empty for default)
                                    </p>
                                    <InputError
                                        message={errors.solved_message}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route("dashboard")}
                                        className="text-[#0df0e7] hover:text-[#0df0e7]/80 font-semibold px-6 py-3"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#0df0e7] text-[#121b2b] hover:bg-[#0df0e7]/90 focus:ring-2 focus:ring-[#0df0e7]/50 font-bold uppercase tracking-wider px-8 py-3 rounded transition-all duration-200 shadow-lg shadow-[#0df0e7]/20"
                                    >
                                        Create Puzzle
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
