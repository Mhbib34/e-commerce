import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
	console.log("Middleware running...", request.nextUrl.pathname);
	const token = request.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.next();
	}

	try {
		//eslint-disable-next-line
		const decoded: any = jwtDecode(token);
		console.log(decoded);

		if (decoded.role === "ADMIN" && request.nextUrl.pathname === "/") {
			return NextResponse.redirect(
				new URL("/admin/dashboard", request.url)
			);
		}
		//eslint-disable-next-line
	} catch (err) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
