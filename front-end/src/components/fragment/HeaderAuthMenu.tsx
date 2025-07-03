import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cartBadgeVariants } from "@/utils/variants";

const HeaderAuthMenu = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { cartCount } = useCart();

	return (
		<div className="flex gap-3 items-center">
			<motion.div
				title="Cart"
				className="relative w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<motion.div
					animate={
						cartCount > 0 ? { rotate: [0, -10, 10, -10, 0] } : {}
					}
					transition={{ duration: 0.5 }}
				>
					<ShoppingCart className="text-black" />
				</motion.div>
				<AnimatePresence>
					{cartCount > 0 && (
						<motion.div
							key={`cart-${cartCount}`}
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={cartBadgeVariants}
							className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-xs"
						>
							<motion.span
								key={`count-${cartCount}`}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className="text-white"
							>
								{cartCount > 99 ? "99+" : cartCount}
							</motion.span>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
			<motion.div
				onClick={() => setIsOpen(!isOpen)}
				title="Account"
				className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				animate={{
					rotate: isOpen ? 180 : 0,
				}}
				transition={{ duration: 0.2 }}
			>
				<UserRound className="text-black" />
			</motion.div>
		</div>
	);
};

export default HeaderAuthMenu;
