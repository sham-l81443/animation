'use client'

import Link from 'next/link'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';


const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
    return (
        <>
            <div className='hidden md:flex items-center justify-center text-white font-medium text-base py-8 z-50! fixed top-0 left-0 w-full '>
                <ul className='flex items-center justify-center gap-6'>
                    {navigationItems.map((item) => (
                        <li key={item.href} className='hover:text-gray-400 text-white z-20'>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='md:hidden flex items-center justify-end p-4 z-50! fixed top-0 right-0'>
                <Drawer direction="bottom">
                    <DrawerTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="bg-zinc-900 border-none text-zinc-400">
                        <DrawerTitle className='sr-only'>Navigation</DrawerTitle>
                        <div className="px-4 pb-4">
                            <nav className="flex flex-col gap-4 py-4">
                                {navigationItems.map((item) => (
                                    <DrawerClose key={item.href} asChild>
                                        <Link
                                            href={item.href}
                                            className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </nav>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

export default Navbar