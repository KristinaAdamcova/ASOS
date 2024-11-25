"use client"

import { ProductWithUser, User } from '@/app/lib/definitions';
import Image from 'next/image';
import React from "react";
import {useRouter} from "next/navigation";

type Props = {
    product: ProductWithUser;
    user: User | undefined;
};

const ProductDelete = ({ product, user }: Props) => {
    const router = useRouter();

    const handleDelete = async () => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the product "${product.name}"?`
        );

        // Proceed only if the user confirms
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete product: ${response.statusText}`);
            }

            // Notify the user of success
            alert('Product deleted successfully.');

            router.refresh();
        } catch (error) {
            // Notify the user of an error
            console.error('Error deleting product:', error);
            alert('An error occurred while deleting the product. Please try again.');
        }
    };

    return (
        <div
            className="flex flex-col items-center p-4 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 m-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h2>
            <Image
                src={`/${product.photoPath}`}
                alt="ProductBuy image"
                width={200}  // Set a width that fits with your design (larger than the actual displayed width)
                height={100} // Fixed height
                className="w-full h-[100px] object-contain mb-4 rounded-md"
            />
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
            <div className="mt-auto">
                <button
                    onClick={handleDelete}
                    className="mt-2 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductDelete;
