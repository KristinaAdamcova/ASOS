import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';


export async function POST(request: NextRequest) {
    console.log("path")
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name}`

        // With the file data in the buffer, you can do whatever you want with it.
        const path = join('public', 'uploads', filename);
        await writeFile(path, buffer);

        const photoUrl = join('uploads',filename)

        return NextResponse.json({ success: true, photoUrl});
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}