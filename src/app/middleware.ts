import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value
    const pathname = req.nextUrl.pathname

    const protectedRoutes = ["/dashboard"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedRoute && !refreshToken) {
        const returnUrl = encodeURIComponent(pathname);
        return NextResponse.redirect(
            new URL(`/auth/login?returnUrl=${returnUrl}`, req.url)
        );
    }

    return NextResponse.next()
}