import { auth } from "@/auth";
import SellForm from "@/components/homepage/SellForm";
import { redirect } from "next/navigation";

export default async function SellPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <SellForm user={user} />
        </div>
    );
}