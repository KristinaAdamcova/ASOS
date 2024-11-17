import { Product, User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function fetchUser(email: string): Promise<User | null> {
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