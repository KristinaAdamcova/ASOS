'use client';

import { useState } from 'react';


export default function PhotoUpload() {
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

            window.location.reload();

        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-2 mt-2">
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                />
                <span className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                {isUploading ? 'Uploading...' : 'Upload Photo'}
            </span>
            </label>
        </div>
    );
}