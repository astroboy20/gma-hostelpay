import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { refreshToken } = await req.json()
        const response = NextResponse.json({ message: "Referesh Token saved!" })
        const isProduction = process.env.NODE_ENV === "production"
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            path: "/",
            sameSite: isProduction ? "none" : "lax",
            maxAge: 60 * 60 * 24 * 7 
        })

        return response
    } catch (error) {
        console.error("Error setting refresh token:", error);
        return NextResponse.json({ error: "Failed to set refresh token" }, { status: 500 });
    }
}