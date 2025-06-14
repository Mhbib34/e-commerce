import { Order } from "@/stores/OrderStores";
import React from "react";

type OrderDisplayAdminProps = {
	mockRecentOrders: Order[];
};
const OrderDisplayAdmin: React.FC<OrderDisplayAdminProps> = ({
	mockRecentOrders,
}) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Create":
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
								Customer
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Amount
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Total Product
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Date
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{mockRecentOrders.map((order) => (
							<tr key={order.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.user.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									Rp {order.total.toLocaleString("id-ID")}
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
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.orderItems.length}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{new Date(order.createdAt).toLocaleString(
										"id-ID"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderDisplayAdmin;
