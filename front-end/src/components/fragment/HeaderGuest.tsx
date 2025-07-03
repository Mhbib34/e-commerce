import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/utils/variants";

const HeaderGuest = () => {
	const router = useRouter();

	return (
		<div className="flex justify-center items-center gap-2">
			<motion.div
				whileHover="hover"
				whileTap="tap"
				variants={buttonVariants}
			>
				<Button
					onClick={() => router.push("/login")}
					className="py-1 px-2 border-2 rounded-lg cursor-pointer font-medium"
				>
					Login
				</Button>
			</motion.div>
			<motion.div
				whileHover="hover"
				whileTap="tap"
				variants={buttonVariants}
			>
				<Button
					onClick={() => router.push("/register")}
					className="py-1 px-2 border-2 rounded-lg cursor-pointer font-medium bg-white text-black border-white hover:bg-black hover:text-white transition-all duration-200 ease-in"
				>
					Register
				</Button>
			</motion.div>
		</div>
	);
};

export default HeaderGuest;
