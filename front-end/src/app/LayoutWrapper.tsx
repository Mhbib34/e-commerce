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
	const hiddenHeaderPaths = ["/login", "/register", "/verify-email"];
	const isAuthPage = hiddenHeaderPaths.includes(pathname);
	const { isLoading } = useAuth();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isAuthPage) {
		return <>{children}</>;
	}

	return <Header>{children}</Header>;
}
