import { Order } from "@/stores/OrderStores";
import React from "react";

type OrderDisplayAdminProps = {
	mockRecentOrders: Order[];
	loading?: boolean;
	onPageChange?: (page: number) => void;
	currentPage?: number;
	totalPages?: number;
	onViewAll?: () => void;
};

const OrderDisplayAdmin: React.FC<OrderDisplayAdminProps> = ({
	mockRecentOrders,
	loading = false,
	onPageChange,
	currentPage = 1,
	totalPages = 1,
	onViewAll,
}) => {
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "create":
			case "completed":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "processing":
				return "bg-blue-100 text-blue-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			case "shipped":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const formatDate = (dateString: string) => {
		try {
			return new Date(dateString).toLocaleString("id-ID", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		} catch (error) {
			console.error("Error parsing date:", error);
			return "Invalid Date";
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	// Loading skeleton component
	const LoadingSkeleton = () => (
		<tbody className="bg-white divide-y divide-gray-200">
			{[...Array(5)].map((_, index) => (
				<tr key={index} className="animate-pulse">
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="h-4 bg-gray-200 rounded w-24"></div>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="h-4 bg-gray-200 rounded w-20"></div>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="h-6 bg-gray-200 rounded-full w-16"></div>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="h-4 bg-gray-200 rounded w-8"></div>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<div className="h-4 bg-gray-200 rounded w-32"></div>
					</td>
				</tr>
			))}
		</tbody>
	);

	// Empty state component
	const EmptyState = () => (
		<tbody>
			<tr>
				<td colSpan={5} className="px-6 py-12 text-center">
					<div className="flex flex-col items-center justify-center">
						<div className="text-6xl mb-4">📋</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No orders found
						</h3>
						<p className="text-gray-500">
							Orders will appear here once customers start placing
							them.
						</p>
					</div>
				</td>
			</tr>
		</tbody>
	);

	// Pagination component
	const Pagination = () => {
		if (totalPages <= 1) return null;

		return (
			<div className="px-6 py-3 bg-red-500 border-t border-gray-200 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<span className="text-sm text-gray-700">
						Page {currentPage} of {totalPages}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={() => onPageChange?.(currentPage - 1)}
						disabled={currentPage <= 1 || loading}
						className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Previous
					</button>
					<button
						onClick={() => onPageChange?.(currentPage + 1)}
						disabled={currentPage >= totalPages || loading}
						className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
			<div className="p-6 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900">
						Recent Orders
					</h3>
					<button
						onClick={onViewAll}
						className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
					>
						View all
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Customer
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Amount
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Items
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Date
							</th>
						</tr>
					</thead>

					{loading ? (
						<LoadingSkeleton />
					) : mockRecentOrders && mockRecentOrders.length > 0 ? (
						<tbody className="bg-white divide-y divide-gray-200">
							{mockRecentOrders.map((order) => (
								<tr
									key={order.id}
									className="hover:bg-gray-50 transition-colors"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-8 w-8">
												<div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
													<span className="text-xs font-medium text-gray-600">
														{order.user?.name
															?.charAt(0)
															?.toUpperCase() ||
															"?"}
													</span>
												</div>
											</div>
											<div className="ml-3">
												<div className="text-sm font-medium text-gray-900">
													{order.user?.name ||
														"Unknown Customer"}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-semibold text-gray-900">
											{formatCurrency(order.total)}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
												order.status
											)}`}
										>
											{order.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{order.orderItems?.length || 0}
											<span className="text-xs text-gray-500 ml-1">
												{order.orderItems?.length === 1
													? "item"
													: "items"}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(order.createdAt)}
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<EmptyState />
					)}
				</table>
			</div>

			{/* Pagination */}
			<Pagination />
		</div>
	);
};

export default OrderDisplayAdmin;
