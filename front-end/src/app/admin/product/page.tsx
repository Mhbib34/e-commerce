"use client";

import { FC } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const mockProducts = [
	{ id: 1, name: "T-Shirt Basic", price: 150000, stock: 20 },
	{ id: 2, name: "Jeans Denim", price: 300000, stock: 15 },
	{ id: 3, name: "Sneakers Pro", price: 750000, stock: 5 },
];

const AdminProductPage: FC = () => {
	const router = useRouter();
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-zinc-800">Products</h1>
				<button
					onClick={() => router.push("/admin/product/add")}
					className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition cursor-pointer"
				>
					<Plus size={18} />
					Add Product
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full border border-zinc-300 rounded-lg overflow-hidden">
					<thead className="bg-zinc-100">
						<tr>
							<th className="text-left px-4 py-3">Name</th>
							<th className="text-left px-4 py-3">Price</th>
							<th className="text-left px-4 py-3">Stock</th>
							<th className="text-left px-4 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{mockProducts.map((product) => (
							<tr
								key={product.id}
								className="border-t border-zinc-200"
							>
								<td className="px-4 py-3">{product.name}</td>
								<td className="px-4 py-3">
									Rp{product.price.toLocaleString()}
								</td>
								<td className="px-4 py-3">{product.stock}</td>
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
	);
};

export default AdminProductPage;
