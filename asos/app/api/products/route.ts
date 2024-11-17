// app/api/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let category = searchParams.get("category");

        if (category === 'vsetko') {
            category = null;
        }
        
        const products = await prisma.product.findMany({
            where: category ? { category } : {},
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        // Transform the response to match the existing structure
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formattedProducts = products.map(({ userId, user, ...product }) => ({
            ...product,
            user: user ? {
                id: user.id,
                name: user.name,
                email: user.email,
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
