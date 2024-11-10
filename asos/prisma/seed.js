import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Users with unique email checks
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            name: 'Alice',
            password: '123'
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            email: 'bob@example.com',
            name: 'Bob',
            password: '123'
        },
    });

    // Create Products
    const product1 = await prisma.product.create({
        data: {
            name: 'Laptop',
            photoPath: 'notebook.png',
            description: 'High-performance laptop',
            category: 'predaj',
            available: 10,
            price: 1200.00,
            city: 'New York',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Smartphone',
            photoPath: 'smartphone.png',
            description: 'Latest model smartphone',
            category: 'sluzby',
            available: 20,
            price: 800.00,
            city: 'San Francisco',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    // Create Histories
    await prisma.history.create({
        data: {
            user: { connect: { id: user1.id } },
            product: { connect: { id: product1.id } },
            timestamp: new Date(),
        },
    });

    await prisma.history.create({
        data: {
            user: { connect: { id: user2.id } },
            product: { connect: { id: product2.id } },
            timestamp: new Date(),
        },
    });

    // Create Ratings
    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user1.id } },
            ratedTo: { connect: { id: user2.id } },
            description: 'Great buyer!',
            rating: 5,
        },
    });

    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user2.id } },
            ratedTo: { connect: { id: user1.id } },
            description: 'Smooth transaction!',
            rating: 4,
        },
    });
}

main()
    .then(() => console.log('Seed data created successfully!'))
    .catch((e) => {
        console.error('Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
