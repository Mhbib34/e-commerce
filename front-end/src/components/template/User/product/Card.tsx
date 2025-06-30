import { Product } from "@/type/productType";
import React from "react";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import { CheckCircleIcon } from "lucide-react";
const Card = ({ id, name, brand, price, image }: Product) => {
	return (
		<div
			key={id}
			title={name}
			className="md:w-[250px] h-[350px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col md:justify-between cursor-pointer"
		>
			<div className="relative w-full h-1/2">
				<Image
					src={`http://localhost:5000${image}`}
					alt={name}
					fill
					className="object-cover"
				/>
				<div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
					Sale
				</div>
			</div>
			<div className="p-4">
				<h3 className="text-md mb-1">{name}</h3>
				<div className="flex gap-2 items-center">
					<CheckCircleIcon className="h-5 w-5 text-green-500" />
					<span className="font-medium">{brand}</span>
				</div>
				<div className="flex  justify-between mb-3 flex-col">
					<div className="flex md:items-center md:flex-row flex-col">
						<span className="text-lg font-bold text-gray-800">
							{formatCurrency(price)}
						</span>
						<span className="text-sm text-gray-500 line-through md:ml-2">
							{formatCurrency(price * 1.2)}
						</span>
					</div>
					<div className="flex items-center ">
						<div className="text-yellow-400 text-sm">
							{"★".repeat(5)}
						</div>
						<span className="text-xs text-gray-500 ml-1">
							(4.8)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
