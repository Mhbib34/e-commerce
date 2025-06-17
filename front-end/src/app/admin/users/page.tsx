"use client";

import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";
import { showConfirm } from "@/lib/tasterHelper";
import { User } from "@/type/userType";
import { useState } from "react";
import {
	FaSearch,
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

	const { nonAdminUsers, isLoading, deleteUser, fetchNonAdminUsers } =
		useAuth();

	const handleDelete = async (id: string) => {
		await deleteUser(id);
		await fetchNonAdminUsers();
		handleSearch();
	};

	const handleFilterStatus = (status: string) => {
		setFilterStatus(status);
	};

	const handleSearch = async () => {
		const keyword = search.toLowerCase().trim();

		if (!keyword && filterStatus === "") {
			setSearchResult(null);
			setSearching(false);
			return;
		}

		setSearching(true);

		try {
			let userToSearch = nonAdminUsers;

			if (!userToSearch || userToSearch.length === 0) {
				const res = await axiosInstance.get("/user/list");
				userToSearch = res.data.user;
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
		} catch (err) {
			console.error("Search failed:", err);
		} finally {
			setSearching(false);
		}
	};

	const displayedUsers = searchResult ?? nonAdminUsers;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Customer Management
				</h1>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="flex items-center justify-between w-full border-2 border-black px-2 py-1 rounded-md">
					<div className="w-full flex items-center gap-2">
						<FaSearch className=" text-black" />
						<input
							type="search"
							placeholder="Search customers..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full focus:outline-none"
						/>
					</div>
					<Button
						onClick={handleSearch}
						className="bg-black px-2 py-1 text-white hover:bg-white transition-all duration-200 ease-in hover:text-black border-2 rounded-md cursor-pointer"
					>
						Search
					</Button>
				</div>
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
			</div>

			<div className="bg-white shadow-md rounded-lg overflow-hidden">
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
						) : displayedUsers.length === 0 ? (
							<tr>
								<td colSpan={6} className="text-center py-4">
									No customers found
								</td>
							</tr>
						) : (
							displayedUsers.map((customer) => (
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
										{/* {customer.totalSpent?.toFixed(2)} */}
										-
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<Button
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
		</div>
	);
};

export default UserAdminPage;
