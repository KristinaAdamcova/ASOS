import { prisma } from "@/lib/prisma";

export async function fetchProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id: id },
    });
    return product;
}