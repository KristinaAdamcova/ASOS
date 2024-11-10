// app/page.tsx
import React from 'react';
import Image from 'next/image';

// Define Product and User types
type User = {
    id: number;
    email: string;
    name: string;
};

type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    available: boolean;
    price: number;
    city: string;
    user: User | null; // Changed from userId to user (to hold the full user object)
};


export default async function Home() {
    try {
        // Fetch products from the server-side API
        const res = await fetch('http://localhost:3000/api/products', {
            cache: 'no-store', // Ensures the data is freshly fetched on each request
        });

        // Check if the response is okay (status code 2xx)
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        // Parse the JSON response
        const products: Product[] = await res.json();

        // Ensure products is an array before mapping
        if (!Array.isArray(products)) {
            throw new Error('Products is not an array');
        }

        return (
            <main className="flex min-h-screen flex-col p-6">
                <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-500 p-4 md:h-52">
                    <Image
                        src="/logo.png"
                        width={187}
                        height={142}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                    />
                </div>
                <div>
                    <h1>Our Products</h1>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap', // Ensures items wrap to the next line
                            gap: '20px', // Margin between items
                            margin: '0 200px',
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    flex: '1 1 calc(25% - 20px)', // 4 items per row (25% width minus the gap)
                                    boxSizing: 'border-box', // Ensures padding is included in width calculation
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                            >
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Available:</strong> {product.available ? 'Yes' : 'No'}</p>
                                <p><strong>City:</strong> {product.city}</p>

                                {/* Render user information */}
                                {product.user && (
                                    <div>
                                        <h3>Seller Information</h3>
                                        <p><strong>Name:</strong> {product.user.name}</p>
                                        <p><strong>Email:</strong> {product.user.email}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        // Handle errors (network issues, invalid JSON, etc.)
        console.error('Error fetching products:', error);
        return <div>Something went wrong while loading the products. Please try again later.</div>;
    }
}
