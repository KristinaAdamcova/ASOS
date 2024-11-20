'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { data: session, status } = useSession();
    const [isClient, setIsClient] = useState(false);

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

    // Safely access user properties
    const name = session?.user?.name || 'Guest';
    const email = session?.user?.email || 'Not Available';

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex justify-center items-center">
            <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                <div className="text-lg text-gray-700">
                    <p className="font-semibold text-xl mb-4">
                        <span className="text-gray-800">Name:</span> {name}
                    </p>
                    <p className="font-semibold text-xl">
                        <span className="text-gray-800">Email:</span> {email}
                    </p>
                </div>
            </div>
        </div>
    );
}