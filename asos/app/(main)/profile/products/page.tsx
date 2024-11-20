import { fetchProductsByUser } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Products() {
    const session = await auth();
    const user = session?.user;

    console.log(user);

    if (!user) {
        redirect("/login");
    }

    const products = await fetchProductsByUser(user.id);

    console.log(products);
    
    return <div>Products</div>;
}