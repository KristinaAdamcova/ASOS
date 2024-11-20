import { fetchUserByEmail } from "@/app/lib/data";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    const user = session?.user?.email ? await fetchUserByEmail(session.user.email) : null;

    if (!session || !user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto p-10 gap-5 flex flex-row">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg rounded-lg">
                <div className="px-4 py-10">
                    <div className="mb-6 flex flex-row align-items-start">
                        <div className="w-2/6">
                            {/* {user?.image ? (
                                <Image 
                                    src={user.image} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                )} */}
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-6/8 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user?.name || 'Guest'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {user?.email || 'No email'}
                            </p>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Menu</h2>
                    <nav className="space-y-2">
                        <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-700 rounded-lg">
                            Profile Overview
                        </Link>
                        <Link href="/profile/products" className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-700 rounded-lg">
                            My Products
                        </Link>
                        <Link href="/profile/orders" className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-700 rounded-lg">
                            My Orders
                        </Link>
                        <Link href="/profile/ratings" className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-700 rounded-lg">
                            My Ratings
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
