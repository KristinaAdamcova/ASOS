import prisma from '@/lib/prisma';
import type { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
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
            className="flex flex-col lg:flex-row p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            {/* Image Section */}
            <div className="lg:w-1/3 mb-6 lg:mb-0">
                <Image
                    src={`/${product.photoPath}`}
                    alt="Product image"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded-md"
                />
            </div>

            {/* Text Section */}
            <div className="lg:w-2/3 lg:pl-6 flex flex-col">
                {/* Product Information */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <p className="text-gray-700">
                        <span className="font-medium">Category:</span> {product.category}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Available:</span> {product.available ? 'Yes' : 'No'}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">City:</span> {product.city}
                    </p>
                </div>

                {/* Seller Information */}
                {user && (
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <Image
                            src={user.photoUrl}
                            alt="Seller profile picture"
                            width={60}
                            height={60}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                    </div>
                )}

                {/* Buy Button */}
                <button
                    className="mt-auto w-full text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2.5 transition duration-300">
                    Buy Now
                </button>
            </div>
        </div>

    );
};

export default Product;
