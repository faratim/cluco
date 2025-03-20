import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";

export default function Edit({ auth, puzzle }) {
    const { data, setData, put, processing, errors } = useForm({
        puzzle_name: puzzle.puzzle_name,
        video_url: puzzle.video_url,
        answer: puzzle.answer,
        solved: puzzle.solved,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("puzzles.update", puzzle.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-[#0df0e7]">
                        Edit Puzzle
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Puzzle #${puzzle.id}`} />

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
                                    <div className="flex items-center">
                                        <Checkbox
                                            name="solved"
                                            checked={data.solved}
                                            onChange={(e) =>
                                                setData(
                                                    "solved",
                                                    e.target.checked
                                                )
                                            }
                                            className="bg-[#0e1421] border-[#0dc5c1] text-[#0df0e7] focus:ring-[#0df0e7]"
                                        />
                                        <InputLabel
                                            htmlFor="solved"
                                            value="Mark as Solved"
                                            className="text-[#0df0e7] font-semibold text-base ml-2"
                                        />
                                    </div>
                                    <p className="text-xs text-[#7aedd6] mt-1 ml-6">
                                        Check this box if the puzzle has been
                                        solved
                                    </p>
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
                                        Update Puzzle
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
