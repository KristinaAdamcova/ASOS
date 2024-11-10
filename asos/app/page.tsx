// app/page.tsx
import React from 'react';

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
            <div>
                <h1>Our Products</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
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
        );


    } catch (error) {
        // Handle errors (network issues, invalid JSON, etc.)
        console.error('Error fetching products:', error);
        return <div>Something went wrong while loading the products. Please try again later.</div>;
    }
}
