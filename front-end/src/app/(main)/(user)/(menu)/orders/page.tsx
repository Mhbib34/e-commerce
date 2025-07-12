"use client";
import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { Order } from "@/type/orderType";
import { showSuccess } from "@/lib/tasterHelper";
import Filters from "./components/Filters";
import OrdersHeader from "./components/OrdersHeader";
import OrdersItems from "./components/OrdersItems";
import ShippingInfo from "./components/ShippingInfo";
import OrderDetailModal from "./components/OrderDetailModal";

const OrdersPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const { fetchUserOrders, updateStatus } = useOrder();
	const [order, setOrder] = useState<Order[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const orders = await fetchUserOrders();
				setOrder(orders);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrders();
		// eslint-disable-next-line
	}, []);

	const handleOpenModal = (orderId: string) => {
		const order = filteredOrders.find((order) => order.id === orderId);
		setSelectedOrder(order ?? null);
		setIsOpen(true);
	};

	const handleUpdateStatus = async (orderId: string, newStatus: string) => {
		try {
			await updateStatus(orderId, newStatus);
			showSuccess("Status updated successfully.");
			const updatedOrders = await fetchUserOrders();
			setOrder(updatedOrders);
		} catch (error) {
			console.log(error);
		}
	};

	const filteredOrders = order.filter((order) => {
		const matchesSearch =
			order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.orderItems.some((item) =>
				item.product.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);
		const matchesStatus =
			statusFilter === "all" || order.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						My Orders
					</h1>
					<p className="text-gray-600">
						Manage and track your orders here
					</p>
				</div>

				{/* Filters */}
				<Filters
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
				{/* Orders List */}
				<div className="space-y-4">
					{filteredOrders.length === 0 ? (
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
							<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								No orders found
							</h3>
							<p className="text-gray-600">
								You don&apos;t have any orders yet
							</p>
						</div>
					) : (
						filteredOrders.map((order) => (
							<div
								key={order.id}
								className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
							>
								<div className="p-6">
									{/* Order Header */}
									<OrdersHeader
										order={order}
										handleOpenModal={handleOpenModal}
									/>

									{/* Order Items */}
									<OrdersItems order={order} />

									{/* Shipping Info */}
									<ShippingInfo
										order={order}
										handleUpdateStatus={handleUpdateStatus}
									/>
								</div>
							</div>
						))
					)}
				</div>
			</div>
			{isOpen && (
				<OrderDetailModal
					order={selectedOrder as Order}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};

export default OrdersPage;
