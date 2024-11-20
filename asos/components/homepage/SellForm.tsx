'use client';

import {useState} from "react";

export default function SellForm() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {

        } catch (error) {
            console.error('Sell product error:', error);
            setError('Something went wrong');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            {/*photoPath String*/}
            {/*name  String*/}
            {/*description  String*/}
            {/*category  String*/}
            {/*available Int*/}
            {/*price Float*/}
            {/*city  String*/}
            <div className="mb-4">
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">Product name</label>
                <input
                    name="product_name"
                    id="product_name"
                    type="text"
                    placeholder="Enter product name"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Enter your description"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Description</label>
                <select
                name="category"
                id="category"
                className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                >
                    <option selected>Product</option>
                    <option>Service</option>
                    <option>Event</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Enter your price"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    name="city"
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload
                    file</label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A picture of your
                    product
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Publish
            </button>
        </form>
    );
}


