'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from "@/components/homepage/NavBar";
import SearchBar from "@/components/homepage/SearchBar";
import Product from "@/components/homepage/Product";
import { useSearchParams } from 'next/navigation';

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

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function loadProducts() {
            const category = searchParams.get('category') || null;
            const fetchedProducts = await fetchProducts(category);
            setProducts(fetchedProducts);
        }

        loadProducts();
    }, [searchParams]);

    const filteredProducts = products.filter((product) => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        // Check all fields against the search query
        return (
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery) ||
            product.category.toLowerCase().includes(lowerCaseQuery) ||
            product.city.toLowerCase().includes(lowerCaseQuery) ||
            (product.user?.name.toLowerCase().includes(lowerCaseQuery) ?? false)
        );
    });

    return (
        <div>
            <NavBar />

            <SearchBar onSearch={setSearchQuery} />

            {/* Filter Buttons */}
            <div className="flex justify-center items-center min-h-7 mt-3 mb-3">
                <div className="space-x-4">
                    <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                        <Link href="/">All</Link>
                    </button>
                    <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                        <Link href="/?category=service">Services</Link>
                    </button>
                    <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                        <Link href="/?category=sale">Sales</Link>
                    </button>
                    <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
                        <Link href="/?category=event">Events</Link>
                    </button>
                </div>
            </div>
            <hr className="m-3"/>

            {/* Product Grid */}
            <div className="flex flex-wrap gap-5 mx-auto px-5 justify-center" >
                {filteredProducts.map((product) => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
