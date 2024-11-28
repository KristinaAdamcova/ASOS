import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create Users
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

    const user3 = await prisma.user.upsert({
        where: { email: 'carol@example.com' },
        update: {},
        create: {
            email: 'carol@example.com',
            name: 'Carol',
            password: bcrypt.hashSync('123', 10),
            photoUrl: ''
        },
    });

    const user4 = await prisma.user.upsert({
        where: { email: 'dave@example.com' },
        update: {},
        create: {
            email: 'dave@example.com',
            name: 'Dave',
            password: bcrypt.hashSync('123', 10),
            photoUrl: ''
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
            category: 'sale',
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

    const product4 = await prisma.product.create({
        data: {
            name: 'Headphones',
            photoPath: 'headphones.png',
            description: 'Noise-canceling headphones',
            category: 'sale',
            available: 15,
            price: 300.00,
            city: 'Los Angeles',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const product5 = await prisma.product.create({
        data: {
            name: 'Gaming Chair',
            photoPath: 'chair.png',
            description: 'Ergonomic gaming chair',
            category: 'sale',
            available: 5,
            price: 250.00,
            city: 'Chicago',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const product6 = await prisma.product.create({
        data: {
            name: 'Cutting grass',
            photoPath: 'cutting.png',
            description: 'I will cut your grass for you!',
            category: 'service',
            available: 5,
            price: 20.00,
            city: 'Chicago',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    // Create Orders
    await prisma.order.create({
        data: {
            quantity: 1,
            user: { connect: { id: user1.id } },
            product: { connect: { id: product1.id } },
            timestamp: new Date(),
        },
    });

    await prisma.order.create({
        data: {
            quantity: 2,
            user: { connect: { id: user2.id } },
            product: { connect: { id: product2.id } },
            timestamp: new Date(),
        },
    });

    await prisma.order.create({
        data: {
            quantity: 3,
            user: { connect: { id: user3.id } },
            product: { connect: { id: product3.id } },
            timestamp: new Date(),
        },
    });

    await prisma.order.create({
        data: {
            quantity: 1,
            user: { connect: { id: user4.id } },
            product: { connect: { id: product4.id } },
            timestamp: new Date(),
        },
    });

    // Create Ratings
    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user1.id } },
            ratedTo: { connect: { id: user2.id } },
            description: 'Excellent product and fast shipping!',
            rating: 5,
        },
    });

    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user3.id } },
            ratedTo: { connect: { id: user4.id } },
            description: 'Great seller, highly recommended!',
            rating: 4,
        }
    });

    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user2.id } },
            ratedTo: { connect: { id: user1.id } },
            description: 'Smooth transaction!',
            rating: 5,
        },
    });

    await prisma.rating.create({
        data: {
            ratedBy: { connect: { id: user4.id } },
            ratedTo: { connect: { id: user3.id } },
            description: 'Awesome experience, thank you!',
            rating: 5,
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
