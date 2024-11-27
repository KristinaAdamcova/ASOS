import { fetchUser } from '@/app/lib/data';
import type { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from "react";

type Props = {
    product: Product
}

const Product = async ({ product }: Props) => {
    const user = await fetchUser(product.userId);

    return (
        <div
            className="max-w-lg mx-auto p-6 mb-2 border border-gray-200 rounded-2xl shadow-xl hover:shadow-lg transition-shadow duration-300 bg-white">
            {/* Image Section */}
            <div className="mb-6">
                <Image
                    src={`/${product.photoPath}`}
                    alt="Product image"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded-md"
                />
            </div>

            {/* Text Section */}
            <div className="">
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
                    <Link href={`/profile/${user.id}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <Image
                            src={user.photoUrl || 'default.png'}
                            alt="Seller profile picture"
                            width={60}
                            height={60}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                    </Link>
                )}

                {/* Buy Button */}
                <Link href={`/checkout?productId=${product.id}`}
                      className="w-full text-xl py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg flex items-center justify-center"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    Buy Now
                </Link>
            </div>
        </div>

    );
};

export default Product;
