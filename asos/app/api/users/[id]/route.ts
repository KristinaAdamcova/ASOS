// app/api/users/[id]/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;  // Extract the `id` from the URL params

        // Fetch the user from the database using Prisma
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id), // Ensure the ID is passed as a number
            },
            select: {
                id: true,
                email: true,
                name: true,
                // Do not include 'password'
            },
        });

        if (!user) {
            // Return a 404 if the user was not found
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return the user data as JSON
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
