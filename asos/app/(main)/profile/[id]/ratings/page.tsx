import React from "react";
import { fetchRatingsByUser } from "@/app/lib/data";

export default async function Ratings({ params }: { params: { id: string } }) {
    const ratings = await fetchRatingsByUser(params.id);

    const giveRating = async (formData: FormData) => {
        
    }

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Ratings</h1>
                <h2 className="text-2xl font-bold text-gray-800 mt-8">Received Ratings</h2>
                {ratings.ratingsReceived.length > 0 ? (
                    <ul className="mt-4">
                        {ratings.ratingsReceived.map((rating) => (
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
            </div>

            {/* Give rating form */}
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-bold text-gray-800 mt-8">Give Rating</h2>
                <form action={giveRating}>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    );
}