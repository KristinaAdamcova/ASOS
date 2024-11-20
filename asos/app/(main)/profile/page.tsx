'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { data: session, status } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
    });

    useEffect(() => {
        setIsClient(true); // Ensures the component renders only on the client
    }, []);

    if (!isClient) {
        return null; // Avoid rendering on the server
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (status !== 'authenticated') {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p>You are not logged in. Please log in to view your profile.</p>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here, you'd send the updated data to your backend or API
        console.log('Updated profile:', formData);
        alert('Profile updated successfully!');
    };

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                <p className="text-gray-700 text-center mb-6">
                    Welcome to your profile page. You can update your information below.
                </p>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full mt-2 p-3 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}