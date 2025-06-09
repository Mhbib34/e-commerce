"use client";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboardPage = () => {
	const { logout } = useAuth();

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default AdminDashboardPage;
