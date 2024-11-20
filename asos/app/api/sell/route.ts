import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@prisma/client";
import {useSession} from "next-auth/react";
import {fetchUser} from "@/app/lib/data";

type CreateProductReqBody = Omit<Product, "id">;


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
                photoPath: photoPath,
                name: name,
                description: description,
                category: category,
                available: available,
                price: price,
                city: city,
                user:user_body.id

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
        return NextResponse.json("Something went wrong publishing the product", {
            status: 500,
        });
}