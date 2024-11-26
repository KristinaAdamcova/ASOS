import { Product, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ProductWithUser } from "./definitions";

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

export async function fetchProductsByUser(userId: string): Promise<ProductWithUser[]> {
    try {
        const products = await prisma.product.findMany({
            where: { userId },
            include: { user: true }
        });
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to fetch products.");
    }
}

export async function fetchRatingsByUser(userId: string) {
    try {
        const ratingsGiven = await prisma.rating.findMany({
            where: { ratedById: userId },
            include: { ratedTo: true },
        });

        const ratingsReceived = await prisma.rating.findMany({
            where: { ratedToId: userId },
            include: { ratedBy: true },
        });

        return { ratingsGiven, ratingsReceived };
    } catch (error) {
        console.error("Failed to fetch ratings:", error);
        throw new Error("Failed to fetch ratings.");
    }
}

export async function fetchOrdersByUser(userId: string) {
    try {
        const orders = await prisma.history.findMany({
            where: { userId: userId }
        });

        return orders;
    } catch (error) {
        console.error("Failed to fetch ratings:", error);
        throw new Error("Failed to fetch ratings.");
    }
}