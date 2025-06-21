"use client";

import ProductDisplayPagination from "@/components/template/Product/ProductDisplayPagination";
import { useOrder } from "@/hooks/useOrder";
import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/type/orderType";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSync } from "react-icons/fa";
import { toast } from "sonner";
import OrderModal from "@/components/template/order/OrderModal";
import SearchForm from "@/components/fragment/SearchForm";
import OrderTable from "@/components/template/order/OrderTable";

const OrdersAdminPage = () => {
	const { orderPage, loading, total, fetchOrders, allOrder } = useOrder();
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
		const order = displayedOrder.find((order) => order.id === orderId);
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

		if (!keyword && filterStatus === "") {
			setSearchResult(null);
			setSearching(false);
			return;
		}

		setSearching(true);

		try {
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
			setSearchResult(null);
			setSearch("");
			setFilterStatus("");
			setSearching(false);

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

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const isSearching = searching || searchResult !== null;
	const displayedOrder = searchResult ?? orderPage;
	const totalPages = isSearching
		? Math.ceil(displayedOrder.length / itemsPerPage)
		: Math.ceil(total / itemsPerPage);

	// Paginate for search results
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedOrder = isSearching
		? displayedOrder.slice(startIndex, endIndex)
		: displayedOrder;

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
			{/* search form */}
			<SearchForm
				value={search}
				onChange={handleSearchInputChange}
				searching={searching}
				handleSearch={handleSearch}
				handleKeyPress={handleKeyPress}
			>
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
			</SearchForm>
			{/* Search Results Info */}
			{isSearching && (
				<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
					<p className="text-blue-800">
						Showing {displayedOrder.length} search results
						{search && ` for "${search}"`}
						{filterStatus && ` with status "${filterStatus}"`}
					</p>
				</div>
			)}

			{/* Orders Table */}
			<OrderTable
				loading={loading}
				paginatedOrder={paginatedOrder}
				isSearching={isSearching}
				handleUpdateStatus={handleUpdateStatus}
				handleViewOrder={handleViewOrder}
			/>

			{totalPages > 1 && (
				<ProductDisplayPagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
					itemsPerPage={itemsPerPage}
					totalItems={isSearching ? displayedOrder.length : total}
					displayedProducts={paginatedOrder}
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
