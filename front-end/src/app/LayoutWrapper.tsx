"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/fragment/Loading";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const hiddenHeaderPaths = [
		"/login",
		"/register",
		"/verify-email",
		"/reset-password",
		"/reset-password-otp",
	];

	// Jika path termasuk yang disembunyikan ATAU dimulai dengan "/admin"
	const isAuthPage =
		hiddenHeaderPaths.includes(pathname) || pathname.startsWith("/admin");

	const { isLoading } = useAuth();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isAuthPage) {
		return <>{children}</>;
	}

	return (
		<div className="md:px-28 px-2">
			<Header>{children}</Header>
		</div>
	);
}
