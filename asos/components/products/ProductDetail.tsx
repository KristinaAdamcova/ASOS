import prisma from '@/lib/prisma';
import type { Product } from '@prisma/client';
import Image from 'next/image';
import React from "react";

type Props = {
    product: Product
}

const Product = async ({ product }: Props) => {
    const user = await prisma.user.findUnique({
        where: { id: product.userId },
    });

    return (
        <div
            className="flex flex-row items-start p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="w-1/3">
                <Image
                    src={`/${product.photoPath}`}
                    alt="Product image"
                    width={400}  // Adjust as needed for your design
                    height={300} // Adjust as needed for your design
                    className="w-full h-auto object-cover rounded-md"
                />
            </div>

            {/* Text Section */}
            <div className="w-2/3 pl-6 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-700 font-medium mb-2">
                    <strong>Category:</strong> {product.category}
                </p>
                <p className="text-gray-700 font-medium mb-2">
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-700 font-medium mb-2">
                    <strong>Available:</strong> {product.available ? 'Yes' : 'No'}
                </p>
                <p className="text-gray-700 font-medium mb-4">
                    <strong>City:</strong> {product.city}
                </p>

                {user && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">Seller Information</h3>
                        <p className="text-gray-700">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>
                )}

                {/* Buy Button */}
                <div className="mt-auto">
                    <button
                        className="mt-4 w-full text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
