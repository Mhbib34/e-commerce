import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";
import {
	CheckCircle,
	Clock,
	Eye,
	MoreVertical,
	Package,
	Truck,
	XCircle,
} from "lucide-react";
import React from "react";

const OrdersHeader = ({ order }: { order: Order }) => {
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
					<button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
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
