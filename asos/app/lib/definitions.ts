import { Product } from "@prisma/client";

export type User = {
    id?: string;
    name?: string | null;
    email?: string | null;
}

export type ProductWithUser = Product & {
    user: User | undefined
}
