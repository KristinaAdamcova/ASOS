import { fetchUserByEmail } from "@/app/lib/data";
import { auth } from "@/auth";
import NavBarClient from "./NavBarClient"; // Client-side component

export default async function NavBar() {
    const session = await auth();
    const user = session?.user?.email
        ? await fetchUserByEmail(session.user.email)
        : null;

    // Transform the user object to match NavBarClient's expected type
    const clientUser = user
        ? {
            name: user.name ?? undefined, // Convert null to undefined
            email: user.email ?? undefined, // Convert null to undefined
        }
        : null;

    return (
        <NavBarClient
            sessionStatus={session ? "authenticated" : "unauthenticated"}
            user={clientUser}
        />
    );
}
