import React from "react";
import {auth} from "@/auth"
import {fetchOrdersByUser, fetchProduct} from "@/app/lib/data";
import Image from "next/image";

export default async function Orders() {
    const session = await auth();

    if (!session?.user?.id) {
        return <div>You are not logged in</div>;
    }

    const orders = await fetchOrdersByUser(session.user.id)
    const products = await Promise.all(orders.map(async (order) => await fetchProduct(order.productId)))

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Orders</h1>
                {products.length > 0 ? (
                    <ul className="mt-4">
                        {products.map((product) => (
                            <li
                                key={product?.id}
                                className="border-b py-4 flex items-start"
                            >
                                <div className="w-1/4">
                                    <Image
                                        src={`/${product?.photoPath}`}
                                        alt="Product image"
                                        width={50} // Adjust size as needed
                                        height={50} // Adjust size as needed
                                        className="w-full h-auto object-cover rounded-md"
                                    />
                                </div>
                                <div className="w-3/4 pl-4 flex flex-col">
                                    <p className="text-lg font-medium text-gray-700">
                                        <strong>Name:</strong> {product?.name}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <strong>Category:</strong> {product?.category}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <strong>Price:</strong> {product?.price}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-4">No ratings received.</p>
                )}
            </div>
        </div>

    );
}