import { ProductWithUser, User } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import React from "react";

type Props = {
    product: ProductWithUser
    user: User | undefined
}

const ProductBuy = ({ product, user }: Props) => {
    return (
        <div
            className="flex flex-col p-4 mb-3 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{product.name}</h2>
            {/* Product Image */}
            <Image
                src={`/${product.photoPath}`}
                alt="ProductBuy image"
                width={200}
                height={200}
                className="w-full h-[150px] object-contain mb-4 rounded-md"
            />
            {/* Product Details */}
            <div className="flex flex-col space-y-2 mb-4 text-left">
                <p className="text-gray-700">
                    <span className="font-medium">Description:</span> {product.description}
                </p>
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
            {/* Divider */}
            <hr className="my-4 border-gray-300"/>
            {/* Seller Information */}
            {user && (
                <div className="flex items-center space-x-3 mb-4">
                    <Image
                        src={user.photoUrl || '/default.png'}
                        alt="Seller profile picture"
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-gray-700">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-gray-500">Seller</p>
                    </div>
                </div>
            )}
            {/* Call-to-Action Button */}
            <Link href={`/checkout?productId=${product.id}`}
                className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
                Buy Now
            </Link>
        </div>

    );
};

export default ProductBuy;
