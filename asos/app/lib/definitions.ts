import { Product } from "@prisma/client";

export type User = {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export type ProductWithUser = Product & {
    user: User | undefined
}

export type CreateRating = {
    ratedById: string;
    ratedToId: string;
    rating: number;
    description: string;
}
