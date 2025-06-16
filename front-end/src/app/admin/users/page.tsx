"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// Mock API function (replace with your actual API)
const fetchCustomers = async (page = 1, search = "", filter = {}) => {
	// Simulating API call
	return {
		data: [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				phone: "+1234567890",
				orders: 5,
				totalSpent: 1250.5,
				status: "Active",
			},
			{
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				phone: "+1234567891",
				orders: 3,
				totalSpent: 899.99,
				status: "Inactive",
			},
			// Add more mock data as needed
		],
		total: 100,
		page,
		limit: 10,
	};
};

const UserAdminPage = () => {
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);

	useEffect(() => {
		loadCustomers();
	}, [currentPage, searchQuery, filterStatus]);

	const loadCustomers = async () => {
		setIsLoading(true);
		try {
			const response = await fetchCustomers(currentPage, searchQuery, {
				status: filterStatus,
			});
			setCustomers(response.data);
			setTotalPages(Math.ceil(response.total / response.limit));
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
		setIsLoading(false);
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleFilter = (status) => {
		setFilterStatus(status);
		setCurrentPage(1);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this customer?")) {
			// Implement delete API call here
			setCustomers(customers.filter((customer) => customer.id !== id));
		}
	};

	const handleAddCustomer = (e) => {
		e.preventDefault();
		// Implement add customer API call here
		setShowAddModal(false);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Customer Management
				</h1>
				<button
					onClick={() => setShowAddModal(true)}
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
				>
					<FaPlus className="mr-2" /> Add Customer
				</button>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="relative flex-1">
					<input
						type="text"
						placeholder="Search customers..."
						value={searchQuery}
						onChange={handleSearch}
						className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>
				<div className="flex items-center gap-2">
					<FaFilter className="text-gray-600" />
					<select
						value={filterStatus}
						onChange={(e) => handleFilter(e.target.value)}
						className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">All Status</option>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</select>
				</div>
			</div>

			{/* Customer Table */}
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
								Phone
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Orders
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Total Spent
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{isLoading ? (
							<tr>
								<td
									colSpan="7"
									className="px-6 py-4 text-center"
								>
									Loading...
								</td>
							</tr>
						) : customers.length === 0 ? (
							<tr>
								<td
									colSpan="7"
									className="px-6 py-4 text-center"
								>
									No customers found
								</td>
							</tr>
						) : (
							customers.map((customer) => (
								<tr key={customer.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.phone}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{customer.orders}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										${customer.totalSpent.toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												customer.status === "Active"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{customer.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button className="text-blue-600 hover:text-blue-800 mr-4">
											<FaEdit />
										</button>
										<button
											onClick={() =>
												handleDelete(customer.id)
											}
											className="text-red-600 hover:text-red-800"
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="mt-6 flex justify-between items-center">
				<div>
					Showing {(currentPage - 1) * 10 + 1} to{" "}
					{Math.min(currentPage * 10, totalPages * 10)} of{" "}
					{totalPages * 10} customers
				</div>
				<div className="flex gap-2">
					<button
						onClick={() =>
							setCurrentPage((prev) => Math.max(prev - 1, 1))
						}
						disabled={currentPage === 1}
						className="px-4 py-2 border rounded-md disabled:opacity-50"
					>
						Previous
					</button>
					<button
						onClick={() =>
							setCurrentPage((prev) =>
								Math.min(prev + 1, totalPages)
							)
						}
						disabled={currentPage === totalPages}
						className="px-4 py-2 border rounded-md disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</div>

			{/* Add Customer Modal */}
			{showAddModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg max-w-md w-full">
						<h2 className="text-xl font-bold mb-4">
							Add New Customer
						</h2>
						<form onSubmit={handleAddCustomer}>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Name
								</label>
								<input
									type="text"
									required
									className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									type="email"
									required
									className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Phone
								</label>
								<input
									type="tel"
									className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="flex justify-end gap-2">
								<button
									type="button"
									onClick={() => setShowAddModal(false)}
									className="px-4 py-2 border rounded-md"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
								>
									Add Customer
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserAdminPage;
