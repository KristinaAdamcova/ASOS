"use client"; // Client-side rendering for interactivity

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function NavBarClient({
                                         sessionStatus,
                                         user,
                                     }: {
    sessionStatus: string;
    user: { name?: string; email?: string } | null;
}) {
    return (
        <nav className="bg-gray-900 shadow-lg p-4">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Link href="/" className="flex items-center justify-start space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/logo.png" // Dynamically include the product's photo path
                        alt="Description of the image"
                        width={130}  // Specify width
                        height={130} // Specify height
                    />
                    <span
                        className="text-lg text-left md:text-xl lg:text-3xl font-semibold whitespace-nowrap text-white"
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"}}
                    >
                        Neighbourhood<br/>portal
                    </span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link href="/"
                                  className="text-xl block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-500 md:p-0"
                                  aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/sell"
                                  className="text-xl block py-2 px-3 text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0">Sell product</Link>
                        </li>
                        {sessionStatus === 'authenticated' ? (
                            <>
                                <li>
                                    <Link href="/account"
                                          className="text-xl block py-2 px-3 text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0">
                                        {user?.name ? `Welcome, ${user.name}` : "Welcome, Guest"}
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => signOut()}
                                            className="text-xl block py-2 px-3 text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login"
                                          className="text-xl block py-2 px-3 text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0">Login</Link>
                                </li>
                                <li>
                                    <Link href="/registration"
                                          className="text-xl block py-2 px-3 text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
