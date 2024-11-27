import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity } = await request.json();

        // Fetch the product to check availability
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.available < quantity) {
            return NextResponse.json(
                { error: "Product is not available in the requested quantity" }, 
                { status: 400 }
            );
        }

        // Update product availability
        await prisma.product.update({
            where: { id: productId },
            data: { available: product.available - quantity }
        });

        // Create the order
        const order = await prisma.order.create({
            data: {
                quantity: quantity,
                userId: session.user.id,
                productId: productId,
            }
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json(
            { error: "Failed to create order" }, 
            { status: 500 }
        );
    }
} 