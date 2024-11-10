// app/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define Product and User types
type User = {
    id: number;
    email: string;
    name: string;
};

type Product = {
    photoPath: string;
    id: number;
    name: string;
    description: string;
    category: string;
    available: boolean;
    price: number;
    city: string;
    user: User | null;
};

// Fetch products from the server, filtering by category if provided
async function fetchProducts(category: string | null = null): Promise<Product[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`http://localhost:3000/api/products${query}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return await res.json();
}

// Main component for displaying products
export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
    try {
        const params = await searchParams;
        const category = params.category;
        const products = await fetchProducts(category);

        return (
            <div>
                <h1>Our Products</h1>

                {/* Filter Buttons */}
                <div style={{ marginBottom: '20px' }}>
                    <Link href="/" style={{ marginRight: '10px' }}>Všetko</Link>
                    <Link href="/?category=sluzby" style={{ marginRight: '10px' }}>Služby</Link>
                    <Link href="/?category=predaj" style={{ marginRight: '10px' }}>Predaj</Link>
                    <Link href="/?category=udalosti" style={{ marginRight: '10px' }}>Udalosti</Link>
                </div>

                {/* Product Grid */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        margin: '0 200px',
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                flex: '1 1 calc(25% - 20px)',
                                boxSizing: 'border-box',
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '8px',
                                margin: '0 10px',
                            }}
                        >
                            <h2>{product.name}</h2>
                            <Image
                                src={`/${product.photoPath}`} // Dynamically include the product's photo path
                                alt="Description of the image"
                                width={100}  // Specify width
                                height={100} // Specify height
                            />
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
        console.error('Error fetching products:', error);
        return <div>Something went wrong while loading the products. Please try again later.</div>;
    }
}
