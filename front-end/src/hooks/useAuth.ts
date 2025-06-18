import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";

// Type definitions
interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	// tambahkan property lain sesuai kebutuhan
}

interface PaginationParams {
	page?: number;
	limit?: number;
}

interface PaginationResponse {
	users: User[];
	totalPages: number;
	currentPage: number;
	totalUsers: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export const useAuth = ({ page = 1, limit = 10 }: PaginationParams = {}) => {
	const context = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<PaginationResponse>({
		users: [],
		totalPages: 0,
		currentPage: page,
		totalUsers: 0,
		hasNextPage: false,
		hasPrevPage: false,
	});

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const fetchUserPage = async (
		currentPage: number = page,
		currentLimit: number = limit
	) => {
		setLoading(true);
		setError(null);

		try {
			const res = await axiosInstance.get("/user/page", {
				params: {
					page: currentPage,
					limit: currentLimit,
				},
			});

			const { data, totalPages } = res.data.user;
			console.log(res.data.user);

			const paginationData: PaginationResponse = {
				users: data,
				totalPages,
				currentPage: currentPage,
				totalUsers: data.length,
				hasNextPage: currentPage < totalPages,
				hasPrevPage: currentPage > 1,
			};

			setPagination(paginationData);
			context.setNonAdminUsers(data);
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				setError("Unauthorized access");
			} else {
				const errorMessage =
					error.response?.data?.errors || "Error fetching users";
				setError(errorMessage);
				console.error("Error fetching users:", err);
			}
		} finally {
			setLoading(false);
		}
	};

	// Pagination control functions
	const goToPage = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
			fetchUserPage(pageNumber, limit);
		}
	};

	const nextPage = () => {
		if (pagination.hasNextPage) {
			goToPage(pagination.currentPage + 1);
		}
	};

	const prevPage = () => {
		if (pagination.hasPrevPage) {
			goToPage(pagination.currentPage - 1);
		}
	};

	const changeLimit = (newLimit: number) => {
		fetchUserPage(1, newLimit); // Reset to first page when changing limit
	};

	useEffect(() => {
		fetchUserPage(page, limit);
		// eslint-disable-next-line
	}, []);

	return {
		...context,
		// Pagination data
		users: pagination.users,
		totalPages: pagination.totalPages,
		currentPage: pagination.currentPage,
		totalUsers: pagination.totalUsers,
		hasNextPage: pagination.hasNextPage,
		hasPrevPage: pagination.hasPrevPage,

		// Pagination controls
		goToPage,
		nextPage,
		prevPage,
		changeLimit,

		// Loading and error states
		loading,
		error,

		// Refresh function
		refresh: () => fetchUserPage(pagination.currentPage, limit),
	};
};
