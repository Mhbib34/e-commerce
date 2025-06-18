import Button from "@/components/common/Button";
import { showConfirm } from "@/lib/tasterHelper";
import { Eye, Package, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import ProductDisplayPagination from "./ProductDisplayPagination";
import { formatCurrency } from "@/utils/format";
import { Product } from "@/type/productType";

type ProductAdminDisplayProps = {
	displayedProducts: Product[];
	deleteProduct: (id: string) => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	totalItems: number;
};

const ProductAdminDisplay = ({
	displayedProducts,
	deleteProduct,
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage, // 🆕
	totalItems, // 🆕
}: ProductAdminDisplayProps) => {
	const router = useRouter();
	const getStockStatus = (stock: number) => {
		if (stock === 0)
			return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
		if (stock < 10)
			return {
				text: "Low Stock",
				color: "bg-yellow-100 text-yellow-800",
			};
		return { text: "In Stock", color: "bg-green-100 text-green-800" };
	};
	return (
		<>
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Product
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Price
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Stock
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Category
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Brand
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{displayedProducts.length > 0 ? (
								displayedProducts.map((product) => {
									const stockStatus = getStockStatus(
										product.stock
									);
									return (
										<tr
											key={product.id}
											className="hover:bg-gray-50 transition-colors"
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="text-sm font-medium text-gray-900">
														{product.name}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-semibold text-gray-900">
													{formatCurrency(
														product.price
													)}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-2">
													<span className="text-sm font-medium text-gray-900">
														{product.stock}
													</span>
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}
													>
														{stockStatus.text}
													</span>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
													{product.category.name}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
												{product.brand}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<div className="flex items-center gap-2">
													<Button
														onClick={() =>
															router.push(
																`/admin/product/update/${product.id}`
															)
														}
														className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
														title="Edit Product"
													>
														<Pencil size={16} />
													</Button>
													<Button
														onClick={() =>
															console.log(
																`View product: ${product.name}`
															)
														}
														className="text-green-600 hover:text-green-800 transition-colors p-2 hover:bg-green-50 rounded-lg"
														title="View Product"
													>
														<Eye size={16} />
													</Button>
													<Button
														onClick={() =>
															showConfirm(
																"Are you sure you want to delete this product?",
																product.name,
																() =>
																	deleteProduct(
																		product.id
																	)
															)
														}
														className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
														title="Delete Product"
													>
														<Trash2 size={16} />
													</Button>
												</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td
										colSpan={6}
										className="px-6 py-12 text-center"
									>
										<div className="flex flex-col items-center">
											<Package className="h-12 w-12 text-gray-400 mb-4" />
											<h3 className="text-lg font-medium text-gray-900 mb-2">
												No products found
											</h3>
											<p className="text-gray-600">
												Try adjusting your search or
												filter criteria
											</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* Pagination */}
			{totalPages > 1 && (
				<ProductDisplayPagination
					displayedProducts={displayedProducts}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={onPageChange}
					itemsPerPage={itemsPerPage} // 🆕
					totalItems={totalItems}
				/>
			)}
		</>
	);
};

export default ProductAdminDisplay;
