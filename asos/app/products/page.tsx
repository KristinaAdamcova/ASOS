"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/homepage/NavBar";
import ProductDetail from "@/components/products/ProductDetail";

const fetchProduct = async (id: string | null) => {
    if (!id) throw new Error("Product ID is required");

    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }
    return response.json(); // Ensure this returns a single product object
};

const ProductPage = () => {
    const searchParams = useSearchParams();
    const [product, setProduct] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const id = searchParams.get("id");
                if (!id) {
                    throw new Error("No product ID provided in search params");
                }
                const fetchedProduct = await fetchProduct(id);
                console.log("Fetched product:", fetchedProduct); // Debug API response
                setProduct(fetchedProduct);
            } catch (err: any) {
                console.error("Error fetching product:", err);
                setError(err.message);
                setProduct(null);
            }
        };

        loadProduct();
    }, [searchParams]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar/>

            <ProductDetail {...product} />
        </div>
    );
};

export default ProductPage;
