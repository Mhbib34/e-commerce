"use client";
import LoadingSpinner from "@/components/fragment/Loading";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboardPage = () => {
	const { isLoading, logout } = useAuth();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default AdminDashboardPage;
