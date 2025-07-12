"use client";
import React, { useState } from "react";
import { X, Package, MapPin, Mail, Copy, Download } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/type/orderType";
import {
	backdropVariants,
	contentVariants,
	itemVariants,
	modalVariants,
} from "@/utils/variants";
import { getStatusColor, getStatusIcon } from "@/utils/statusOrder";
import { formatCurrency, formatDate } from "@/utils/format";

interface OrderDetailModalProps {
	order: Order;
	isOpen: boolean;
	onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
	order,
	isOpen,
	onClose,
}) => {
	const [copied, setCopied] = useState(false);

	const copyOrderNumber = () => {
		navigator.clipboard.writeText(order.id);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{ duration: 0.3 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<motion.div
							className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50"
							variants={itemVariants}
							initial="hidden"
							animate="visible"
						>
							<div className="flex items-center space-x-4">
								<motion.div
									className="bg-white rounded-full p-2 shadow-sm"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Package className="w-6 h-6 text-blue-600" />
								</motion.div>
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Detail Pesanan
									</h2>
									<div className="flex items-center space-x-2 mt-1">
										<span className="text-sm text-gray-600">
											#{order.id}
										</span>
										<motion.button
											onClick={copyOrderNumber}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Copy className="w-3 h-3 text-gray-500" />
										</motion.button>
										<AnimatePresence>
											{copied && (
												<motion.span
													className="text-xs text-green-600"
													initial={{
														opacity: 0,
														x: -10,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													exit={{ opacity: 0, x: 10 }}
													transition={{
														duration: 0.2,
													}}
												>
													Disalin!
												</motion.span>
											)}
										</AnimatePresence>
									</div>
								</div>
							</div>
							<motion.button
								onClick={onClose}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								transition={{ duration: 0.2 }}
							>
								<X className="w-6 h-6 text-gray-500" />
							</motion.button>
						</motion.div>

						{/* Content */}
						<div className="overflow-y-auto max-h-[calc(90vh-80px)]">
							<motion.div
								className="p-6 space-y-6"
								variants={contentVariants}
								initial="hidden"
								animate="visible"
							>
								{/* Status and Basic Info */}
								<motion.div
									className="grid grid-cols-1 md:grid-cols-3 gap-4"
									variants={itemVariants}
								>
									<motion.div
										className="bg-gray-50 rounded-lg p-4"
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.2 }}
									>
										<div className="flex items-center space-x-2 mb-2">
											{getStatusIcon(order.status)}
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
													order.status
												)}`}
											>
												{order?.status
													?.charAt(0)
													.toUpperCase() +
													order?.status?.slice(1)}
											</span>
										</div>
										<p className="text-sm text-gray-600">
											Status Pesanan
										</p>
									</motion.div>

									<motion.div
										className="bg-gray-50 rounded-lg p-4"
										whileHover={{ scale: 1.02 }}
										transition={{ duration: 0.2 }}
									>
										<p className="font-semibold text-gray-900">
											{formatDate(order.createdAt)}
										</p>
										<p className="text-sm text-gray-600">
											Tanggal Pesanan
										</p>
									</motion.div>
								</motion.div>

								{/* Items */}
								<motion.div
									className="bg-white border rounded-lg overflow-hidden"
									variants={itemVariants}
									whileHover={{ scale: 1.005 }}
									transition={{ duration: 0.2 }}
								>
									<div className="bg-gray-50 px-6 py-4 border-b">
										<h3 className="font-semibold text-gray-900">
											Produk yang Dipesan
										</h3>
									</div>
									<div className="divide-y">
										{order?.orderItems?.map(
											(item, index) => (
												<motion.div
													key={item.id}
													className="flex items-center space-x-4 p-6"
													initial={{
														opacity: 0,
														x: -20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														delay: index * 0.1,
													}}
													whileHover={{
														backgroundColor:
															"rgba(249, 250, 251, 0.5)",
													}}
												>
													<motion.div
														whileHover={{
															scale: 1.05,
														}}
														transition={{
															duration: 0.2,
														}}
													>
														<Image
															src={`http://localhost:5000${item.product.image}`}
															alt={
																item.product
																	.name
															}
															width={64}
															height={64}
															className="w-16 h-16 object-cover rounded-lg bg-gray-100"
														/>
													</motion.div>
													<div className="flex-1">
														<h4 className="font-medium text-gray-900">
															{item.product.name}
														</h4>
														<div className="flex items-center justify-between mt-2">
															<span className="text-sm text-gray-600">
																Quantity:{" "}
																{item.quantity}
															</span>
															<span className="font-semibold text-gray-900">
																{formatCurrency(
																	item.price *
																		item.quantity
																)}
															</span>
														</div>
													</div>
												</motion.div>
											)
										)}
									</div>
								</motion.div>

								{/* Shipping Address */}
								<motion.div
									className="bg-white border rounded-lg overflow-hidden"
									variants={itemVariants}
									whileHover={{ scale: 1.005 }}
									transition={{ duration: 0.2 }}
								>
									<div className="bg-gray-50 px-6 py-4 border-b">
										<h3 className="font-semibold text-gray-900 flex items-center space-x-2">
											<MapPin className="w-5 h-5" />
											<span>Alamat Pengiriman</span>
										</h3>
									</div>
									<motion.div
										className="p-6"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2 }}
									>
										<div className="space-y-2">
											<p className="font-semibold text-gray-900">
												Rumah : {order.user.name}
											</p>
											<p className="font-semibold text-gray-900">
												Email : {order.user.email}
											</p>
											<p className="font-semibold text-gray-900">
												Username : {order.user.username}
											</p>
										</div>
									</motion.div>
								</motion.div>

								{/* Payment Summary */}
								<motion.div
									className="bg-white border rounded-lg overflow-hidden"
									variants={itemVariants}
									whileHover={{ scale: 1.005 }}
									transition={{ duration: 0.2 }}
								>
									<div className="bg-gray-50 px-6 py-4 border-b">
										<h3 className="font-semibold text-gray-900">
											Ringkasan Pembayaran
										</h3>
									</div>
									<motion.div
										className="p-6 space-y-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										<div className="border-t pt-4">
											<motion.div
												className="flex justify-between text-lg font-semibold text-gray-900"
												whileHover={{ scale: 1.02 }}
											>
												<span>Total</span>
												<span>
													{formatCurrency(
														order.total
													)}
												</span>
											</motion.div>
										</div>
									</motion.div>
								</motion.div>
							</motion.div>
						</div>

						{/* Footer */}
						<motion.div
							className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center"
							variants={itemVariants}
							initial="hidden"
							animate="visible"
						>
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<Mail className="w-4 h-4" />
								<span>
									Butuh bantuan? Hubungi customer service
								</span>
							</div>
							<div className="flex space-x-3">
								<motion.button
									className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Download className="w-4 h-4" />
									<span>Unduh Invoice</span>
								</motion.button>
								<motion.button
									onClick={onClose}
									className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Tutup
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default OrderDetailModal;
