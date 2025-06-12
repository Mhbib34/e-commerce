"use client";

import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/fragment/Loading";
import { showConfirm } from "@/lib/tasterHelper";
import Button from "@/components/common/Button";

const formatRupiah = (value: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);

const AdminProductPage: FC = () => {
	const { products, loading, deleteProduct } = useProducts();
	const router = useRouter();

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="">
					<div className="flex justify-between items-center mb-6 p-6">
						<h1 className="text-2xl font-bold text-zinc-800">
							Products
						</h1>
						<Button
							onClick={() => router.push("/admin/product/add")}
							className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition cursor-pointer"
						>
							<Plus size={18} />
							Add Product
						</Button>
					</div>
					<div className="overflow-x-auto px-6">
						<table className="min-w-full border border-zinc-300 rounded-lg overflow-hidden">
							<thead className="bg-zinc-100">
								<tr>
									<th className="text-left px-4 py-3">
										Name
									</th>
									<th className="text-left px-4 py-3">
										Price
									</th>
									<th className="text-left px-4 py-3">
										Stock
									</th>
									<th className="text-left px-4 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{products.length > 0 ? (
									products.map((product) => (
										<tr
											onClick={() =>
												console.log(product.id)
											}
											key={product.id}
											className="border-t border-zinc-200"
										>
											<td className="px-4 py-3">
												{product.name}
											</td>
											<td className="px-4 py-3">
												{formatRupiah(product.price)}
											</td>
											<td className="px-4 py-3">
												{product.stock}
											</td>
											<td className="px-4 py-3 flex gap-2">
												<Button
													onClick={() =>
														router.push(
															`/admin/product/update/${product.id}`
														)
													}
													className="text-blue-600 hover:text-blue-800 cursor-pointer"
												>
													<Pencil size={18} />
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
													className="text-red-600 hover:text-red-800 cursor-pointer"
												>
													<Trash2 size={18} />
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={4}
											className="px-4 py-3 text-center"
										>
											No products found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminProductPage;
