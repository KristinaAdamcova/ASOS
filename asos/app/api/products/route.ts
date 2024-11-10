import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        console.log('Fetching products from the database...');
        const products = await prisma.product.findMany();
        console.log('Fetched products:', products);
        return new Response(JSON.stringify(products), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(
            JSON.stringify({ error: 'Error fetching products' }),
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
