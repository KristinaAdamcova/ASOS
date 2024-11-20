"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const name = formData.get('name') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        console.log(formData);
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, password }),
            });

            if (res.status === 201) {
                console.log("User registered successfully");
                router.push("/login");
            } else {
                const { message } = await res.json();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred");
        }
    };

    return (
        <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
            {errorMessage && (
                <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Register
            </button>
        </form>
    );
}