import { Product } from "@/type/productType";
import React from "react";

const TopProducts = ({ topProducts }: { topProducts: Product[] }) => {
	return (
		<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">
					Top Products
				</h3>
			</div>
			<div className="p-6">
				{topProducts.length > 0 ? (
					<ul className="space-y-4">
						{topProducts.map((product, index) => (
							<li
								key={product.id}
								className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
							>
								<div className="flex items-center gap-3">
									<span className="text-lg font-bold text-gray-700 w-6">
										{index === 0
											? "🥇"
											: index === 1
											? "🥈"
											: index === 2
											? "🥉"
											: `#${index + 1}`}
									</span>
									<p className="text-gray-800 font-medium">
										{product.name}
									</p>
								</div>
								<span className="text-sm font-semibold text-blue-600">
									{product.quantity} sold
								</span>
							</li>
						))}
					</ul>
				) : (
					<div className="text-center text-gray-500 py-6">
						<p>No top products available yet.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TopProducts;
