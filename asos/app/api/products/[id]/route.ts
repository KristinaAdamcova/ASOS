// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        // Ensure ID is provided as a number
        const params1 = await params
        const userId = parseInt(params1.id, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        // Fetch the user without the password
        const user = await prisma.product.findUnique({
            where: { id: userId },
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
