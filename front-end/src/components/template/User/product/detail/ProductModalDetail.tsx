import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	LucideCrown,
	Minus,
	Plus,
	ShoppingBagIcon,
	XCircleIcon,
} from "lucide-react";
import { Product } from "@/type/productType";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";

interface ProductModalDetailProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	product: Product;
	quantity: number;
	handleQuantityChange: (action: "increment" | "decrement") => void;
	handleAddToCart: React.MouseEventHandler<HTMLButtonElement>;
}
const ProductModalDetail = ({
	isOpen,
	setIsOpen,
	product,
	quantity,
	handleQuantityChange,
	handleAddToCart,
}: ProductModalDetailProps) => {
	return (
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
										onClick={handleAddToCart}
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
	);
};

export default ProductModalDetail;
