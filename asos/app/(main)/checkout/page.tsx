import { auth } from "@/auth";
import { fetchProduct } from "@/app/lib/data";
import CheckoutForm from "@/components/homepage/CheckoutForm";
import { redirect } from "next/navigation";

export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: { productId: string };
}) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    if (!searchParams.productId) {
        redirect("/");
    }

    const product = await fetchProduct(searchParams.productId);

    if (!product) {
        redirect("/");
    }

    return (
        <div>
            <CheckoutForm product={product} />
        </div>
    );
}