'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    href: string;
    label: string;
}

type Props = {
    nav: NavItem[];
}

export default function ProfileNav({ nav }: Props) {
    const pathname = usePathname();
    
    return (
        <nav className="space-y-2">
            {nav.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`block px-4 py-2 rounded-lg ${
                        pathname === href 
                            ? 'bg-lime-100 text-lime-700' 
                            : 'text-gray-700 hover:bg-lime-100 hover:text-lime-700'
                    }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
} 