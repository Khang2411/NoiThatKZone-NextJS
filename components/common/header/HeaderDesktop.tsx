"use client"
import { usePathname } from 'next/navigation';
import { HeaderCollection } from '..';

export function HeaderDesktop() {
    const pathname = usePathname()
    return (
        <>
            {
                pathname === '/checkouts' ||
                pathname === '/cart' ||
                pathname === '/login' ||
                pathname === '/forgot-password' ||
                pathname === '/register' ||
                pathname === '/customer/:path*' ? "" :
                <HeaderCollection></HeaderCollection>
            }
        </>
    )
}