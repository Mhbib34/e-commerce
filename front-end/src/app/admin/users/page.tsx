"use client";

import Button from "@/components/common/Button";
import SearchForm from "@/components/fragment/SearchForm";
import CustomerModal from "@/components/template/customer/CustomerModal";
import ProductDisplayPagination from "@/components/template/Product/ProductDisplayPagination";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import axiosInstance from "@/lib/axiosInstance";
import { showConfirm } from "@/lib/tasterHelper";
import { User } from "@/type/userType";
import { formatCurrency } from "@/utils/format";
import { useState, useEffect } from "react";
import {
	FaFilter,
	FaTrash,
	FaTimesCircle,
	FaCheckCircle,
	FaEye,
} from "react-icons/fa";

const UserAdminPage = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState<User[] | null>(null);
	const [searching, setSearching] = useState(false);
	const [filterStatus, setFilterStatus] = useState("");
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;
	const [selectedUserTotalSpent, setSelectedUserTotalSpent] =
		useState<number>(0);

	const {
		nonAdminUsers,
		isLoading,
		deleteUser,
		refresh,
		totalPages: authTotalPages,
		currentPage: authCurrentPage,
		totalUsers: authTotalUsers,
		goToPage,
	} = useAuth();

	const { fetchOrderByUserId } = useOrder();

	const getUserTotalSpent = async (userId: string) => {
		try {
			const orders = await fetchOrderByUserId(userId);
			return orders.reduce((total, order) => total + order.total, 0);
			//eslint-disable-next-line
		} catch (err: any) {
			if (
				err.response?.status === 400 &&
				err.response?.data?.message === "your order is empty"
			) {
				return 0;
			}
			console.error("Error fetching order for user:", userId, err);
			return 0;
		}
	};

	const [userTotalSpent, setUserTotalSpent] = useState<{
		[userId: string]: number;
	}>({}); // [ADDED]
	// [ADDED]

	const handleDelete = async (id: string) => {
		await deleteUser(id);
		await refresh();
		if (searchResult !== null) {
			handleSearch();
		}
	};

	const handleFilterStatus = (status: string) => {
		setFilterStatus(status);
		setPage(1);
	};

	const handleSearch = async () => {
		const keyword = search.toLowerCase().trim();
		if (!keyword && filterStatus === "") {
			setSearchResult(null);
			setSearching(false);
			setPage(1);
			return;
		}
		setSearching(true);

		try {
			let userToSearch = nonAdminUsers;
			if (!userToSearch || userToSearch.length === 0) {
				const res = await axiosInstance.get("/user/list");
				userToSearch = res.data.user.filter(
					(u: User) => u.role !== "ADMIN"
				);
			}

			const result = userToSearch.filter((user) => {
				const matchesKeyword =
					!keyword ||
					user.name.toLowerCase().includes(keyword) ||
					user.email.toLowerCase().includes(keyword) ||
					user.username.toLowerCase().includes(keyword);

				const matchesStatus =
					!filterStatus ||
					(filterStatus === "true" && user.isAccountVerified) ||
					(filterStatus === "false" && !user.isAccountVerified);

				return matchesKeyword && matchesStatus;
			});

			setSearchResult(result);
			setPage(1);
		} catch (err) {
			console.error("Search failed:", err);
		} finally {
			setSearching(false);
		}
	};

	useEffect(() => {
		if (search === "" && filterStatus === "") {
			setSearchResult(null);
		}
	}, [search, filterStatus]);

	const isSearchMode = searchResult !== null;
	const displayedUsers = isSearchMode ? searchResult : nonAdminUsers;
	const searchTotalPages = isSearchMode
		? Math.ceil(displayedUsers.length / itemsPerPage)
		: 0;
	const searchStartIndex = (page - 1) * itemsPerPage;
	const searchEndIndex = searchStartIndex + itemsPerPage;
	const paginatedSearchUsers = isSearchMode
		? displayedUsers.slice(searchStartIndex, searchEndIndex)
		: [];

	const finalDisplayedUsers = isSearchMode
		? paginatedSearchUsers
		: displayedUsers;
	const currentPage = isSearchMode ? page : authCurrentPage;
	const totalPages = isSearchMode ? searchTotalPages : authTotalPages;
	const totalItems = isSearchMode ? displayedUsers.length : authTotalUsers;

	const handlePageChange = (newPage: number) => {
		if (isSearchMode) {
			setPage(newPage);
		} else {
			goToPage(newPage);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewUser = async (userId: string) => {
		const user = finalDisplayedUsers.find((user) => user.id === userId);
		if (user) {
			setSelectedUser(user);
			const total = await getUserTotalSpent(user.id);
			setSelectedUserTotalSpent(total);
			setIsModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedUser(null);
	};

	useEffect(() => {
		const fetchTotalSpentForUsers = async () => {
			const newTotals: { [userId: string]: number } = {};
			for (const user of finalDisplayedUsers) {
				if (user && !userTotalSpent[user.id]) {
					const total = await getUserTotalSpent(user.id);
					newTotals[user.id] = total;
				}
			}
			setUserTotalSpent((prev) => ({ ...prev, ...newTotals }));
		};

		if (finalDisplayedUsers.length > 0) {
			fetchTotalSpentForUsers();
		}
		//eslint-disable-next-line
	}, [finalDisplayedUsers]);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Customer Management
				</h1>
			</div>

			<SearchForm
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				searching={searching}
				handleSearch={handleSearch}
				handleKeyPress={handleKeyPress}
			>
				<div className="flex items-center gap-2">
					<FaFilter className="text-gray-600" />
					<select
						value={filterStatus}
						onChange={(e) => handleFilterStatus(e.target.value)}
						className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">All Status</option>
						<option value="true">Verified</option>
						<option value="false">Unverified</option>
					</select>
				</div>
			</SearchForm>
			<div className="mb-4">
				<p className="text-sm text-gray-600">
					{isSearchMode ? (
						<>
							Showing {finalDisplayedUsers.length} of{" "}
							{displayedUsers.length} results
							{search && ` for "${search}"`}
							{filterStatus &&
								` (${
									filterStatus === "true"
										? "Verified"
										: "Unverified"
								} only)`}
						</>
					) : (
						<>
							Showing {finalDisplayedUsers.length} of {totalItems}{" "}
							customers
						</>
					)}
				</p>
			</div>

			<div className="bg-white shadow-md rounded-lg overflow-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Username
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Verified
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Total Spent
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{isLoading || searching ? (
							<tr>
								<td colSpan={6} className="text-center py-4">
									Loading...
								</td>
							</tr>
						) : finalDisplayedUsers.length === 0 ? (
							<tr>
								<td colSpan={6} className="text-center py-4">
									{isSearchMode
										? "No customers found matching your search criteria"
										: "No customers found"}
								</td>
							</tr>
						) : (
							finalDisplayedUsers.map((customer) => (
								<tr key={customer.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.username}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.isAccountVerified ? (
											<FaCheckCircle className="text-green-500" />
										) : (
											<FaTimesCircle className="text-red-500" />
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{userTotalSpent[customer.id] !==
										undefined
											? formatCurrency(
													userTotalSpent[customer.id]
											  )
											: "Loading..."}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<Button
											onClick={() =>
												handleViewUser(customer.id)
											}
											className="text-green-600 hover:text-green-800 mr-4"
											title="View"
										>
											<FaEye />
										</Button>
										<Button
											title="Delete"
											onClick={() =>
												showConfirm(
													"Are you sure you want to delete this customer?",
													customer.name,
													() =>
														handleDelete(
															customer.id
														)
												)
											}
											className="text-red-600 hover:text-red-800"
										>
											<FaTrash />
										</Button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && (
				<ProductDisplayPagination
					displayedProducts={finalDisplayedUsers}
					currentPage={currentPage}
					totalPages={totalPages}
					itemsPerPage={itemsPerPage}
					totalItems={totalItems}
					onPageChange={handlePageChange}
				/>
			)}

			<CustomerModal
				handleCloseModal={handleCloseModal}
				isModalOpen={isModalOpen}
				selectedUser={selectedUser}
				totalSpent={selectedUserTotalSpent}
			/>
		</div>
	);
};

export default UserAdminPage;
