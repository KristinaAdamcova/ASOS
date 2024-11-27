import {fetchProduct} from '@/app/lib/data';
import {notFound, redirect} from 'next/navigation';
import React from "react";
import UpdateProductForm from "@/components/products/UpdateProductForm";
import {auth} from "@/auth";

type Props = {
    params: { id: string; };
}

export default async function Page({ params }: Props) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const id = params.id;
    const product = await fetchProduct(id);

    if (!product) {
        notFound();
    }


    if (user.id !== product.userId) {
        console.log('User is not the owner of the product. Redirecting to /.');
        redirect('/');
    }

    return (
        <main>
            <UpdateProductForm product={product}/>
        </main>
    );
}