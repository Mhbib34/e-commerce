import { Order } from "@/type/orderType";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import React from "react";

const OrdersItems = ({ order }: { order: Order }) => {
	return (
		<div className="space-y-3 mb-4">
			{order.orderItems.map((item) => (
				<div
					key={item.id}
					className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
				>
					<Image
						alt={item.product.name}
						src={`http://localhost:5000${item.product.image}`}
						width={48}
						height={48}
						className="w-12 h-12 object-cover rounded-lg"
					/>
					<div className="flex-1">
						<h4 className="font-medium text-gray-900">
							{item.product.name}
						</h4>
						<p className="text-sm text-gray-600">
							Quantity: {item.quantity}
						</p>
					</div>
					<div className="text-right">
						<p className="font-semibold text-gray-900">
							{formatCurrency(item.price)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrdersItems;
