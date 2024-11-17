"use client"

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {jwtDecode} from 'jwt-decode';
import Link from "next/link";

interface JwtPayload {
    name?: string;
    // exp?: number; // Optional if expiration is included
}

export default function NavBar() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)

        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);

                // const currentTime = Date.now() / 1000;
                // if (decoded.exp && decoded.exp < currentTime) {
                //     console.warn("Token has expired");
                //     setUsername(null);
                //     return;
                // }

                setUsername(decoded.name || null);
                console.log(decoded)
            } catch (error) {
                console.error("Invalid token:", error);
                setUsername(null);
            }
        } else {
            setUsername(null);
        }
    }, []);

    return (


        <nav className="bg-white rounded-lg shadow dark:bg-gray-900 mb-5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/logo.png" // Dynamically include the product's photo path
                        alt="Description of the image"
                        width={100}  // Specify width
                        height={100} // Specify height
                    />
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Neighbourhood portal</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/"
                               className="block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-lime-500"
                               aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/sell"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sell product</Link>
                        </li>
                        <li>
                            <Link href="/login"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                        </li>
                        <li>
                            <a href="/registration"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                        </li>
                        <li>
                            <a href="/profile"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                {username ? `Welcome, ${username}` : "Welcome, Guest"}
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log
                                out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}


