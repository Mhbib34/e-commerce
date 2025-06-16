"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaEye, FaSync } from "react-icons/fa";

// Mock API function (replace with your actual API)
const fetchOrders = async (page = 1, search = "", filter = {}) => {
	// Simulating API call
	return {
		data: [
			{
				id: 1,
				customer: "John Doe",
				date: "2025-06-15",
				total: 299.99,
				status: "Pending",
				items: 3,
			},
			{
				id: 2,
				customer: "Jane Smith",
				date: "2025-06-14",
				total: 149.5,
				status: "Shipped",
				items: 2,
			},
			// Add more mock data as needed
		],
		total: 50,
		page,
		limit: 10,
	};
};

const OrdersAdminPage = () => {
	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		loadOrders();
	}, [currentPage, searchQuery, filterStatus]);

	const loadOrders = async () => {
		setIsLoading(true);
		try {
			const response = await fetchOrders(currentPage, searchQuery, {
				status: filterStatus,
			});
			setOrders(response.data);
			setTotalPages(Math.ceil(response.total / response.limit));
		} catch (error) {
			console.error("Error fetching orders:", error);
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

	const handleUpdateStatus = (id, newStatus) => {
		// Implement status update API call here
		setOrders(
			orders.map((order) =>
				order.id === id ? { ...order, status: newStatus } : order
			)
		);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Orders Management
				</h1>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="relative flex-1">
					<input
						type="text"
						placeholder="Search orders by customer or ID..."
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
						<option value="Pending">Pending</option>
						<option value="Shipped">Shipped</option>
						<option value="Delivered">Delivered</option>
						<option value="Cancelled">Cancelled</option>
					</select>
				</div>
			</div>

			{/* Orders Table */}
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Customer
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Items
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Total
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
						) : orders.length === 0 ? (
							<tr>
								<td
									colSpan="7"
									className="px-6 py-4 text-center"
								>
									No orders found
								</td>
							</tr>
						) : (
							orders.map((order) => (
								<tr key={order.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										#{order.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{order.customer}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{order.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{order.items}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										${order.total.toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<select
											value={order.status}
											onChange={(e) =>
												handleUpdateStatus(
													order.id,
													e.target.value
												)
											}
											className={`border rounded-md px-2 py-1 text-xs ${
												order.status === "Pending"
													? "bg-yellow-100 text-yellow-800"
													: order.status === "Shipped"
													? "bg-blue-100 text-blue-800"
													: order.status ===
													  "Delivered"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											<option value="Pending">
												Pending
											</option>
											<option value="Shipped">
												Shipped
											</option>
											<option value="Delivered">
												Delivered
											</option>
											<option value="Cancelled">
												Cancelled
											</option>
										</select>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button className="text-blue-600 hover:text-blue-800">
											<FaEye />
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
					{totalPages * 10} orders
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
		</div>
	);
};

export default OrdersAdminPage;
