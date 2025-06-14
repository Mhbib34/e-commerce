"use client";

import { FC } from "react";

import QuickActions from "@/components/template/Product/QuickActions";
import OrderDisplayAdmin from "@/components/template/order/OrderDisplayAdmin";
import { useOrder } from "@/hooks/useOrder";
import StatsCardAdmin from "@/components/template/order/StatsCardAdmin";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboardPage: FC = () => {
	const { user } = useAuth();
	const { order } = useOrder();

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			{/* Main content */}
			<main className="flex-1 bg-gray-50 md:p-6 w-full overflow-y-auto scrollbar-none">
				{/* Header */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 hidden md:block">
						Welcome back, {user?.name}
					</h2>
					<p className="text-gray-600 mt-1 hidden md:block">
						Here&apos;s what&apos;s happening with your store today.
					</p>
				</div>

				{/* Stats Grid */}
				<StatsCardAdmin />
				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					{/* Recent Orders */}
					<OrderDisplayAdmin mockRecentOrders={order} />
					{/* Top Products */}
					{/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
						<div className="p-6 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">
								Top Products
							</h3>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								{mockTopProducts.map((product, index) => (
									<div
										key={product.id}
										className="flex items-center justify-between"
									>
										<div className="flex items-center space-x-3">
											<div className="flex-shrink-0">
												<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
													<span className="text-xs font-medium text-gray-600">
														#{index + 1}
													</span>
												</div>
											</div>
											<div className="min-w-0 flex-1">
												<p className="text-sm font-medium text-gray-900 truncate">
													{product.name}
												</p>
												<p className="text-xs text-gray-500">
													{product.sales} sales
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium text-gray-900">
												Rp{" "}
												{product.revenue.toLocaleString(
													"id-ID"
												)}
											</p>
											<p className="text-xs text-gray-500">
												Stock: {product.stock}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div> */}
				</div>

				{/* Quick Actions */}
				<QuickActions />
			</main>
		</div>
	);
};

export default AdminDashboardPage;
