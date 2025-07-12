import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";
import { getStatusColor, getStatusIcon } from "@/utils/statusOrder";
import { Eye, MoreVertical } from "lucide-react";
import React from "react";

const OrdersHeader = ({
	order,
	handleOpenModal,
}: {
	order: Order;
	handleOpenModal: (orderId: string) => void;
}) => {
	return (
		<div className=" mb-4 flex flex-col gap-2">
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-3 ">
					<h3 className="text-lg font-semibold text-gray-900">
						<span className="md:hidden">
							{order.id.slice(0, 10)}...
						</span>
						<span className="md:inline hidden">
							{order.id.slice(0, 20)}...
						</span>
					</h3>
					<span
						className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
							order.status
						)}`}
					>
						{getStatusIcon(order.status)}
						{order.status === "Delivered" && "Delivered"}
						{order.status === "Shipped" && "Shipped"}
						{order.status === "Processing" && "Processing"}
						{order.status === "Pending" && "Pending"}
						{order.status === "Cancelled" && "Cancelled"}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => handleOpenModal(order.id)}
						title="View Order"
						className="p-2 text-gray-400 cursor-pointer hover:text-black rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Eye className="w-5 h-5" />
					</button>
					<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
						<MoreVertical className="w-5 h-5" />
					</button>
				</div>
			</div>
			<div className="flex items-center gap-1 md:gap-4 text-sm text-gray-600">
				<span>{formatDate(order.createdAt)}</span>
				<span>•</span>
				<span>{order.orderItems.length} item</span>
				<span>•</span>
				<span className="font-semibold text-gray-900">
					{formatCurrency(order.total)}
				</span>
			</div>
		</div>
	);
};

export default OrdersHeader;
