import {fetchProduct} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import React from "react";
import UpdateProductForm from "@/components/products/UpdateProductForm";

type Props = {
    params: { id: string; };
}

export default async function Page({ params }: Props) {
    const id = params.id;
    const product = await fetchProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <UpdateProductForm product={product}/>
        </main>
    );
}