import React from "react";
import ProductDetail from "@/components/products/ProductDetail";
import { fetchProductsByUser } from "@/app/lib/data";

export default async function Profile({params}: {params: {id: string}}) {
    const products = await fetchProductsByUser(params.id);

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products</h1>

                {products.map((product) => (
                    // eslint-disable-next-line react/jsx-key
                    <ProductDetail product={product} />
                ))}
            </div>
        </div>
    );
}