import React from "react";

export default function Products() {
    return (
        <div className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex justify-center items-center">
            <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products</h1>
                <p className="text-gray-700 text-center mb-6">
                    You can view your products here:
                </p>

                <div className="flex justify-center">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md">
                        + Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}