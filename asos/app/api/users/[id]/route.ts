// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        // Ensure ID is provided as a number
        const params1 = await params

        // Fetch the user without the password
        const user = await prisma.user.findUnique({
            where: { id: params1.id },
            select: { id: true, email: true, name: true }, // Exclude sensitive fields like password
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
