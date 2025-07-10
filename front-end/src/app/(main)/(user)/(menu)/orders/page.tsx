"use client";
import React, { useEffect, useState } from "react";
import {
	Package,
	ChevronRight,
	Search,
	Filter,
	Calendar,
	Eye,
	MoreVertical,
	Truck,
	CheckCircle,
	Clock,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import { useOrder } from "@/hooks/useOrder";
import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";

const OrdersPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortBy, setSortBy] = useState("newest");
	const { fetchUserOrders } = useOrder();
	const [order, setOrder] = useState<Order[]>([]);

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

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800 border-green-200";
			case "Shipped":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "Processing":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "Pending":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "Cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Delivered":
				return <CheckCircle className="w-4 h-4" />;
			case "Shipped":
				return <Truck className="w-4 h-4" />;
			case "Processing":
				return <Clock className="w-4 h-4" />;
			case "Pending":
				return <Clock className="w-4 h-4" />;
			case "Cancelled":
				return <XCircle className="w-4 h-4" />;
			default:
				return <Package className="w-4 h-4" />;
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
						Pesanan Saya
					</h1>
					<p className="text-gray-600">
						Kelola dan lacak semua pesanan Anda
					</p>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Cari pesanan atau produk..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Status Filter */}
						<div className="relative">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<select
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(e.target.value)
								}
							>
								<option value="all">Semua Status</option>
								<option value="Pending">Menunggu</option>
								<option value="Processing">Diproses</option>
								<option value="Shipped">Dikirim</option>
								<option value="Delivered">Selesai</option>
								<option value="Cancelled">Dibatalkan</option>
							</select>
						</div>

						{/* Sort */}
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<select
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
							>
								<option value="newest">Terbaru</option>
								<option value="oldest">Terlama</option>
								<option value="highest">Nilai Tertinggi</option>
								<option value="lowest">Nilai Terendah</option>
							</select>
						</div>
					</div>
				</div>

				{/* Orders List */}
				<div className="space-y-4">
					{filteredOrders.length === 0 ? (
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
							<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Tidak ada pesanan ditemukan
							</h3>
							<p className="text-gray-600">
								Coba ubah filter atau kata kunci pencarian Anda
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
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="text-lg font-semibold text-gray-900">
													{order.id}
												</h3>
												<span
													className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
														order.status
													)}`}
												>
													{getStatusIcon(
														order.status
													)}
													{order.status ===
														"Delivered" &&
														"Selesai"}
													{order.status ===
														"Shipped" && "Dikirim"}
													{order.status ===
														"Processing" &&
														"Diproses"}
													{order.status ===
														"Pending" && "Menunggu"}
													{order.status ===
														"Cancelled" &&
														"Dibatalkan"}
												</span>
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span>
													{formatDate(
														order.createdAt
													)}
												</span>
												<span>•</span>
												<span>
													{order.orderItems.length}{" "}
													item
												</span>
												<span>•</span>
												<span className="font-semibold text-gray-900">
													{formatCurrency(
														order.total
													)}
												</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
												<Eye className="w-5 h-5" />
											</button>
											<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
												<MoreVertical className="w-5 h-5" />
											</button>
										</div>
									</div>

									{/* Order Items */}
									<div className="space-y-3 mb-4">
										{order.orderItems.map((item) => (
											<div
												key={item.id}
												className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
											>
												<Image
													alt={item.product.name}
													src={`http://localhost:5000${item.product.image}`}
													width={48}
													height={48}
													className="w-12 h-12 object-cover rounded-lg"
												/>
												<div className="flex-1">
													<h4 className="font-medium text-gray-900">
														{item.product.name}
													</h4>
													<p className="text-sm text-gray-600">
														Qty: {item.quantity}
													</p>
												</div>
												<div className="text-right">
													<p className="font-semibold text-gray-900">
														{formatCurrency(
															item.price
														)}
													</p>
												</div>
											</div>
										))}
									</div>

									{/* Shipping Info */}
									<div className="flex items-center justify-between pt-4 border-t border-gray-200">
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Truck className="w-4 h-4" />
											<span>
												Dikirim ke: {order.user.name}
											</span>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											{order.status === "delivered" && (
												<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
													Beli Lagi
												</button>
											)}
											{order.status === "shipped" && (
												<button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
													Konfirmasi Terima
												</button>
											)}
											{order.status === "pending" && (
												<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
													Batalkan
												</button>
											)}
										</div>
										<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium">
											Lihat Detail
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{/* Pagination */}
				{filteredOrders.length > 0 && (
					<div className="mt-8 flex items-center justify-center">
						<div className="flex items-center gap-2">
							<button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								Sebelumnya
							</button>
							<span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
								1
							</span>
							<span className="px-4 py-2 text-gray-600">2</span>
							<span className="px-4 py-2 text-gray-600">3</span>
							<button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								Selanjutnya
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrdersPage;
