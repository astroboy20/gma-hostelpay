import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  console.log(`Middleware processing: ${pathname}`);

  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    console.log('Not a protected route, skipping');
    return NextResponse.next();
  }

  if (!refreshToken) {
    console.log('No refresh token, redirecting to login');
    const returnUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/auth/login?returnURL=${returnUrl}`, req.url)
    );
  }

  console.log('Access granted to protected route');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api).*)',
    '/dashboard/:path*'
  ],
  runtime: 'experimental-edge',
};