'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "../Misc/Button";
interface NavLinkItem {
    href: string;
    label: string;
    dropdown?: { href: string; label: string }[];
}

interface NavbarProps {
    links?: NavLinkItem[];
}

export default function Navbar({ links }: NavbarProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const defaultLinks: NavLinkItem[] = [
        { 
            href: "/snippets", 
            label: "Snippets",
            dropdown: [
                { href: "/snippets/js", label: "JavaScript" },
                { href: "/snippets/react", label: "React" },
                { href: "/snippets/css", label: "CSS" },
            ]
        },
        { 
            href: "/marketplace", 
            label: "Marketplace",
            dropdown: [
                { href: "/marketplace/templates", label: "Templates" },
                { href: "/marketplace/icons", label: "Icons" },
            ]
        },
        { href: "/forum", label: "Forum" },
    ];

    const navLinks = links || defaultLinks;

    // Close menu when path changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <nav className="w-full bg-background border-b border-border/10 sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto flex flex-row items-center justify-between px-6 lg:px-12 py-4">
                
                {/* Logo Section */}
                <div className="shrink-0 w-auto">
                    <Link href={"/"} title="Home Page" className="block hover:opacity-80 transition-opacity">
                        <Image
                            src="/Images/logo.png"
                            alt="Logo"
                            width={110}
                            height={110}
                            className="w-auto h-8 lg:h-10"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation Section */}
                <div className="hidden lg:flex flex-row items-center justify-center grow">
                    <ul className="flex flex-row items-center gap-10">
                        {navLinks.map((link) => (
                            <li 
                                key={link.href} 
                                className="relative group"
                                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <div className="flex items-center gap-1 py-2">
                                    <Link 
                                        href={link.href} 
                                        className={`text-sm font-medium transition-all duration-300 relative py-1
                                            ${pathname.startsWith(link.href) ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}
                                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
                                            ${pathname.startsWith(link.href) ? 'after:w-full' : 'hover:after:w-full'}
                                        `}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.dropdown && (
                                        <ChevronDown className={`w-4 h-4 text-foreground/50 group-hover:text-primary transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                                    )}
                                </div>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <div className={`absolute top-full left-0 pt-2 transition-all duration-300 transform origin-top
                                        ${openDropdown === link.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                        <div className="bg-card-dark border border-border-dark rounded-xl shadow-2xl p-2 min-w-[200px]">
                                            <ul className="flex flex-col gap-1">
                                                {link.dropdown.map((sublink) => (
                                                    <li key={sublink.href}>
                                                        <Link 
                                                            href={sublink.href}
                                                            className="block px-4 py-2 text-sm text-text-dim hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                        >
                                                            {sublink.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions (Login/Signup) / Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        <Button text="Log In" href="/login" primary={true}></Button>
                        <Button text="Sign Up" href="/signup" primary={false}></Button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-foreground hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out border-t border-border/10 overflow-hidden
                ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 flex flex-col gap-6 bg-background/95 backdrop-blur-md">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href} className="flex flex-col gap-2">
                                <Link 
                                    href={link.href} 
                                    className={`text-lg font-medium ${pathname.startsWith(link.href) ? 'text-primary' : 'text-foreground'}`}
                                >
                                    {link.label}
                                </Link>
                                {link.dropdown && (
                                    <ul className="ml-4 flex flex-col gap-2 border-l border-border/20 pl-4 py-1">
                                        {link.dropdown.map((sublink) => (
                                            <li key={sublink.href}>
                                                <Link href={sublink.href} className="text-sm text-text-dim hover:text-primary transition-colors">
                                                    {sublink.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-3 sm:hidden pt-4 border-t border-border/10">
                        <Button text="Log In" href="/login" primary={true}></Button>
                        <Button text="Sign Up" href="/signup" primary={false}></Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
