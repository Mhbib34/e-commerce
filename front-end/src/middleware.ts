import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Decode = {
	role: string;
};

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.next();
	}

	try {
		const decoded: Decode = jwtDecode(token);

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
