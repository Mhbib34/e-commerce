"use client";

import { FC, useState, useCallback, useEffect } from "react";

import QuickActions from "@/components/template/Admin/Product/QuickActions";
import OrderDisplayAdmin from "@/components/template/Admin/order/OrderDisplayAdmin";
import { useOrder } from "@/hooks/useOrder";
import StatsCardAdmin from "@/components/template/Admin/order/StatsCardAdmin";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import TopProducts from "@/components/template/Admin/Product/TopProducts";

const AdminDashboardPage: FC = () => {
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;
	const { user } = useAuth();
	const { orderPage, loading, error, refetch } = useOrder({
		page,
		limit: itemsPerPage,
	});
	const [topProducts, setTopProducts] = useState<Product[]>([]);

	const { getTopProducts } = useProducts();

	useEffect(() => {
		const fetchTopProducts = async () => {
			try {
				const topProducts = await getTopProducts();
				setTopProducts(topProducts);
			} catch (err) {
				console.error(err);
			}
		};
		fetchTopProducts();
		//eslint-disable-next-line
	}, []);

	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	// Handle error state
	if (error) {
		return (
			<div className="flex h-screen overflow-hidden bg-gray-50">
				<main className="flex-1 bg-gray-50 md:p-6 w-full overflow-y-auto scrollbar-none">
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<div className="text-red-500 text-xl mb-4">
								⚠️ Error
							</div>
							<p className="text-gray-600 mb-4">{error}</p>
							<button
								onClick={refetch}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
							>
								Try Again
							</button>
						</div>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			{/* Main content */}
			<main className="flex-1 bg-gray-50 md:p-6 w-full overflow-y-auto scrollbar-none">
				{/* Header */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 hidden md:block">
						Welcome back, {user?.name || "Admin"}
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
					<OrderDisplayAdmin
						mockRecentOrders={orderPage}
						loading={loading}
						onPageChange={handlePageChange}
						currentPage={page}
					/>

					{/* Top Products*/}
					<TopProducts topProducts={topProducts} />
				</div>

				{/* Quick Actions */}
				<QuickActions />
			</main>
		</div>
	);
};

export default AdminDashboardPage;
