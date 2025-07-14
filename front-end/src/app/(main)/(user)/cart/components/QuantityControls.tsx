import { showConfirm } from "@/lib/tasterHelper";
import { Cart } from "@/type/cartType";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

interface QuantityControlsProps {
	item: Cart;
	updateQuantity: (id: string, quantity: number) => void;
	handleDeleteCart: (id: string) => void;
}

const QuantityControls = ({
	item,
	updateQuantity,
	handleDeleteCart,
}: QuantityControlsProps) => {
	return (
		<div className="flex items-center space-x-3">
			<div className="flex items-center border border-gray-300 rounded-lg">
				<button
					onClick={() => updateQuantity(item.id, item.quantity - 1)}
					className="p-1 hover:bg-gray-100 cursor-pointer rounded-l-lg transition-colors"
				>
					<Minus className="h-4 w-4 text-gray-600" />
				</button>
				<span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
					{item.quantity}
				</span>
				<button
					onClick={() => updateQuantity(item.id, item.quantity + 1)}
					className="p-1 hover:bg-gray-100 cursor-pointer rounded-r-lg transition-colors"
				>
					<Plus className="h-4 w-4 text-gray-600" />
				</button>
			</div>

			<button
				onClick={() =>
					showConfirm(
						"Are you sure you want to delete this cart item?",
						item.product.name,
						() => handleDeleteCart(item.id),
						"Delete"
					)
				}
				className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
			>
				<Trash2 className="h-4 w-4" />
			</button>
		</div>
	);
};

export default QuantityControls;
