import React from "react";
import { fetchRatingsByUser } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function Ratings() {
    const session = await auth();
    let ratingsGiven: Array<{
        id: string;
        ratedTo: { name: string | null };
        rating: number;
        description: string;
    }> = [];
    let ratingsReceived: Array<{
        id: string;
        ratedBy: { name: string | null };
        rating: number;
        description: string;
    }> = [];
    let error: string | null = null;

    try {
        if (session?.user?.id) {
            const ratings = await fetchRatingsByUser(session.user.id);
            ratingsGiven = ratings.ratingsGiven;
            ratingsReceived = ratings.ratingsReceived;
        }
    } catch (err) {
        error = "Failed to fetch your ratings.";
        console.error(err);
    }

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Ratings</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <h2 className="text-2xl font-bold text-gray-800 mt-8">Received Ratings</h2>
                {ratingsReceived.length > 0 ? (
                    <ul className="mt-4">
                        {ratingsReceived.map((rating) => (
                            <li
                                key={rating.id}
                                className="border-b py-2">
                                <p className="text-lg font-medium text-gray-700">
                                    <strong>From:</strong> {rating.ratedBy.name}
                                </p>
                                <p className="text-lg text-gray-700">
                                    <strong>Rating:</strong> {rating.rating} ⭐
                                </p>
                                <p className="text-lg text-gray-700">
                                    <strong>Feedback:</strong> {rating.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-4">No ratings received.</p>
                )}

                <h2 className="text-2xl font-bold text-gray-800 mt-4">Given Ratings</h2>
                {ratingsGiven.length > 0 ? (
                    <ul className="mt-4">
                        {ratingsGiven.map((rating) => (
                            <li
                                key={rating.id}
                                className="border-b py-2">
                                <p className="text-lg font-medium text-gray-700">
                                    <strong>To:</strong> {rating.ratedTo.name}
                                </p>
                                <p className="text-lg text-gray-700">
                                    <strong>Rating:</strong> {rating.rating} ⭐
                                </p>
                                <p className="text-lg text-gray-700">
                                    <strong>Feedback:</strong> {rating.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-4">No ratings given.</p>
                )}
            </div>
        </div>
    );
}