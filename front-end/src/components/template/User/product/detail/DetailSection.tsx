import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/type/productType";
import { formatCurrency } from "@/utils/format";
import { RotateCcw, Shield, ShoppingBagIcon, Star, Truck } from "lucide-react";
import { LucideCrown } from "lucide-react";

interface Props {
	product: Product;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailSection = ({ product, setIsOpen }: Props) => {
	return (
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
						<span className="font-semibold">Add to Cart</span>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="flex gap-2 bg-white text-black border-2 border-black px-4 py-2 rounded-md cursor-pointer justify-center items-center w-full"
					>
						<span className="font-semibold">Buy Now</span>
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
							<span className="font-medium">Category:</span>{" "}
							{product.category?.name}
						</p>
						<p>
							<span className="font-medium">Brand:</span>{" "}
							{product.brand}
						</p>
						<p className="leading-relaxed mt-4">
							{product.description || "No description available."}
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default DetailSection;
