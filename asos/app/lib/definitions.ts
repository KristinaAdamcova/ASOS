export type User = {
    id?: string;
    name?: string | null;
    email?: string | null;
}

export type Product = {
    id: string;
    photoPath: string;
    name: string;
    description: string;
    category: string;
    available: number;
    price: number;
    city: string;
}
