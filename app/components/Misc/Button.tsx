"use client"
import Link from "next/link";

interface ButtonsProps{
    text: string;
    href: string;
    primary: boolean;
}

export default function Button({text, href, primary}: ButtonsProps){
    return(
            <Link 
                href={href}
                className={primary 
                    ? "bg-primary text-white rounded-xl px-4 py-2 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-linear" 
                    : "bg-secondary text-white rounded-xl px-4 py-2 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"}
            >
                {text}
            </Link>
    );
}