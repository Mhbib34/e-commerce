"use client";

import React, { useState } from "react";
import {
	Trash2,
	Plus,
	Minus,
	ShoppingBag,
	ArrowLeft,
	Lock,
} from "lucide-react";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const ShoppingCart: React.FC = () => {
	const router = useRouter();
	const { cartCount, cartItems } = useCart();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(price);
	};

	// Toggle individual item selection
	const toggleItemSelection = (itemId: string) => {
		setSelectedItems((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		);
	};

	// Toggle select all items
	const toggleSelectAll = () => {
		if (selectedItems.length === cartItems.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(cartItems.map((item) => item.id));
		}
	};

	// Calculate totals only for selected items
	const selectedCartItems = cartItems.filter((item) =>
		selectedItems.includes(item.id)
	);
	const subtotal = selectedCartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	const shipping = selectedItems.length > 0 ? 25000 : 0;
	const tax = subtotal * 0.05;
	const total = subtotal + shipping + tax;

	const isAllSelected =
		selectedItems.length === cartItems.length && cartItems.length > 0;
	const isPartialSelected =
		selectedItems.length > 0 && selectedItems.length < cartItems.length;

	return (
		<div className="min-h-screen bg-gray-50 mt-10">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="px-6">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-4">
							<Button
								onClick={() => router.push("/")}
								className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 transition-colors"
							>
								<ArrowLeft className="h-5 w-5 mr-2" />
								<span>Continue Shopping</span>
							</Button>
						</div>
						<div className="flex items-center space-x-2">
							<ShoppingBag className="h-6 w-6 text-black" />
							<span className="text-xl font-semibold text-gray-900">
								Shopping Cart
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className=" py-8">
				<div className="flex flex-col lg:flex-row gap-8 justify-between">
					{/* Cart Items */}
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
														toggleItemSelection(
															item.id
														)
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
															Brand:{" "}
															{item.product.brand}
														</span>
													)}
												</div>
												<p className="mt-1 text-sm font-medium text-gray-900">
													{formatPrice(
														item.product.price
													)}
												</p>
											</div>

											{/* Quantity Controls */}
											<div className="flex items-center space-x-3">
												<div className="flex items-center border border-gray-300 rounded-lg">
													<button
														// onClick={() =>
														// 	updateQuantity(
														// 		item.id,
														// 		item.quantity -
														// 			1
														// 	)
														// }
														className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
													>
														<Minus className="h-4 w-4 text-gray-600" />
													</button>
													<span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
														{item.quantity}
													</span>
													<button
														// onClick={() =>
														// 	updateQuantity(
														// 		item.id,
														// 		item.quantity +
														// 			1
														// 	)
														// }
														className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
													>
														<Plus className="h-4 w-4 text-gray-600" />
													</button>
												</div>

												<button
													// onClick={() =>
													// 	removeItem(item.id)
													// }
													className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1 ">
						<div className="bg-white rounded-lg shadow-sm border sticky top-20">
							<div className="p-6 border-b">
								<h2 className="text-lg font-semibold text-gray-900">
									Order Summary
								</h2>
								{selectedItems.length > 0 && (
									<p className="text-sm text-gray-500 mt-1">
										{selectedItems.length} item
										{selectedItems.length > 1
											? "s"
											: ""}{" "}
										selected
									</p>
								)}
							</div>

							<div className="p-6 space-y-4">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">
										Subtotal
									</span>
									<span className="text-gray-900">
										{formatPrice(subtotal)}
									</span>
								</div>

								<div className="flex justify-between text-sm">
									<span className="text-gray-600">
										Shipping
									</span>
									<span className="text-gray-900">
										{formatPrice(shipping)}
									</span>
								</div>

								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Tax</span>
									<span className="text-gray-900">
										{formatPrice(tax)}
									</span>
								</div>

								<div className="border-t pt-4">
									<div className="flex justify-between">
										<span className="text-base font-medium text-gray-900">
											Total
										</span>
										<span className="text-lg font-semibold text-gray-900">
											{formatPrice(total)}
										</span>
									</div>
								</div>
							</div>

							<div className="p-6 pt-0 space-y-3">
								<button
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
											: `Checkout (${
													selectedItems.length
											  } item${
													selectedItems.length > 1
														? "s"
														: ""
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
				</div>

				{/* Empty Cart State */}
				{cartItems.length === 0 && (
					<div className="bg-white rounded-lg shadow-sm border p-12 text-center">
						<ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Your cart is empty
						</h3>
						<p className="text-gray-500 mb-6">
							Add some products to get started
						</p>
						<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
							Continue Shopping
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
