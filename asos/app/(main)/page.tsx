'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import SearchBar from "@/components/homepage/SearchBar";
import ProductBuy from "@/components/homepage/ProductBuy";
import { useSearchParams } from 'next/navigation';
import { ProductWithUser } from '@/app/lib/definitions';

async function fetchProducts(category: string | null = null): Promise<ProductWithUser[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`http://localhost:3000/api/products${query}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return await res.json();
}

export default function HomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeContent />
        </Suspense>
    );
}

function HomeContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<ProductWithUser[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Extract category from searchParams in useEffect to avoid triggering updates in render
    useEffect(() => {
        setCategory(searchParams.get('category') || null);
    }, [searchParams]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const fetchedProducts = await fetchProducts(category);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        loadProducts();
    }, [category]);

    // Filter products based on the search query
    const filteredProducts = useMemo(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        return products.filter((product) => {
            return (
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.description.toLowerCase().includes(lowerCaseQuery) ||
                product.category.toLowerCase().includes(lowerCaseQuery) ||
                product.city.toLowerCase().includes(lowerCaseQuery) ||
                (product.user?.name?.toLowerCase().includes(lowerCaseQuery) ?? false)
            );
        });
    }, [searchQuery, products]);

    return (
        <div>
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
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <ProductBuy product={product} user={product.user} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
