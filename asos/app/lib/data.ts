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
    const product = await prisma.product.findUnique({
        where: { id: id },
    });
    return product;
}

export async function fetchProductsByUser(email: string): Promise<Product[]> {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    const id = user?.id;
    const products = await prisma.product.findMany({
        where: { userId: id },
    });
    return products;
}
