"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { showSuccess } from "@/lib/tasterHelper";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/type/userType";
type AuthContextType = {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	logout: () => void;
	refetchUser: () => Promise<void>;
	deleteUser: (id: string) => Promise<void>;
	nonAdminUsers: User[];
	setNonAdminUsers: (users: User[]) => void;
	updateUser: (data: User) => Promise<void>;
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

	const updateUser = async (data: User) => {
		try {
			await axiosInstance.patch(`/user`, data);
			refetchUser();
		} catch (err) {
			console.log("Update user error:", err);
		} finally {
			showSuccess("User updated successfully.");
		}
	};

	useEffect(() => {
		refetchUser();
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
				setNonAdminUsers,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
