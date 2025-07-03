import React from "react";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
	buttonVariants,
	dropdownVariants,
	itemVariants,
} from "@/utils/variants";
import { User } from "@/type/userType";

type Props = {
	user: User;
	handleClickVerify: React.MouseEventHandler<HTMLButtonElement>;
	handleLogout: React.MouseEventHandler<HTMLButtonElement>;
};
const HeaderUserMenu = ({ user, handleClickVerify, handleLogout }: Props) => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={dropdownVariants}
			className="absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-lg min-w-[160px] space-y-2 border"
			style={{ backdropFilter: "blur(10px)" }}
		>
			<motion.p
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.1 }}
				className="text-sm"
			>
				Hi, {user?.name || "User"}
			</motion.p>
			<AnimatePresence>
				{user?.isAccountVerified === false && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{
							opacity: 1,
							height: "auto",
						}}
						exit={{ opacity: 0, height: 0 }}
						transition={{ delay: 0.2 }}
					>
						<motion.div
							whileHover="hover"
							whileTap="tap"
							variants={buttonVariants}
						>
							<Button
								onClick={handleClickVerify}
								className="bg-black text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md w-full"
							>
								Verify Account
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<motion.div
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.3 }}
				whileHover="hover"
				whileTap="tap"
			>
				<Button
					onClick={handleLogout}
					className="bg-black text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md w-full"
				>
					Logout
				</Button>
			</motion.div>
		</motion.div>
	);
};

export default HeaderUserMenu;
