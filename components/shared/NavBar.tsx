import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <div className="text-xl font-semibold text-gray-800">
            <div className="flex items-center gap-14">
                <Link href="/">
                    <div>
                        <Image
                            src="/assets/icons/lanmai.png"
                            alt="Lanmai Logo"
                            width={80}
                            height={80}
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                <SignedIn>
                <ul className="navbar-nav_elements">
                    {navLinks.slice(0, 1).map((link) => {
                    const isActive = link.route === pathname;
                    return (
                        <li
                        key={link.route}
                        className={`navbar-nav_element group ${
                            isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                        }`}
                        >
                        <Link className="navbar-link" href={link.route}>
                            <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                            className={`${isActive && "brightness-200"}`}
                            />
                            {link.label}
                        </Link>
                        </li>
                    );
                    })}
                </ul>
                </SignedIn>
                </div>
            </div>
        </div>

        {/* Right side: buttons */}
        <div className="space-x-2 hidden md:flex items-center gap-6">
            <SignedIn>
                <ul className="navbar-nav_elements">
                    {/* {navLinks.slice(6).map((link) => {
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
                    })} */}

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

        <header className="header md:hidden">
            <nav className="flex gap-2">
                <SignedIn>
                <UserButton afterSignOutUrl="/" />

                <Sheet>
                    <SheetTrigger>
                    <Image 
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={32}
                        height={32}
                        className="cursor-pointer"
                    />
                    </SheetTrigger>
                    <SheetContent className="sheet-content sm:w-64">
                        <SheetTitle>
                            <Image 
                            src="/assets/icons/lanmai.png"
                            alt="logo"
                            width={152}
                            height={23}
                            />
                        </SheetTitle>

                    <>
                        <ul className="header-nav_elements">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                <li 
                                    className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                                    key={link.route}
                                    >
                                    <Link className="sidebar-link cursor-pointer" href={link.route}>
                                    <Image 
                                        src={link.icon}
                                        alt="logo"
                                        width={24}
                                        height={24}
                                    />
                                    {link.label}
                                    </Link>
                                </li>
                                )
                            })}
                        </ul>
                    </>
                    </SheetContent>
                </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                    <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>

    </nav>
  );
};

export default NavBar;