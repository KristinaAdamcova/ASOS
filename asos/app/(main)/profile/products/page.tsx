import { fetchProductsByUser } from "@/app/lib/data";
import { auth } from "@/auth";
import Product from "@/components/homepage/Product";
import Link from "next/link";
import React from "react";

export default async function Products() {
    const session = await auth();
    const products = session?.user?.id ? await fetchProductsByUser(session.user.id) : [];
    
    console.log(products);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products</h1>
                <p className="text-gray-700 text-center mb-6">
                    You can view your products here:

                </p>
                <div className="flex justify-center">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md mb-4">
                        + Add Product
                    </button>
                </div>

                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <Product product={product} user={session?.user} />
                    </Link>
                ))}
            </div>
        </div>
    );
}