"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";

type Props = {
    product: Product;
}

export default function CheckoutForm({ product }: Props) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    quantity
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order');
            }

            alert("Order placed successfully!");
            router.push("/account/orders");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl text-black font-bold mb-6">Checkout</h2>

            <div className="mb-6">
                <div className="flex items-center gap-4">
                    <Image
                        src={`/${product.photoPath}`}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-md"
                    />
                    <div>
                        <h3 className="text-black font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-gray-600">Available: {product.available}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        min="1"
                        max={product.available}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}


