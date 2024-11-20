import { Product, User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function fetchUserByEmail(email: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchProduct(id: string): Promise<Product | null> {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw new Error("Failed to fetch product.");
    }
}

export async function fetchProductsByUser(userId: string): Promise<Product[]> {
    try {
        const products = await prisma.product.findMany({
            where: { userId },
        });
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to fetch products.");
    }
}
