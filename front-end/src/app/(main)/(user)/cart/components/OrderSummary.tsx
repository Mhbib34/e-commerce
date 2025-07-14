import { Lock } from "lucide-react";
import React from "react";
import { formatCurrency } from "@/utils/format";
import { showConfirm } from "@/lib/tasterHelper";

type Props = {
	subtotal: number;
	shipping: number;
	total: number;
	tax: number;
	selectedItems: string[];
	isAllSelected: boolean;
	handleCreateOrder: () => void;
	handleCreateSelectedOrder: () => void;
};

const OrderSummary = ({
	subtotal,
	shipping,
	total,
	tax,
	selectedItems,
	isAllSelected,
	handleCreateOrder,
	handleCreateSelectedOrder,
}: Props) => {
	return (
		<div className="lg:col-span-1 ">
			<div className="bg-white rounded-lg shadow-sm border sticky top-20">
				<div className="p-6 border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						Order Summary
					</h2>
					{selectedItems.length > 0 && (
						<p className="text-sm text-gray-500 mt-1">
							{selectedItems.length} item
							{selectedItems.length > 1 ? "s" : ""} selected
						</p>
					)}
				</div>

				<div className="p-6 space-y-4">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Subtotal</span>
						<span className="text-gray-900">
							{formatCurrency(subtotal)}
						</span>
					</div>

					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Shipping</span>
						<span className="text-gray-900">
							{formatCurrency(shipping)}
						</span>
					</div>

					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Tax</span>
						<span className="text-gray-900">
							{formatCurrency(tax)}
						</span>
					</div>

					<div className="border-t pt-4">
						<div className="flex justify-between">
							<span className="text-base font-medium text-gray-900">
								Total
							</span>
							<span className="text-lg font-semibold text-gray-900">
								{formatCurrency(total)}
							</span>
						</div>
					</div>
				</div>

				<div className="p-6 pt-0 space-y-3">
					<button
						onClick={() =>
							showConfirm(
								"Are you sure you want to checkout?",
								"",
								isAllSelected
									? handleCreateOrder
									: handleCreateSelectedOrder,
								"Checkout"
							)
						}
						disabled={selectedItems.length === 0}
						className={`w-full py-3 px-4 rounded-lg transition-colors font-medium flex items-center border-2 justify-center space-x-2 cursor-pointer ${
							selectedItems.length === 0
								? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
								: "bg-black text-white border-black hover:bg-gray-800"
						}`}
					>
						<Lock className="h-4 w-4" />
						<span>
							{selectedItems.length === 0
								? "Select items to checkout"
								: `Checkout (${selectedItems.length} item${
										selectedItems.length > 1 ? "s" : ""
								  })`}
						</span>
					</button>
				</div>
			</div>

			{/* Promo Code */}
			<div className="mt-6 bg-white rounded-lg shadow-sm border">
				<div className="p-6">
					<h3 className="text-sm font-medium text-gray-900 mb-3">
						Promo Code
					</h3>
					<div className="flex space-x-2">
						<input
							type="text"
							placeholder="Enter promo code"
							className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
