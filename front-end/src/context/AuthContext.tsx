"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import { AxiosError } from "axios";

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
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
		} catch (err) {
			console.log("Logout error:", err);
		} finally {
			setUser(null);
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
