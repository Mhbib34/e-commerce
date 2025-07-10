import { Product } from "@/type/productType";
import { Package } from "lucide-react";
import React from "react";

const StatsCard = ({ products }: { products: Product[] }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							Total Products
						</p>
						<p className="text-2xl font-bold text-gray-900 mt-1">
							{products.length}
						</p>
					</div>
					<div className="p-3 bg-blue-100 rounded-full">
						<Package className="h-6 w-6 text-blue-600" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							Low Stock
						</p>
						<p className="text-2xl font-bold text-orange-600 mt-1">
							{
								products.filter(
									(p) =>
										typeof p.stock === "number" &&
										p.stock < 10 &&
										p.stock > 0
								).length
							}
						</p>
					</div>
					<div className="p-3 bg-orange-100 rounded-full">
						<Package className="h-6 w-6 text-orange-600" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							Out of Stock
						</p>
						<p className="text-2xl font-bold text-red-600 mt-1">
							{products.filter((p) => p.stock === 0).length}
						</p>
					</div>
					<div className="p-3 bg-red-100 rounded-full">
						<Package className="h-6 w-6 text-red-600" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">
							Categories
						</p>
						<p className="text-2xl font-bold text-gray-900 mt-1">
							{
								new Set(products.map((p) => p?.category?.name))
									.size
							}
						</p>
					</div>
					<div className="p-3 bg-green-100 rounded-full">
						<Package className="h-6 w-6 text-green-600" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
