'use client';

import { useState } from 'react';
import Image from 'next/image';
import {signIn} from "next-auth/react";


export default function PhotoUpload({ currentPhotoUrl }: { currentPhotoUrl?: string }) {
    const [photoUrl, setPhotoUrl] = useState(currentPhotoUrl);
    const [isUploading, setIsUploading] = useState(false);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setIsUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);


        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            if (response.ok) {
                // Trigger session update to reflect the changes
                await signIn('credentials', { redirect: false });
                alert('Profile updated successfully!');
            }

            const data = await response.json();
            setPhotoUrl(data.photoUrl);
        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {photoUrl ? (
                <Image
                    src={photoUrl}
                    alt="Profile photo"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
            )}

            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                />
                <span className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                </span>
            </label>
        </div>
    );
}