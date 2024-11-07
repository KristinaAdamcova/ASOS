import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

type CreateUserReqBody = Omit<User, "id">;

export const POST = async (req: NextRequest) => {
    try {
        const body: CreateUserReqBody = await req.json();

        if (!body || typeof body !== "object") {
            return NextResponse.json("Invalid request body", { status: 400 });
        }

        if (!body.email) {
            return NextResponse.json("Please provide an email", {
                status: 400,
            });
        }

        console.log(body);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
            },
        });
        return NextResponse.json({ user });
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json("Invalid JSON in request body", {
                status: 400,
            });
        }
        console.error(error);
        return NextResponse.json("Something went wrong creating the user", {
            status: 500,
        });
    }
};
