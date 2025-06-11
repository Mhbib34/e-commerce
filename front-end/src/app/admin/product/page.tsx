"use client";

import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/fragment/Loading";

const formatRupiah = (value: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);

const AdminProductPage: FC = () => {
	const { products, loading } = useProducts();
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
						<button
							onClick={() => router.push("/admin/product/add")}
							className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition cursor-pointer"
						>
							<Plus size={18} />
							Add Product
						</button>
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
								{products.map((product) => (
									<tr
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
											<button className="text-blue-600 hover:text-blue-800">
												<Pencil size={18} />
											</button>
											<button className="text-red-600 hover:text-red-800">
												<Trash2 size={18} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminProductPage;
