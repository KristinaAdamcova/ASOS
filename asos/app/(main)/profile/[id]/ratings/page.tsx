import React from "react";
import { createRating, fetchRatingsByUser } from "@/app/lib/data";
import { auth } from "@/auth";
import { CreateRating } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";

export default async function Ratings({ params }: { params: { id: string } }) {
    const ratings = await fetchRatingsByUser(params.id);
    const session = await auth();

    if (!session?.user?.id) {
        return <div>Unauthorized</div>;
    }

    const giveRating = async (formData: FormData) => {
        "use server";

        const rating: CreateRating = {
            ratedById: session.user?.id || "",
            ratedToId: params.id,
            rating: parseInt(formData.get("rating") as string),
            description: formData.get("description") as string
        }

        await createRating(rating);

        revalidatePath(`/profile/${params.id}/ratings`);
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

                <h2 className="text-2xl font-bold text-gray-800 mt-8">Give Rating</h2>
                <form action={giveRating} className="flex flex-col text-gray-800 gap-4 max-w-xl">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" required className="w-full p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" required className="w-full p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">Submit</button>
                </form>
            </div>
        </div>
    );
}