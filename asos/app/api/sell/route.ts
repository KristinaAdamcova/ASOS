import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type CreateProductReqBody = {
    "photoPath": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "available": 0,
    "price": 0.0,
    "city": "string",
    "userId": "string"
}

export const POST = async (req: NextRequest) => {
    try {
        const body: CreateProductReqBody = await req.json();

        console.log("product_body" + body);

        if (!body || typeof body !== "object") {
            return NextResponse.json("Invalid request body", { status: 400 });
        }

        // Create the new user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newProduct = await prisma.product.create({
            data: {
                photoPath: body.photoPath,
                name: body.name,
                description: body.description,
                category: body.category,
                available: body.available,
                price: body.price,
                city: body.city,
                user: {
                    connect: {
                        id: body.userId,
                    },
                },
            },
        });

        return NextResponse.json({ newProduct });
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json("Invalid JSON in request body", {
                status: 400,
            });
        }
        console.error(error);
        return NextResponse.json(
            "Something went wrong publishing the product",
            {
                status: 500,
            }
        );
    }
};
