import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/type/userType";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		if (context.isAuthenticated) {
			const fetchUsers = async () => {
				try {
					const res = await axiosInstance.get("/user/list");
					const nonAdmins = res.data.user.filter(
						(u: User) => u.role !== "ADMIN"
					);
					setUsers(nonAdmins);
				} catch (err) {
					const error = err as AxiosError<{ errors: string }>;
					if (error.response?.status === 401) {
						// optionally handle unauthorized access
					} else {
						console.error("Error fetching users:", err);
					}
				}
			};

			fetchUsers();
		}
		//eslint-disable-next-line
	}, []);

	return {
		...context,
		nonAdminUsers: users, // optional return
	};
};
