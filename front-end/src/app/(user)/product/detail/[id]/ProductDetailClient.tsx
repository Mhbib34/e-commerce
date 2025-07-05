// app/product/detail/[id]/ProductDetailClient.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Product } from "@/type/productType";
import { useCart } from "@/context/CartContext";
import ProductModalDetail from "@/components/template/User/product/detail/ProductModalDetail";
import { showError, showSuccess } from "@/lib/tasterHelper";
import ImageSection from "@/components/template/User/product/detail/ImageSection";
import DetailSection from "@/components/template/User/product/detail/DetailSection";
import Card from "@/components/template/User/product/Card";

interface ProductDetailClientProps {
	initialProduct: Product;
	initialTopProducts: Product[];
	productId: string;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
	initialProduct,
	initialTopProducts,
	productId,
}) => {
	const { addToCart } = useCart();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handleQuantityChange = (action: "increment" | "decrement") => {
		setQuantity((prev) => {
			const maxStock = initialProduct?.stock ?? 1;
			if (action === "increment" && prev < maxStock) return prev + 1;
			if (action === "decrement" && prev > 1) return prev - 1;
			return prev;
		});
	};

	const handleAddToCart = async () => {
		if (!initialProduct || !productId) return;

		const result = await addToCart(productId, quantity);
		if (result.success) {
			console.log("Successfully added to cart");
			setIsOpen(false);
			showSuccess("Successfully added to cart");
		} else {
			console.error("Failed to add to cart:", result.error);
			showError("Failed to add to cart");
		}
	};

	const handleProductClick = (productId: string) => {
		router.push(`/product/detail/${productId}`);
	};

	// Debug: Show raw data
	if (!initialProduct) {
		return (
			<div className="p-8 text-center">
				<h2 className="text-xl font-bold text-red-500 mb-4">
					Debug: No Product Data
				</h2>
				<p>Product ID: {productId}</p>
				<p>
					Initial Product: {JSON.stringify(initialProduct, null, 2)}
				</p>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="mt-10 mb-10"
		>
			<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
				<div className="flex flex-col lg:flex-row">
					{/* Image Section */}
					<ImageSection product={initialProduct} />

					{/* Detail Section */}
					<DetailSection
						product={initialProduct}
						setIsOpen={setIsOpen}
					/>
				</div>
			</div>

			{/* Modal with Framer Motion */}
			<ProductModalDetail
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				product={initialProduct}
				quantity={quantity}
				handleQuantityChange={handleQuantityChange}
				handleAddToCart={handleAddToCart}
			/>

			{/* Top Products */}
			<div className="w-full flex flex-col gap-2 md:gap-4 mt-5">
				<span className="md:text-xl text-lg font-medium">
					Top Product
				</span>
				<div className="md:grid-cols-5 w-full grid grid-cols-2 gap-2">
					{initialTopProducts.map((product) => (
						<Card
							onClick={() => handleProductClick(product.id)}
							key={product.id}
							id={product.id}
							name={product.name}
							brand={product.brand}
							price={product.price}
							description={product.description}
							image={product.image}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetailClient;
