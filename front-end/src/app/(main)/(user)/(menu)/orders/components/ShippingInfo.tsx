import { Order } from "@/type/orderType";
import { Truck } from "lucide-react";
import React from "react";

type Props = {
	order: Order;
	handleUpdateStatus: (id: string, status: string) => void;
};

const ShippingInfo = ({ order, handleUpdateStatus }: Props) => {
	return (
		<div className="flex items-center justify-between pt-4 border-t border-gray-200 gap-2">
			<div className="flex items-center gap-2 text-sm text-gray-600">
				<Truck className="w-4 h-4" />
				<span>Shipping to: {order.user.name}</span>
			</div>
			<div className="flex items-center gap-3">
				{order.status === "Delivered" && (
					<button className="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors font-medium">
						Buy Again
					</button>
				)}
				{order.status === "Shipped" && (
					<button
						onClick={() =>
							handleUpdateStatus(order.id, "Delivered")
						}
						className="px-4 py-2 bg-green-100 text-green-600 border border-green-600 cursor-pointer rounded-lg hover:bg-green-50 transition-colors font-medium"
					>
						Confirm Delivery
					</button>
				)}
				{order.status === "Pending" && (
					<button
						onClick={() =>
							handleUpdateStatus(order.id, "Cancelled")
						}
						className="px-4 py-2 bg-red-100 text-red-600 border border-red-600 cursor-pointer rounded-lg hover:bg-red-50 transition-colors font-medium"
					>
						Cancel
					</button>
				)}
			</div>
		</div>
	);
};

export default ShippingInfo;
