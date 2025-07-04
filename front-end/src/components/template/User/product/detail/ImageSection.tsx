import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Heart, Share2 } from "lucide-react";
import { Product } from "@/type/productType";

const ImageSection = ({ product }: { product: Product }) => {
	return (
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
	);
};

export default ImageSection;
