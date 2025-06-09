"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const hiddenHeaderPaths = ["/login", "/register", "/verify-email"];
	const isAuthPage = hiddenHeaderPaths.includes(pathname);

	if (isAuthPage) {
		return <>{children}</>;
	}

	return <Header>{children}</Header>;
}
