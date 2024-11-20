import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/zod";

export async function POST(request: Request) {
    try {
        const { email, name, password } = await request.json();

        console.log(email, name, password);
        
        // Validate input using zod schema
        const validation = registerSchema.safeParse({ email, name, password });
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 } // 409 Conflict
            );
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        if (!newUser) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
