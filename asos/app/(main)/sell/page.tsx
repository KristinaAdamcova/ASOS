import Image from "next/image";
import Link from "next/link";
import SellForm from "@/components/homepage/SellForm";

export default function SellPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex flex-col justify-center items-center">
            <Link href="/asos/public" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                    src="/logo.png"
                    alt="Description of the image"
                    width={100}
                    height={100}
                />
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Neighbourhood portal</span>
            </Link>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg w-full mt-20">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
                <SellForm />
            </div>
        </div>
    );
}