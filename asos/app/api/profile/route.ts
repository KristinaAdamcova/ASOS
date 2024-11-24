import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    console.log("Profile update request initiated");

    try {
        // Authenticate the user
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json(); // Assuming the form data is sent as JSON
        const { name, email } = data;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }


        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                email
            },
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
}
