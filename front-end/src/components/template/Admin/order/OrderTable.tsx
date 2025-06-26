import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";
import React from "react";
import { FaEye, FaSync } from "react-icons/fa";
type OrderTableProps = {
	loading: boolean;
	paginatedOrder: Order[];
	isSearching: boolean;
	handleUpdateStatus: (orderId: string, newStatus: string) => void;
	handleViewOrder: (orderId: string) => void;
};

const OrderTable: React.FC<OrderTableProps> = ({
	loading,
	paginatedOrder,
	isSearching,
	handleUpdateStatus,
	handleViewOrder,
}) => {
	return (
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
							<td colSpan={7} className="px-6 py-4 text-center">
								<div className="flex items-center justify-center">
									<FaSync className="animate-spin mr-2" />
									Loading...
								</div>
							</td>
						</tr>
					) : paginatedOrder.length === 0 ? (
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
						paginatedOrder.map((order) => (
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
												: order.status === "Delivered"
												? "bg-green-100 text-green-800 border-green-300"
												: "bg-red-100 text-red-800 border-red-300"
										}`}
									>
										<option value="Pending">Pending</option>
										<option value="Shipped">Shipped</option>
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
	);
};

export default OrderTable;
