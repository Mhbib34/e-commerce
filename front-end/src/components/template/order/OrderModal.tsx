import { Order } from "@/type/orderType";
import { formatCurrency, formatDate } from "@/utils/format";
import { AnimatePresence, motion } from "framer-motion";

type OrderModalProps = {
	isModalOpen: boolean;
	selectedOrder: Order | null;
	handleCloseModal: () => void;
};

const OrderModal = ({
	isModalOpen,
	selectedOrder,
	handleCloseModal,
}: OrderModalProps) => {
	return (
		<AnimatePresence mode="wait">
			{isModalOpen && selectedOrder && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.2,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
					onClick={handleCloseModal}
				>
					<motion.div
						initial={{
							scale: 0.9,
							opacity: 0,
							y: 20,
							rotateX: -15,
						}}
						animate={{
							scale: 1,
							opacity: 1,
							y: 0,
							rotateX: 0,
						}}
						exit={{
							scale: 0.95,
							opacity: 0,
							y: -10,
							transition: { duration: 0.15, ease: "easeIn" },
						}}
						transition={{
							duration: 0.3,
							ease: [0.34, 1.56, 0.64, 1], // spring-like easing
							type: "spring",
							damping: 25,
							stiffness: 300,
						}}
						className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md relative border border-gray-200/50 overflow-hidden h-[95%] overflow-y-auto scrollbar-none"
						onClick={(e) => e.stopPropagation()}
						style={{
							boxShadow:
								"0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
						}}
					>
						{/* Header dengan gradient subtle */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"
						>
							<div className="flex items-center justify-between">
								<motion.h2
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 0.15,
										duration: 0.3,
									}}
									className="text-xl font-semibold text-gray-900"
								>
									Order Details
								</motion.h2>
								<motion.button
									initial={{
										opacity: 0,
										scale: 0.8,
										rotate: -180,
									}}
									animate={{
										opacity: 1,
										scale: 1,
										rotate: 0,
									}}
									transition={{
										delay: 0.2,
										duration: 0.3,
									}}
									whileHover={{
										scale: 1.1,
										rotate: 90,
										backgroundColor:
											"rgba(239, 68, 68, 0.1)",
									}}
									whileTap={{ scale: 0.9 }}
									onClick={handleCloseModal}
									className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-200 hover:bg-red-50"
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
									>
										<path
											d="M13 1L1 13M1 1L13 13"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
								</motion.button>
							</div>
						</motion.div>

						{/* Content area */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
							className="p-6 space-y-4"
						>
							{/* Order info cards dengan stagger animation */}
							{[
								{
									label: "Order ID",
									value: selectedOrder.id,
									icon: "🆔",
								},
								{
									label: "Customer",
									value: selectedOrder.user.name,
									icon: "👤",
								},
								{
									label: "Status",
									value: selectedOrder.status,
									icon: "📊",
								},
								{
									label: "Date",
									value: formatDate(selectedOrder.createdAt),
									icon: "📅",
								},
								{
									label: "Total",
									value: formatCurrency(selectedOrder.total),
									icon: "💰",
								},
							].map((item, index) => (
								<motion.div
									key={item.label}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 0.25 + index * 0.05,
										duration: 0.3,
										ease: "easeOut",
									}}
									whileHover={{
										scale: 1.02,
										backgroundColor:
											"rgba(59, 130, 246, 0.02)",
									}}
									className="flex items-center p-3 rounded-xl bg-gray-50/50 hover:bg-blue-50/50 transition-all duration-200 border border-transparent hover:border-blue-100"
								>
									<span className="text-lg mr-3">
										{item.icon}
									</span>
									<div className="flex-1">
										<span className="text-sm font-medium text-gray-600 block">
											{item.label}
										</span>
										<span className="text-sm text-gray-900 font-semibold">
											{item.value}
										</span>
									</div>
								</motion.div>
							))}

							{/* Items section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.4 }}
								className=""
							>
								<div className="flex items-center mb-3">
									<span className="text-lg mr-2">📦</span>
									<span className="font-medium text-gray-800">
										Items
									</span>
								</div>
								<motion.div
									className="space-y-2"
									initial="hidden"
									animate="visible"
									variants={{
										hidden: { opacity: 0 },
										visible: {
											opacity: 1,
											transition: {
												staggerChildren: 0.1,
												delayChildren: 0.6,
											},
										},
									}}
								>
									{selectedOrder.orderItems.map(
										(item, idx) => (
											<motion.div
												key={idx}
												variants={{
													hidden: {
														opacity: 0,
														x: -20,
														scale: 0.95,
													},
													visible: {
														opacity: 1,
														x: 0,
														scale: 1,
														transition: {
															duration: 0.3,
															ease: "easeOut",
														},
													},
												}}
												whileHover={{
													scale: 1.02,
													backgroundColor:
														"rgba(16, 185, 129, 0.05)",
												}}
												className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-md group"
											>
												<div className="flex items-center space-x-3">
													<motion.div
														whileHover={{
															rotate: 360,
														}}
														transition={{
															duration: 0.5,
														}}
														className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full group-hover:from-green-400 group-hover:to-green-600 transition-all duration-300"
													/>
													<span className="text-sm font-medium text-gray-900">
														{item.product.name}
													</span>
												</div>
												<motion.span
													initial={{ scale: 0.8 }}
													animate={{ scale: 1 }}
													className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold group-hover:bg-green-100 group-hover:text-green-800 transition-all duration-200"
												>
													×{item.quantity}
												</motion.span>
											</motion.div>
										)
									)}
								</motion.div>
							</motion.div>
						</motion.div>

						{/* Footer dengan action buttons (opsional) */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.3 }}
							className="px-6 pb-3 bg-gray-50/50 border-t border-gray-100 flex justify-end space-x-3"
						>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
								className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
							>
								Print Receipt
							</motion.button>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default OrderModal;
