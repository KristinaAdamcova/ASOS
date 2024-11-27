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
        <div className="p-8 bg-white rounded-lg">
            <SellForm user={user} />
        </div>
    );
}