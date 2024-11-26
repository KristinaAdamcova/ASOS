'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        
        try {
            const response = await signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                redirect: false,
            });

            if (response?.error) {
                setError('Invalid credentials');
                return;
            }

            router.push('/'); // Redirect on success
            router.refresh(); // Refresh the page to update the session
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong');
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white rounded-lg"
        >
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-lg"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full text-xl py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
                Login
            </button>
        </form>
    );
}


