// NavBar.jsx (or NavBar.tsx)

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"

const NavBar = () => {

    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        {/* Left side: brand or logo */}
        <div className="text-xl font-semibold text-gray-800">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <div>
                    <Image src="/assets/icons/lanmai.png" alt="Lanmai Logo" width={80} height={80} />
                    </div>
                </Link>

                <SignedIn>
                    <ul className="navbar-nav_elements">
                    {navLinks.slice(0, 3).map((link) => {
                        const isActive = link.route === pathname
                        return (
                        <li
                            key={link.route}
                            className={`navbar-nav_element group ${
                            isActive ? 'bg-purple-gradient' : 'text-gray-700'
                            }`}
                        >
                            <Link className="navbar-link" href={link.route}>
                            <Image
                                src={link.icon}
                                alt="logo"
                                width={24}
                                height={24}
                                className={`${isActive && 'brightness-200'}`}
                            />
                            {link.label}
                            </Link>
                        </li>
                        )
                    })}
                    </ul>
                </SignedIn>
            </div>
        </div>
        {/* Right side: buttons */}
        <div className="space-x-2">
            <SignedIn>
                <ul className="navbar-nav_elements">
                    {navLinks.slice(6).map((link) => {
                        const isActive = link.route === pathname

                        return (
                        <li key={link.route} className={`navbar-nav_element group ${
                            isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                        }`}>
                            <Link className="navbar-link" href={link.route}>
                            <Image 
                                src={link.icon}
                                alt="logo"
                                width={24}
                                height={24}
                                className={`${isActive && 'brightness-200'}`}
                            />
                            {link.label}
                            </Link>
                        </li>
                        )
                    })}

                    <li className="flex-center cursor-pointer gap-2 p-4">
                        <UserButton afterSignOutUrl='/' showName />
                    </li>
                </ul>
            </SignedIn>


            <SignedOut>
                <Button asChild className="button bg-purple-gradient bg-cover">
                    <Link href="/sign-in">Login</Link>
                </Button>
            </SignedOut>
        </div>
        </nav>
    )
}

export default NavBar
