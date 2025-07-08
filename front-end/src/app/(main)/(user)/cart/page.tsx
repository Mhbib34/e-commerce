"use client";

import React, { useState } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { showError, showSuccess } from "@/lib/tasterHelper";
import OrderSummary from "./OrderSummary";
import CartItems from "./CartItems";

const ShoppingCart: React.FC = () => {
	const router = useRouter();
	const { cartCount, cartItems, removeFromCart, updateQuantity } = useCart();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

	const handleDeleteCart = async (id: string) => {
		try {
			await removeFromCart(id);
			showSuccess("Item deleted successfully.");
		} catch (error) {
			console.error("Failed to remove item from cart:", error);
			showError("Failed to remove item from cart.");
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
					<CartItems
						cartItems={cartItems}
						handleDeleteCart={handleDeleteCart}
						updateQuantity={updateQuantity}
						cartCount={cartCount}
						isAllSelected={isAllSelected}
						isPartialSelected={isPartialSelected}
						toggleSelectAll={toggleSelectAll}
						selectedItems={selectedItems}
						toggleItemSelection={toggleItemSelection}
					/>

					{/* Order Summary */}
					<OrderSummary
						subtotal={subtotal}
						shipping={shipping}
						total={total}
						tax={tax}
						selectedItems={selectedItems}
					/>
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
