import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="bg-[#0e1421] min-h-screen flex flex-col items-center justify-center p-6">
                <div className="text-4xl font-bold text-[#3b82f6] mb-12">
                    <Link href="/">CLUCO</Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="border border-[#0dc5c1] rounded bg-[#121b2b] p-6 shadow-lg">
                        <h1 className="text-2xl text-[#0dc5c1] font-bold text-center mb-8">
                            LOG IN
                        </h1>

                        {status && (
                            <div className="mb-4 p-3 bg-[#0dc5c1] bg-opacity-20 border border-[#0dc5c1] text-[#0dc5c1] rounded">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-[#0dc5c1] mb-2 text-sm"
                                >
                                    EMAIL
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full p-3 bg-[#121b2b] border border-[#0dc5c1] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#0dc5c1]"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                {errors.email && (
                                    <div className="text-red-400 text-sm mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-[#0dc5c1] mb-2 text-sm"
                                >
                                    PASSWORD
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full p-3 bg-[#121b2b] border border-[#0dc5c1] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#0dc5c1]"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                {errors.password && (
                                    <div className="text-red-400 text-sm mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="rounded bg-[#121b2b] border-[#0dc5c1] text-[#0dc5c1] focus:ring-[#0dc5c1]"
                                    />
                                    <span className="ml-2 text-sm text-[#0dc5c1]">
                                        REMEMBER ME
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-[#0dc5c1] hover:text-[#0dc5c1] transition"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#0dc5c1] hover:bg-[#0dc5c1]/80 text-[#121b2b] font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition"
                                >
                                    LOG IN
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    href={route("register")}
                                    className="text-sm text-[#0dc5c1] hover:text-[#0dc5c1]/80 transition"
                                >
                                    Don't have an account? Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="mt-16 text-[#0dc5c1] text-sm text-center">
                    © 2025 The Clue Collective all rights reserved
                </div> */}
            </div>
        </>
    );
}
