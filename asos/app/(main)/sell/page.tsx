import { auth } from "@/auth";
import SellForm from "@/components/homepage/SellForm";
import { User } from "@prisma/client";

export default async function SellPage() {
    const session = await auth();
    const user = session?.user;

    return (
        <div>
            <SellForm user={user as User} />
        </div>
    );
}