// app/api/products/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        let category = searchParams.get("category");

        if (category === 'vsetko') {
            category = null;
        }
        
        const products = await prisma.product.findMany({
            where: category ? { category } : {},
            include: {
                user: true
            },
        });

        const formattedProducts = products.map(({ user, ...product }) => ({
            ...product,
            user: user ? {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.photoUrl,
            } : null,
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Internal server error" }, 
            { status: 500 }
        );
    }
};
