import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { searchBarVariants } from "@/utils/variants";

const HeaderSearch = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={searchBarVariants}
			className="bg-white rounded-full hidden md:flex px-4 py-2 items-center w-full justify-between"
		>
			<input
				type="search"
				className="placeholder:text-black w-full focus:outline-none text-black"
				placeholder="Search for products, brands and more..."
			/>
			<motion.div
				className="cursor-pointer"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<Search className="text-black w-6 h-6" />
			</motion.div>
		</motion.div>
	);
};

export default HeaderSearch;
