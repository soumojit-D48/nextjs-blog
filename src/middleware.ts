
// // define protected routes -> /profile, /post/create, /post/edit/1

import { NextRequest, NextResponse } from "next/server";
import {getSessionCookie} from 'better-auth/cookies'
// import { auth } from "./lib/auth";
// import { headers } from "next/headers";

const protectedRoutes = ['/profile', '/post/create', '/post/edit']

export async function middleware (request: NextRequest) {
    const pathName = request.nextUrl.pathname //  current path name means /auth, /profile ...

    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })

    const session = getSessionCookie(request)

    // remember /auth is not a protected route 
    const isProtectedRoute = protectedRoutes.some(route => 
        pathName.startsWith(route)
    )

    if(isProtectedRoute && !session){ 
        // user is not logged in, means not authenticated so redirect user to auth page 
        return NextResponse.redirect(new URL('/auth', request.url))
    }
    // if user is already logged in and trying to access the auth page then he autometically redirected to home page
    if(pathName === '/auth' && session){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/profile/:path*', '/post/create', '/post/edit/:path*', '/auth'],
}


// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const path = req.nextUrl.pathname;

//   const protectedRoutes = ["/profile", "/post/create", "/post/edit"];
//   const isProtected = protectedRoutes.some(route =>
//     path === route || path.startsWith(route + "/")
//   );

//   // Protect pages
//   if (isProtected) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }
//     try {
//       await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//     } catch {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }
//   }

//   // Block /auth if logged in with a valid token
//   if (path === "/auth" && token) {
//     try {
//       await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//       return NextResponse.redirect(new URL("/", req.url));
//     } catch {
//       // Invalid/expired token → let them access /auth
//     }
//   }

//   return NextResponse.next();
// }
