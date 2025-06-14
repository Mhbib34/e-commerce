"use client";

import { FC, useState } from "react";
import {
	ShoppingCart,
	Users,
	Package,
	DollarSign,
	TrendingUp,
	TrendingDown,
	Eye,
	Plus,
	Search,
	Filter,
	MoreHorizontal,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";

// Mock data - replace with real API calls
const mockStats = {
	totalRevenue: 452318900,
	totalOrders: 2350,
	totalProducts: 1847,
	totalCustomers: 12845,
	revenueChange: 20.1,
	ordersChange: 15.3,
	productsChange: -2.5,
	customersChange: 8.7,
};

const mockRecentOrders = [
	{
		id: "ORD-001",
		customer: "John Doe",
		amount: 1255000,
		status: "completed",
		date: "2025-06-14",
	},
	{
		id: "ORD-002",
		customer: "Jane Smith",
		amount: 899900,
		status: "pending",
		date: "2025-06-14",
	},
	{
		id: "ORD-003",
		customer: "Mike Johnson",
		amount: 2347500,
		status: "processing",
		date: "2025-06-13",
	},
	{
		id: "ORD-004",
		customer: "Sarah Wilson",
		amount: 1562000,
		status: "completed",
		date: "2025-06-13",
	},
	{
		id: "ORD-005",
		customer: "David Brown",
		amount: 999900,
		status: "cancelled",
		date: "2025-06-12",
	},
];

const mockTopProducts = [
	{
		id: 1,
		name: "Wireless Headphones",
		sales: 145,
		revenue: 145000000,
		stock: 23,
	},
	{ id: 2, name: "Smart Watch", sales: 132, revenue: 264000000, stock: 45 },
	{ id: 3, name: "Laptop Stand", sales: 98, revenue: 49000000, stock: 12 },
	{ id: 4, name: "USB-C Cable", sales: 87, revenue: 17400000, stock: 156 },
	{ id: 5, name: "Phone Case", sales: 76, revenue: 22800000, stock: 89 },
];

// Mock user data
const mockUser = { name: "Admin User" };

const AdminDashboardPage: FC = () => {
	const [user] = useState(mockUser);
	const [searchTerm, setSearchTerm] = useState("");

	const StatCard = ({
		title,
		value,
		change,
		icon: Icon,
		isRevenue = false,
	}) => (
		<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<p className="text-2xl font-bold text-gray-900 mt-2">
						{isRevenue
							? `Rp ${value.toLocaleString("id-ID")}`
							: value.toLocaleString("id-ID")}
					</p>
					<div className="flex items-center mt-2">
						{change > 0 ? (
							<ArrowUpRight className="h-4 w-4 text-green-500" />
						) : (
							<ArrowDownRight className="h-4 w-4 text-red-500" />
						)}
						<span
							className={`text-sm font-medium ml-1 ${
								change > 0 ? "text-green-600" : "text-red-600"
							}`}
						>
							{Math.abs(change)}%
						</span>
						<span className="text-sm text-gray-500 ml-1">
							from last month
						</span>
					</div>
				</div>
				<div className="p-3 bg-blue-50 rounded-full">
					<Icon className="h-6 w-6 text-blue-600" />
				</div>
			</div>
		</div>
	);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "processing":
				return "bg-blue-100 text-blue-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<StatCard
						title="Total Revenue"
						value={mockStats.totalRevenue}
						change={mockStats.revenueChange}
						icon={DollarSign}
						isRevenue={true}
					/>
					<StatCard
						title="Total Orders"
						value={mockStats.totalOrders}
						change={mockStats.ordersChange}
						icon={ShoppingCart}
					/>
					<StatCard
						title="Total Products"
						value={mockStats.totalProducts}
						change={mockStats.productsChange}
						icon={Package}
					/>
					<StatCard
						title="Total Customers"
						value={mockStats.totalCustomers}
						change={mockStats.customersChange}
						icon={Users}
					/>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					{/* Recent Orders */}
					<div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
						<div className="p-6 border-b border-gray-200">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-gray-900">
									Recent Orders
								</h3>
								<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
									View all
								</button>
							</div>
						</div>
						<div className="overflow-x-auto">
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
											Amount
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Date
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{mockRecentOrders.map((order) => (
										<tr
											key={order.id}
											className="hover:bg-gray-50"
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{order.id}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{order.customer}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												Rp{" "}
												{order.amount.toLocaleString(
													"id-ID"
												)}
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
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{order.date}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Top Products */}
					<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
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
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-lg font-semibold text-gray-900">
							Quick Actions
						</h3>
					</div>
					<div className="p-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<Plus className="h-8 w-8 text-blue-600 mb-2" />
								<span className="text-sm font-medium text-gray-900">
									Add Product
								</span>
							</button>
							<button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<Eye className="h-8 w-8 text-green-600 mb-2" />
								<span className="text-sm font-medium text-gray-900">
									View Orders
								</span>
							</button>
							<button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<Users className="h-8 w-8 text-purple-600 mb-2" />
								<span className="text-sm font-medium text-gray-900">
									Manage Users
								</span>
							</button>
							<button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
								<span className="text-sm font-medium text-gray-900">
									Analytics
								</span>
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboardPage;
