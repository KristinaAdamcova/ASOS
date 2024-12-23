"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";
import { User } from "@/app/lib/definitions";

type Props = {
    user: User;
}

export default function SellForm({ user }: Props) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("product");
    const [available, setAvailable] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [city, setCity] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const fileInput = document.querySelector('#user_avatar') as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (!file) {
            setErrorMessage("Please select a product photo");
            return;
        }

        try {
            // Upload the photo
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/sell/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Photo upload failed");

            const { photoUrl } = await uploadRes.json();

            // Create the product
            const res = await fetch('/api/sell', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    category,
                    available,
                    price,
                    city,
                    photoPath: photoUrl,
                    userId: user?.id,
                }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                setErrorMessage(message);
                return;
            }

            alert("Product successfully published!");
            router.push("/");
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred while uploading");
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.25)]"
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

                    placeholder="Enter product name"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    required
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

                    placeholder="Enter your description"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    id="category"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-400"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}

                >
                    <option value="sale" selected>Product</option>
                    <option value="service">Service</option>
                    <option value="event">Event</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    name="price"
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}

                    placeholder="Enter your price"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
                    required
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

                    placeholder="Enter count"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    required
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

                    placeholder="Enter your city"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="user_avatar">Picture of your
                    product</label>
                <input
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-400"
                    id="user_avatar" name="user_avatar" type="file"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
                Publish
            </button>
        </form>
    );
}


