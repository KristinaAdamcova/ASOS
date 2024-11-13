// app/profile/page.tsx
import React from 'react';

export default async function Profile() {
    try {
        return (
            <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex justify-center items-center">
                <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                    <div className="text-lg text-gray-700">
                        <p className="font-semibold text-xl mb-4">
                            <span className="text-gray-800">Name:</span>
                        </p>
                        <p className="font-semibold text-xl">
                            <span className="text-gray-800">Email:</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
        return <div>Could not load user profile. Please try again later.</div>;
    }
}