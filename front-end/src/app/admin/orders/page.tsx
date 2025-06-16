"use client";

import ProductDisplayPagination from "@/components/template/Product/ProductDisplayPagination";
import { useOrder } from "@/hooks/useOrder";
import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";
import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaEye, FaSync } from "react-icons/fa";
import { toast } from "sonner";
import OrderModal from "@/components/template/order/OrderModal";

const OrdersAdminPage = () => {
	const { orderPage, loading, total, fetchOrders, allOrder } = useOrder({
		page: 1,
		limit: 5,
	});
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState<Order[] | null>(null);
	const [searching, setSearching] = useState(false);
	const [page, setPage] = useState(1);
	const [filterStatus, setFilterStatus] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const itemsPerPage = 10;

	useEffect(() => {
		if (fetchOrders && !searchResult) {
			fetchOrders(page, itemsPerPage);
		}
	}, [page, fetchOrders, searchResult]);

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewOrder = (orderId: string) => {
		const order = displayedProducts.find((order) => order.id === orderId);
		if (order) {
			setSelectedOrder(order);
			setIsModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	const handleSearch = async () => {
		const keyword = search.toLowerCase().trim();

		// Jika search kosong dan filter all, kembali ke default
		if (!keyword && filterStatus === "") {
			setSearchResult(null);
			setSearching(false);
			return;
		}

		setSearching(true);

		try {
			// Use allOrder from hook if available, otherwise fetch
			let ordersToSearch = allOrder;

			if (!ordersToSearch || ordersToSearch.length === 0) {
				const res = await axiosInstance.get("/order/list");
				ordersToSearch = res.data.order;
			}

			const result = ordersToSearch.filter((order) => {
				const matchesKeyword =
					!keyword ||
					order.user.name.toLowerCase().includes(keyword) ||
					order.id.toLowerCase().includes(keyword);

				const matchesStatus =
					!filterStatus || order.status === filterStatus;

				return matchesKeyword && matchesStatus;
			});

			setSearchResult(result);
			setPage(1);
		} catch (err) {
			console.error("Search failed:", err);
			toast.error("Failed to search orders");
		} finally {
			setSearching(false);
		}
	};

	const handleSearchInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearch(e.target.value);
	};

	const handleFilter = (status: string) => {
		setFilterStatus(status);
		// Auto trigger search when filter changes
		setTimeout(() => {
			handleSearch();
		}, 100);
	};

	const handleUpdateStatus = async (orderId: string, newStatus: string) => {
		try {
			await axiosInstance.patch(`/order/${orderId}`, {
				status: newStatus,
			});

			toast.success("Order status updated successfully");

			// Refresh data
			if (searchResult) {
				// Update search result
				setSearchResult((prev) =>
					prev
						? prev.map((order) =>
								order.id === orderId
									? { ...order, status: newStatus }
									: order
						  )
						: null
				);
			} else {
				// Refresh main data
				if (fetchOrders) {
					fetchOrders(page, itemsPerPage);
				}
			}
		} catch (err) {
			console.error("Failed to update status:", err);
			toast.error("Failed to update order status");
		}
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			// Clear search results
			setSearchResult(null);
			setSearch("");
			setFilterStatus("");
			setSearching(false);

			// Refresh main data
			if (fetchOrders) {
				await fetchOrders(page, itemsPerPage);
			}

			toast.success("Orders refreshed successfully");
		} catch (err) {
			console.error("Failed to refresh:", err);
			toast.error("Failed to refresh orders");
		} finally {
			setRefreshing(false);
		}
	};

	const isSearching = searching || searchResult !== null;
	const displayedProducts = searchResult ?? orderPage;
	const totalPages = isSearching
		? Math.ceil(displayedProducts.length / itemsPerPage)
		: Math.ceil(total / itemsPerPage);

	// Paginate for search results
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedProducts = isSearching
		? displayedProducts.slice(startIndex, endIndex)
		: displayedProducts;

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Orders Management
				</h1>
				<button
					onClick={handleRefresh}
					disabled={refreshing}
					className="inline-flex items-center gap-2 border-2 bg-black cursor-pointer hover:bg-white hover:text-black text-white px-4 py-1 rounded-lg font-medium transition-colors shadow-sm"
				>
					<FaSync className={refreshing ? "animate-spin" : ""} />
					{refreshing ? "Refreshing..." : "Refresh"}
				</button>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="relative flex justify-between items-center w-full px-4 gap-2 py-1 border rounded-md">
					<div className="flex items-center  gap-2 w-full">
						<FaSearch className=" text-gray-400" />
						<input
							type="text"
							placeholder="Search orders by user name"
							value={search}
							onChange={handleSearchInputChange}
							onKeyPress={(e) =>
								e.key === "Enter" && handleSearch()
							}
							className="focus:outline-none md:w-full w-[90%]"
						/>
					</div>
					<button
						onClick={handleSearch}
						disabled={searching}
						className="inline-flex items-center gap-2 border-2 bg-black cursor-pointer hover:bg-white hover:text-black text-white px-4 py-1 rounded-lg font-medium transition-colors shadow-sm"
					>
						{searching ? "Searching..." : "Search"}
					</button>
				</div>

				<div className="flex items-center gap-2 ">
					<FaFilter className="text-gray-600" />
					<select
						value={filterStatus}
						onChange={(e) => handleFilter(e.target.value)}
						className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
					>
						<option value="">All Status</option>
						<option value="Pending">Pending</option>
						<option value="Shipped">Shipped</option>
						<option value="Delivered">Delivered</option>
						<option value="Cancelled">Cancelled</option>
					</select>
				</div>
			</div>

			{/* Search Results Info */}
			{isSearching && (
				<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
					<p className="text-blue-800">
						Showing {displayedProducts.length} search results
						{search && ` for "${search}"`}
						{filterStatus && ` with status "${filterStatus}"`}
					</p>
				</div>
			)}

			{/* Orders Table */}
			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
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
						{loading ? (
							<tr>
								<td
									colSpan={7}
									className="px-6 py-4 text-center"
								>
									<div className="flex items-center justify-center">
										<FaSync className="animate-spin mr-2" />
										Loading...
									</div>
								</td>
							</tr>
						) : paginatedProducts.length === 0 ? (
							<tr>
								<td
									colSpan={7}
									className="px-6 py-4 text-center text-gray-500"
								>
									{isSearching
										? "No orders found matching your search criteria"
										: "No orders found"}
								</td>
							</tr>
						) : (
							paginatedProducts.map((order) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										#
										{order.id.length > 10
											? order.id.slice(0, 10) + "..."
											: order.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{order.user.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(order.createdAt)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{order.orderItems.length} item(s)
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{formatCurrency(order.total)}
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
											className={`border rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
												order.status === "Pending"
													? "bg-yellow-100 text-yellow-800 border-yellow-300"
													: order.status === "Shipped"
													? "bg-blue-100 text-blue-800 border-blue-300"
													: order.status ===
													  "Delivered"
													? "bg-green-100 text-green-800 border-green-300"
													: "bg-red-100 text-red-800 border-red-300"
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
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<button
											onClick={() =>
												handleViewOrder(order.id)
											}
											className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
											title="View order details"
										>
											<FaEye className="w-4 h-4" />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{paginatedProducts.length > 0 && (
				<ProductDisplayPagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
					itemsPerPage={itemsPerPage}
					totalItems={isSearching ? displayedProducts.length : total}
					displayedProducts={paginatedProducts}
				/>
			)}

			{/* Modal */}
			<OrderModal
				isModalOpen={isModalOpen}
				selectedOrder={selectedOrder}
				handleCloseModal={handleCloseModal}
			/>
		</div>
	);
};

export default OrdersAdminPage;
