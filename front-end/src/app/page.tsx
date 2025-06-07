"use client";

import LoadingSpinner from "@/components/fragment/Loading";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
	const { user, isAuthenticated, isLoading, logout } = useAuth();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="container mx-auto p-4">
			{isAuthenticated ? (
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">
						Welcome, {user?.name || user?.username}!
					</h1>
					<p className="mb-4">Email: {user?.email}</p>
					<p className="mb-4">
						Account Status:{" "}
						{user?.isAccountVerified ? "Verified" : "Not Verified"}
					</p>
					<button
						onClick={logout}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="text-center">
					<p className="text-xl">You are not logged in</p>
					<p className="mt-2">
						Please log in to access your dashboard.
					</p>
					<button
						onClick={() => (window.location.href = "/login")}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Login
					</button>
				</div>
			)}
		</div>
	);
}
