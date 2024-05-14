import { encodeUrl } from '@/utils/url';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const pathname=url.pathname
    let cookie = request.cookies.get('accessToken')

    if (!cookie) {
        return NextResponse.redirect(new URL(`/login?back_to=${encodeUrl(pathname)}`, request.url))
    }
    const response = await fetch(`${process.env.API_URL}/api/v1/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.value}`
        },
    });
    const profile = await response.json()
    const isLoggedIn = Boolean(profile.data)
    if (isLoggedIn === false) {
        return NextResponse.redirect(new URL(`/login?back_to=${encodeUrl(pathname)}`, request.url))
    }
}

export const config = {
    matcher: ['/customer/:path*','/orders'],
}