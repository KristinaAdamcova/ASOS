import Image from 'next/image';
import Link from "next/link";
import React from "react";

interface User {
    name: string;
    email: string;
}

interface ProductProps {
    id: number;
    name: string;
    photoPath: string;
    description: string;
    category: string;
    price: number;
    available: boolean;
    city: string;
    user?: User;
}

const Product: React.FC<ProductProps> = ({
                                             name,
                                             photoPath,
                                             description,
                                             category,
                                             price,
                                             available,
                                             city,
                                             user,
                                         }) => {
    return (
        <div
            className="flex flex-col items-center p-4 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{name}</h2>
            <Image
                src={`/${photoPath}`}
                alt="Product image"
                width={200}  // Set a width that fits with your design (larger than the actual displayed width)
                height={100} // Fixed height
                className="w-full h-[100px] object-contain mb-4 rounded-md"
            />
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-700 font-medium mb-2">
                <strong>Category:</strong> {category}
            </p>
            <p className="text-gray-700 font-medium mb-2">
                <strong>Price:</strong> ${price.toFixed(2)}
            </p>
            <p className="text-gray-700 font-medium mb-2">
                <strong>Available:</strong> {available ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-700 font-medium mb-4">
                <strong>City:</strong> {city}
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
            <div className="mt-auto">
                <button
                    className="mt-2 w-full text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Product;
