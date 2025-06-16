import { Order } from "@/type/orderType";
import { Product } from "@/type/productType";

type Props = {
	displayedProducts: Product[] | Order[];
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
	onPageChange: (page: number) => void;
};

const ProductDisplayPagination = ({
	displayedProducts,
	currentPage,
	totalPages,
	itemsPerPage,
	totalItems,
	onPageChange,
}: Props) => {
	if (displayedProducts.length === 0) return null;

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const startIndex = (currentPage - 1) * itemsPerPage + 1;
	const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex items-center justify-between mt-6">
			<div className="text-sm text-gray-700">
				Showing <span className="font-medium">{startIndex}</span> to{" "}
				<span className="font-medium">{endIndex}</span> of{" "}
				<span className="font-medium">{totalItems}</span> results
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>
				<span className="px-4 py-2 rounded-lg text-sm font-medium text-gray-900">
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ProductDisplayPagination;
