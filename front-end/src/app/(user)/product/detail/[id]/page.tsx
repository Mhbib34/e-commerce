"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
	ShoppingBagIcon,
	LucideCrown,
	XCircleIcon,
	Plus,
	Minus,
	Star,
	Heart,
	Share2,
	Truck,
	Shield,
	RotateCcw,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import { formatCurrency } from "@/utils/format";

const ProductDetailPage = () => {
	const params = useParams();
	const { getProductById } = useProducts();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);

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

	const handleQuantityChange = (action: "increment" | "decrement") => {
		setQuantity((prev) => {
			const maxStock = product?.stock ?? 1;
			if (action === "increment" && prev < maxStock) return prev + 1;
			if (action === "decrement" && prev > 1) return prev - 1;
			return prev;
		});
	};

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
						<div className="relative w-full h-96 lg:h-[600px] overflow-hidden">
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
									className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer"
								>
									<Heart className="w-5 h-5 text-gray-600" />
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer"
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
								<span className="text-4xl font-bold text-black italic">
									{formatCurrency(product.price)}
								</span>
								<p className="text-sm text-gray-500 mt-1">
									{product.stock} items available
								</p>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-4 mb-8 md:flex-row flex-col w-full justify-between">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setIsOpen(true)}
									className="flex gap-2 bg-black text-white px-4 py-2 rounded-md cursor-pointer justify-center items-center w-full border-2"
								>
									<ShoppingBagIcon className="w-6 h-6" />
									<span className="font-semibold">
										Add to Cart
									</span>
								</motion.div>

								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex gap-2 bg-white text-black border-2 border-black px-4 py-2 rounded-md cursor-pointer justify-center items-center w-full"
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

			{/* Modal with Framer Motion */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
						onClick={() => setIsOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.7, opacity: 0, y: 50 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.7, opacity: 0, y: 50 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
								duration: 0.4,
							}}
							onClick={(e) => e.stopPropagation()}
							className="relative bg-white  w-full max-w-4xl rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden h-[90vh] md:h-auto"
						>
							<div className="sticky top-2 right-2 w-full flex justify-end px-2 z-10">
								<motion.button
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.9 }}
									className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:text-red-600 hover:bg-white transition-colors shadow-lg cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									<XCircleIcon className="w-6 h-6" />
								</motion.button>
							</div>

							{/* Content Modal */}
							<div className="flex flex-col md:flex-row -mt-16 pt-16">
								<div className="md:w-1/2 relative">
									<div className="relative w-full h-80 md:h-[500px] overflow-hidden">
										<Image
											src={`http://localhost:5000${product.image}`}
											alt={product.name}
											fill
											className="object-contain p-8"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>

								<div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
									{/* Rest of the modal content remains the same */}
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
										className="border-b border-gray-300 mb-6"
									>
										<div className="flex items-center gap-2 mb-2">
											<LucideCrown className="w-5 h-5 text-yellow-500" />
											<span className="font-serif text-lg font-medium">
												{product.brand}
											</span>
										</div>
										<h2 className="text-3xl font-bold text-gray-900 mb-2">
											{product.name}
										</h2>
										<p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
											<span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
											{product.stock} Available
										</p>
										<p className="text-3xl font-bold text-black mb-6 italic">
											{formatCurrency(product.price)}
										</p>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3 }}
										className="bg-gray-50 rounded-2xl p-6 mb-6"
									>
										<p className="text-sm text-gray-600 mb-4 font-medium">
											Select Quantity
										</p>
										<div className="flex items-center justify-center gap-6">
											<motion.button
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												onClick={() =>
													handleQuantityChange(
														"decrement"
													)
												}
												className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
											>
												<Minus className="w-6 h-6 text-gray-600" />
											</motion.button>
											<motion.span
												key={quantity}
												initial={{ scale: 1.2 }}
												animate={{ scale: 1 }}
												className="text-3xl font-bold text-gray-900 min-w-[3rem] text-center"
											>
												{quantity}
											</motion.span>
											<motion.button
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												onClick={() =>
													handleQuantityChange(
														"increment"
													)
												}
												className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
											>
												<Plus className="w-6 h-6 text-gray-600" />
											</motion.button>
										</div>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 }}
									>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="w-full bg-black text-white rounded-xl flex gap-2 items-center justify-center py-3 px-6"
										>
											<ShoppingBagIcon className="w-6 h-6" />
											Add {quantity} to Cart
										</motion.button>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default ProductDetailPage;
