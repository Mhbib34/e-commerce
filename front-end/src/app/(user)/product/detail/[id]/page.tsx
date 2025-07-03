"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	ShoppingBagIcon,
	LucideCrown,
	Star,
	Heart,
	Share2,
	Truck,
	Shield,
	RotateCcw,
} from "lucide-react";
// import Button from "@/components/common/Button";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import { formatCurrency } from "@/utils/format";

const ProductDetailPage = () => {
	const params = useParams();
	const { getProductById } = useProducts();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const id = params?.id;
				if (typeof id !== "string") return;
				const fetchedProduct = await getProductById(id);
				setProduct(fetchedProduct);
			} catch (error) {
				console.error("Failed to fetch product:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [params, getProductById]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center"
				>
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600 text-lg">
						Loading product details...
					</p>
				</motion.div>
			</div>
		);
	}

	if (!product) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-center min-h-screen"
			>
				<div className="text-center">
					<div className="text-6xl mb-4">😔</div>
					<p className="text-red-500 text-xl">Product not found.</p>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="mt-10 mb-10"
		>
			<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
				<div className="flex flex-col lg:flex-row">
					{/* Image Section */}
					<div className="lg:w-1/2 relative">
						<div className="relative w-full h-96 lg:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
							<Image
								src={`http://localhost:5000${product.image}`}
								alt={product.name}
								fill
								className="object-contain p-8 hover:scale-105 transition-transform duration-500"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className="absolute top-4 right-4 flex gap-2">
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
								>
									<Heart className="w-5 h-5 text-gray-600" />
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
								>
									<Share2 className="w-5 h-5 text-gray-600" />
								</motion.button>
							</div>
						</div>
					</div>

					{/* Detail Section */}
					<div className="lg:w-1/2 p-8 lg:p-12">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<div className="flex items-center gap-3 mb-3">
								<LucideCrown className="w-6 h-6 text-yellow-500" />
								<span className="font-serif text-lg text-gray-700 font-medium">
									{product.brand}
								</span>
							</div>

							<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
								{product.name}
							</h1>

							<div className="flex items-center gap-4 mb-6">
								<div className="flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${
												i < 4
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-500 font-medium">
									4.8 ({product.stock} Reviews)
								</span>
							</div>

							<div className="mb-8">
								<span className="text-4xl font-bold text-blue-600">
									{formatCurrency(product.price)}
								</span>
								<p className="text-sm text-gray-500 mt-1">
									{product.stock} items available
								</p>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-4 mb-8">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl flex-1 justify-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<ShoppingBagIcon className="w-6 h-6" />
									<span className="font-semibold">
										Add to Cart
									</span>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center bg-white text-gray-900 py-4 px-8 rounded-2xl flex-1 justify-center border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
								>
									<span className="font-semibold">
										Buy Now
									</span>
								</motion.div>
							</div>

							{/* Features */}
							<div className="grid grid-cols-3 gap-4 mb-8">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Truck className="w-5 h-5 text-green-600" />
									<span>Free Shipping</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Shield className="w-5 h-5 text-blue-600" />
									<span>Warranty</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<RotateCcw className="w-5 h-5 text-orange-600" />
									<span>Easy Return</span>
								</div>
							</div>

							{/* Description */}
							<div className="border-t border-gray-200 pt-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-4">
									Product Details
								</h3>
								<div className="space-y-2 text-gray-700">
									<p>
										<span className="font-medium">
											Category:
										</span>{" "}
										{product.category?.name}
									</p>
									<p>
										<span className="font-medium">
											Brand:
										</span>{" "}
										{product.brand}
									</p>
									<p className="leading-relaxed mt-4">
										{product.description ||
											"No description available."}
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetailPage;
