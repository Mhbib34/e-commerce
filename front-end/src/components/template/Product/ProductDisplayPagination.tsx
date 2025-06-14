import { Product } from "@/stores/productStores";

const ProductDisplayPagination = ({
	displayedProducts,
}: {
	displayedProducts: Product[];
}) => {
	return (
		<div>
			{displayedProducts.length > 0 && (
				<div className="flex items-center justify-between mt-6">
					<div className="text-sm text-gray-700">
						Showing <span className="font-medium">1</span> to{" "}
						<span className="font-medium">
							{displayedProducts.length}
						</span>{" "}
						of{" "}
						<span className="font-medium">
							{displayedProducts.length}
						</span>{" "}
						results
					</div>
					<div className="flex items-center gap-2">
						<button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
							Previous
						</button>
						<button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">
							1
						</button>
						<button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDisplayPagination;
