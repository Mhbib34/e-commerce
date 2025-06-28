"use client";

import IsLoginMain from "@/components/layout/IsLoginMain";
import IsNotLoginMain from "@/components/layout/IsNotLoginMain";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="flex items-center justify-center mt-4">
			{isAuthenticated ? <IsLoginMain /> : <IsNotLoginMain />}
		</div>
	);
}
