import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create Users with unique email checks
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            name: 'Alice',
            password: bcrypt.hashSync('123', 10),
            photoUrl: '/profilovka_alica.jpg'
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            email: 'bob@example.com',
            name: 'Bob',
            password: bcrypt.hashSync('123', 10),
            photoUrl: '/profilovka_bob.jpg'
        },
    });

    // Create Products
    const product1 = await prisma.product.create({
        data: {
            name: 'Laptop',
            photoPath: 'notebook.png',
            description: 'High-performance laptop',
            category: 'sale',
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
            category: 'service',
            available: 20,
            price: 800.00,
            city: 'San Francisco',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const product3 = await prisma.product.create({
        data: {
            name: 'Neighbourhood picnic',
            photoPath: 'picnic.png',
            description: 'Picnic for everyone in Central park',
            category: 'event',
            available: 20,
            price: 0.00,
            city: 'New York',
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
