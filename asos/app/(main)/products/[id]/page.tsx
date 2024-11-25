import {fetchProduct, fetchRatingsByUser} from '@/app/lib/data';
import ProductDetail from '@/components/products/ProductDetail';
import { notFound } from 'next/navigation';
import React from "react";

type Props = {
    params: { id: string; };
}

export default async function Page({ params }: Props) {
    let ratingsReceived: Array<{
        id: string;
        ratedBy: { name: string | null };
        rating: number;
        description: string;
    }> = [];
    const id = params.id;
    const product = await fetchProduct(id);

    if (!product) {
        notFound();
    }

    const ratings = await fetchRatingsByUser(product.userId);
    ratingsReceived = ratings.ratingsReceived;

    return (
        <main>
            <ProductDetail product={product}/>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">Seller ratings:</h2>
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
        </main>
    );
}