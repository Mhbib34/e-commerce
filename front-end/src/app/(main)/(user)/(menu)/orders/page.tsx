"use client";
import React, { useState } from "react";
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

interface Order {
	id: string;
	orderNumber: string;
	date: string;
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	total: number;
	items: {
		id: string;
		name: string;
		image: string;
		quantity: number;
		price: number;
	}[];
	shippingAddress: string;
	trackingNumber?: string;
}

const OrdersPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortBy, setSortBy] = useState("newest");

	// Sample data
	const orders: Order[] = [
		{
			id: "1",
			orderNumber: "ORD-2024-001",
			date: "2024-07-08",
			status: "delivered",
			total: 1250000,
			items: [
				{
					id: "1",
					name: "iPhone 15 Pro Max",
					image: "/api/placeholder/60/60",
					quantity: 1,
					price: 1250000,
				},
			],
			shippingAddress: "Jl. Sudirman No. 123, Jakarta",
			trackingNumber: "JNE123456789",
		},
		{
			id: "2",
			orderNumber: "ORD-2024-002",
			date: "2024-07-05",
			status: "shipped",
			total: 750000,
			items: [
				{
					id: "2",
					name: "MacBook Air M2",
					image: "/api/placeholder/60/60",
					quantity: 1,
					price: 750000,
				},
			],
			shippingAddress: "Jl. Gatot Subroto No. 456, Bandung",
			trackingNumber: "SICEPAT987654321",
		},
		{
			id: "3",
			orderNumber: "ORD-2024-003",
			date: "2024-07-03",
			status: "processing",
			total: 2500000,
			items: [
				{
					id: "3",
					name: "Dell XPS 13",
					image: "/api/placeholder/60/60",
					quantity: 1,
					price: 1500000,
				},
				{
					id: "4",
					name: "Sony WH-1000XM4",
					image: "/api/placeholder/60/60",
					quantity: 1,
					price: 1000000,
				},
			],
			shippingAddress: "Jl. Diponegoro No. 789, Surabaya",
		},
		{
			id: "4",
			orderNumber: "ORD-2024-004",
			date: "2024-07-01",
			status: "cancelled",
			total: 500000,
			items: [
				{
					id: "5",
					name: 'iPad Pro 11"',
					image: "/api/placeholder/60/60",
					quantity: 1,
					price: 500000,
				},
			],
			shippingAddress: "Jl. Thamrin No. 321, Jakarta",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "delivered":
				return "bg-green-100 text-green-800 border-green-200";
			case "shipped":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "processing":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "pending":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "cancelled":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "delivered":
				return <CheckCircle className="w-4 h-4" />;
			case "shipped":
				return <Truck className="w-4 h-4" />;
			case "processing":
				return <Clock className="w-4 h-4" />;
			case "pending":
				return <Clock className="w-4 h-4" />;
			case "cancelled":
				return <XCircle className="w-4 h-4" />;
			default:
				return <Package className="w-4 h-4" />;
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			order.orderNumber
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			order.items.some((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
								<option value="pending">Menunggu</option>
								<option value="processing">Diproses</option>
								<option value="shipped">Dikirim</option>
								<option value="delivered">Selesai</option>
								<option value="cancelled">Dibatalkan</option>
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
													{order.orderNumber}
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
														"delivered" &&
														"Selesai"}
													{order.status ===
														"shipped" && "Dikirim"}
													{order.status ===
														"processing" &&
														"Diproses"}
													{order.status ===
														"pending" && "Menunggu"}
													{order.status ===
														"cancelled" &&
														"Dibatalkan"}
												</span>
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span>
													{formatDate(order.date)}
												</span>
												<span>•</span>
												<span>
													{order.items.length} item
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
										{order.items.map((item) => (
											<div
												key={item.id}
												className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
											>
												<img
													src={item.image}
													alt={item.name}
													className="w-12 h-12 object-cover rounded-lg"
												/>
												<div className="flex-1">
													<h4 className="font-medium text-gray-900">
														{item.name}
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
												Dikirim ke:{" "}
												{order.shippingAddress}
											</span>
										</div>
										{order.trackingNumber && (
											<div className="flex items-center gap-2">
												<span className="text-sm text-gray-600">
													Resi: {order.trackingNumber}
												</span>
												<button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
													Lacak Paket
												</button>
											</div>
										)}
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
