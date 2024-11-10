// app/api/products/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to fetch user by ID
const fetchUserById = async (userId: number) => {
    try {
        const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!userRes.ok) {
            throw new Error(`Failed to fetch user with ID ${userId}`);
        }
        const user = await userRes.json();
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};

export const GET = async () => {
    try {
        // Fetch products from the database
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                available: true,
                price: true,
                city: true,
                userId: true, // We will replace this with the user object
            },
        });

        // For each product, fetch the associated user by userId
        const productsWithUser = await Promise.all(
            products.map(async (product) => {
                const user = await fetchUserById(product.userId); // Fetch user for each product
                // Replace the userId with the full user object
                const { userId, ...productWithoutUserId } = product;
                return { ...productWithoutUserId, user }; // Attach user data to product
            })
        );

        // Return the products with user data as JSON
        return NextResponse.json(productsWithUser);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
