"use client";

import {useState} from "react";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
    user: User;
}

export default function SellForm({ user }: Props) {
    const [photoPath, setPhotoPath] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [available, setAvailable] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const email = user.email;
    const userid = user.id;

    console.log("email" + email);
    console.log("user_body" + user);
    {/*photoPath String*/}
    {/*name  String*/}
    {/*description  String*/}
    {/*category  String*/}
    {/*available Int*/}
    {/*price Float*/}
    {/*city  String*/}

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {


            const res = await fetch("/api/sell", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photoPath, name, description,category, available, price, city, userid}),
            });

            if (res.ok) {
                redirect("/");
            } else {
                const { message } = await res.json();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred");
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}

                >
                    <option value="product" selected>Product</option>
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
                    onChange={(e) => setPrice(e.target.value)}

                    placeholder="Enter your price"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    onChange={(e) => setAvailable(e.target.value)}

                    placeholder="Enter count"
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                    placeholder="Enter your city"
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="user_avatar">Picture of your
                    product</label>
                <input
                    className="w-full mt-2 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="user_avatar" name="user_avatar" type="file"
                    value={photoPath}
                    onChange={(e) => setPhotoPath(e.target.value)}
                />
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


