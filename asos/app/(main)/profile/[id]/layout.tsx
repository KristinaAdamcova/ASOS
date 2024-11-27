import { fetchUser } from "@/app/lib/data";
import ProfileNav from "@/components/ProfileNav";
import Image from 'next/image';

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { id: string };
}>) {
    const user = await fetchUser(params.id);

    const nav = [
        { href: `/profile/${params.id}/`, label: 'Products' },
        { href: `/profile/${params.id}/ratings`, label: 'Ratings' },
    ];

    return (
        <div className="container mx-auto p-10 gap-5 flex flex-row">
            <div className="w-64 bg-white shadow-xl rounded-lg h-fit">
                <div className="px-4 py-10">
                    <div className="mb-6 flex flex-row align-items-start">
                        <div className="w-2/6">
                            {user?.photoUrl ? (
                                <Image
                                    src={user?.photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="w-6/8 m-3 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user?.name || 'Guest'}
                            </h3>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Menu</h2>

                    <ProfileNav nav={nav} />
                </div>
            </div>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
