import React from "react";
import QuantityControls from "./QuantityControls";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import { Cart } from "@/type/cartType";
type Props = {
	cartItems: Cart[];
	handleDeleteCart: (id: string) => Promise<void>;
	updateQuantity: (id: string, quantity: number) => Promise<void>;
	cartCount: number;
	isAllSelected: boolean;
	isPartialSelected: boolean;
	toggleSelectAll: () => void;
	selectedItems: string[];
	toggleItemSelection: (itemId: string) => void;
};

const CartItems = ({
	cartItems,
	handleDeleteCart,
	updateQuantity,
	cartCount,
	isAllSelected,
	isPartialSelected,
	toggleSelectAll,
	selectedItems,
	toggleItemSelection,
}: Props) => {
	return (
		<div className="lg:col-span-2 w-full">
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-6 border-b">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">
							Cart Items ({cartCount})
						</h2>
						{cartItems.length > 0 && (
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="select-all"
									checked={isAllSelected}
									ref={(input) => {
										if (input)
											input.indeterminate =
												isPartialSelected;
									}}
									onChange={toggleSelectAll}
									className="h-4 w-4 rounded border-gray-300 accent-black cursor-pointer"
								/>
								<label
									htmlFor="select-all"
									className="text-sm font-medium text-gray-700 cursor-pointer"
								>
									Select All
								</label>
							</div>
						)}
					</div>
				</div>

				<div className="divide-y divide-gray-200">
					{cartItems.map((item) => (
						<div
							key={item.id}
							onClick={() => console.log(item.id)}
							className="p-6 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center space-x-4">
								{/* Checkbox */}
								<div className="flex-shrink-0">
									<input
										type="checkbox"
										id={`item-${item.id}`}
										checked={selectedItems.includes(
											item.id
										)}
										onChange={() =>
											toggleItemSelection(item.id)
										}
										className="h-4 w-4 rounded accent-black cursor-pointer"
									/>
								</div>

								{/* Product Image */}
								<div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
									<Image
										src={`http://localhost:5000${item.product.image}`}
										alt={item.product.name}
										fill
										className="object-contain"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
								</div>

								{/* Product Info */}
								<div className="flex-1 min-w-0">
									<h3 className="text-sm font-medium text-gray-900 truncate">
										{item.product.name}
									</h3>
									<div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
										{item.product.brand && (
											<span>
												Brand: {item.product.brand}
											</span>
										)}
									</div>
									<p className="mt-1 text-sm font-medium text-gray-900">
										{formatCurrency(item.product.price)}
									</p>
								</div>

								{/* Quantity Controls */}
								<QuantityControls
									item={item}
									updateQuantity={updateQuantity}
									handleDeleteCart={handleDeleteCart}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CartItems;
