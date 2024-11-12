import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 flex justify-center items-center">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}