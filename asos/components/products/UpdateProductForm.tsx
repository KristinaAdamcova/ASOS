"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";
import {Product} from "@prisma/client";
import {revalidatePath} from "next/cache";

type Props = {
    product: Product;
}

export default function UpdateProductForm({ product }: Props) {
    const router = useRouter();

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [available, setAvailable] = useState<number>(product.available);
    const [price, setPrice] = useState<number>(product.price);
    const [city, setCity] = useState(product.city);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);



        try {

            // Create the product
            const res = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    available,
                    price,
                    city,
                }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                setErrorMessage(message);
                return;
            }

            alert("Product successfully updated!");
            router.push("/account/products");
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred while uploading");
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
        >
            {errorMessage && (
                <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            <div className="mb-4">
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">Product name</label>
                <input
                    name="product_name"
                    id="product_name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                    placeholder={product.name}
                    className="w-full mt-2 p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    name="description"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                    placeholder={product.description}
                    className="w-full mt-2 p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    name="price"
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}

                    placeholder={product.price}
                    className="w-full mt-2 p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Count</label>
                <input
                    name="availability"
                    id="availability"
                    type="number"
                    value={available}
                    onChange={(e) => setAvailable(Number(e.target.value))}

                    placeholder={product.available}
                    className="w-full mt-2 p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    name="city"
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                    placeholder={product.city}
                    className="w-full mt-2 p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
                Edit
            </button>
        </form>
    );
}


