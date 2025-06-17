"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { showSuccess } from "@/lib/tasterHelper";
import axiosInstance from "@/lib/axiosInstance";

type User = {
	id: string;
	email: string;
	username: string;
	name: string;
	isAccountVerified: boolean;
	role: string;
};

type AuthContextType = {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	logout: () => void;
	refetchUser: () => Promise<void>;
	deleteUser: (id: string) => Promise<void>;
	nonAdminUsers: User[];
	fetchNonAdminUsers: () => Promise<void>;
	// updateUser: (data: FormData) => Promise<User>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [nonAdminUsers, setNonAdminUsers] = useState<User[]>([]);

	const refetchUser = async () => {
		try {
			const res = await axios.get("/user");
			setUser(res.data.user);
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				setUser(null);
			} else {
				console.error("Error fetching user:", err);
			}
		} finally {
			setIsLoading(false);
		}
	};
	const logout = async () => {
		try {
			await axios.post("/user/logout");
			showSuccess("User logout successful.");
		} catch (err) {
			console.log("Logout error:", err);
		} finally {
			setUser(null);
		}
	};

	const deleteUser = async (id: string) => {
		try {
			await axiosInstance.delete(`/user/${id}`);
		} catch (err) {
			console.log("Delete user error:", err);
		} finally {
			showSuccess("User deleted successfully.");
		}
	};

	const fetchNonAdminUsers = async () => {
		try {
			const res = await axiosInstance.get("/user/list");
			const nonAdmins = res.data.user.filter(
				(u: User) => u.role !== "ADMIN"
			);
			setNonAdminUsers(nonAdmins);
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
			} else {
				console.error("Error fetching users:", err);
			}
		}
	};

	useEffect(() => {
		refetchUser();
		fetchNonAdminUsers();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				logout,
				refetchUser,
				deleteUser,
				nonAdminUsers,
				fetchNonAdminUsers,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
