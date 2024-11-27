// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        // Ensure ID is provided as a number
        const params1 = await params

        // Fetch the user without the password
        const user = await prisma.product.findUnique({
            where: { id: params1.id },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};


// DELETE Method: Delete product by ID
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: id },
        });

        if (!existingProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        // Delete the product
        await prisma.product.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;

        // Parse the request body
        const body = await req.json();

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: id },
        });

        if (!existingProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: body, // Ensure the structure of `body` matches your `product` schema in Prisma
        });
        revalidatePath(`/account/products`);

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};