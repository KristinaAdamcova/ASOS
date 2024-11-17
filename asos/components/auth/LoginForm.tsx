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
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
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
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Login
            </button>
        </form>
    );
}


