import { auth } from "@/auth";
import RegistrationForm from "@/components/auth/RegistrationForm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegistrationPage() {
    const session = await auth();

    if (session?.user) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex flex-col justify-center items-center">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                    src="/logo.png" // Dynamically include the product's photo path
                    alt="Description of the image"
                    width={200}  // Specify width
                    height={200} // Specify height
                />
                <span
                    className="self-center text-7xl font-semibold whitespace-nowrap dark:text-white" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Neighbourhood portal</span>
            </Link>


            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg w-full mt-10">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4"
                    style={{ textShadow: "0.8px 0.8px 1px rgba(0, 0, 0, 0.5)" }}>
                    Register</h1>
                <RegistrationForm />
            </div>
        </div>
    );
}