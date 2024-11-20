import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userExists = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!userExists) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const body = await req.json();
        
        if (!body.name || !body.description || !body.category || !body.price) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                category: body.category,
                price: body.price,
                available: body.available,
                city: body.city,
                photoPath: body.photoPath || 'default.jpg',
                user: {
                    connect: { id: session.user.id }
                }
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { message: "Error creating product", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
