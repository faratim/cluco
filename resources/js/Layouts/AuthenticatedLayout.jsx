import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#0e1421]">
            <nav className="border-b border-[#0df0e7]/20 bg-[#121b2b]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-[#0df0e7]" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* Custom Dashboard link with color styling based on active state */}
                                <Link
                                    href={route("dashboard")}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                                        route().current("dashboard")
                                            ? "border-[#0df0e7] text-[#0df0e7]"
                                            : "border-transparent text-[#0aa9a6] hover:text-[#0df0e7] hover:border-[#0df0e7]/50"
                                    }`}
                                >
                                    Dashboard
                                </Link>

                                {/* Custom Users link with color styling based on active state */}
                                <Link
                                    href={route("users.index")}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
                                        route().current("users.index")
                                            ? "border-[#0df0e7] text-[#0df0e7]"
                                            : "border-transparent text-[#0aa9a6] hover:text-[#0df0e7] hover:border-[#0df0e7]/50"
                                    }`}
                                >
                                    Users
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-[#0df0e7]/30 bg-[#121b2b] px-3 py-2 text-sm font-medium leading-4 text-[#0df0e7] transition duration-150 ease-in-out hover:text-[#0df0e7] focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="bg-[#121b2b] border border-[#0df0e7]/20">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="text-[#0df0e7] hover:bg-[#0df0e7]/10"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-[#0df0e7] hover:bg-[#0df0e7]/10"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-[#0df0e7] transition duration-150 ease-in-out hover:bg-[#0df0e7]/10 hover:text-[#0df0e7] focus:bg-[#0df0e7]/10 focus:text-[#0df0e7] focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {/* Mobile Dashboard link with custom styling */}
                        <Link
                            href={route("dashboard")}
                            className={`block w-full border-l-4 py-2 pe-4 ps-3 text-base font-medium focus:outline-none ${
                                route().current("dashboard")
                                    ? "border-[#0df0e7] bg-[#0df0e7]/10 text-[#0df0e7]"
                                    : "border-transparent text-[#0aa9a6] hover:text-[#0df0e7] hover:bg-[#0df0e7]/5 hover:border-[#0df0e7]/50"
                            }`}
                        >
                            Dashboard
                        </Link>

                        {/* Mobile Users link with custom styling */}
                        <Link
                            href={route("users.index")}
                            className={`block w-full border-l-4 py-2 pe-4 ps-3 text-base font-medium focus:outline-none ${
                                route().current("users.index")
                                    ? "border-[#0df0e7] bg-[#0df0e7]/10 text-[#0df0e7]"
                                    : "border-transparent text-[#0aa9a6] hover:text-[#0df0e7] hover:bg-[#0df0e7]/5 hover:border-[#0df0e7]/50"
                            }`}
                        >
                            Users
                        </Link>
                    </div>

                    <div className="border-t border-[#0df0e7]/20 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-[#0df0e7]">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-[#7aedd6]">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                className="text-[#0df0e7] hover:bg-[#0df0e7]/10"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="text-[#0df0e7] hover:bg-[#0df0e7]/10"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[#121b2b] shadow-md shadow-black/30 border-b border-[#0df0e7]/10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="bg-[#0e1421] text-[#0df0e7]">{children}</main>
        </div>
    );
}
