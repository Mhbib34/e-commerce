"use client";

import { Pencil, Trash2, Plus, SearchCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/fragment/Loading";
import { showConfirm } from "@/lib/tasterHelper";
import Button from "@/components/common/Button";
import { Product } from "@/stores/productStores";

const formatRupiah = (value: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);

const AdminProductPage: FC = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState<Product[] | null>(null);
	const { products, loading, deleteProduct } = useProducts();
	const router = useRouter();

	const handleSearch = () => {
		const keyword = search.toLowerCase().trim();
		const result = products.filter(
			(product) =>
				product.name.toLowerCase().includes(keyword) ||
				product.category?.name?.toLowerCase().includes(keyword) ||
				product.brand.toLowerCase().includes(keyword)
		);
		setSearchResult(result);
	};

	const displayedProducts = searchResult ?? products;

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="px-6 flex flex-col gap-5">
					<div className="flex justify-between items-center md:py-6 py-0">
						<h1 className="text-2xl font-bold text-zinc-800">
							Products
						</h1>

						<div className="hidden md:flex items-center gap-2 border-2 py-1 px-2 rounded-xl w-[65%]">
							<SearchCheckIcon
								size={30}
								className="cursor-pointer"
								onClick={handleSearch}
							/>
							<input
								type="search"
								placeholder="Search product..."
								className="px-4 py-2 focus:outline-none w-full"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<div>
								<Button
									onClick={handleSearch}
									className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg transition cursor-pointer"
								>
									Search
								</Button>
							</div>
						</div>

						<Button
							onClick={() => router.push("/admin/product/add")}
							className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition cursor-pointer"
						>
							<Plus size={18} />
							Add Product
						</Button>
					</div>
					<div className="md:hidden flex items-center gap-2 border-2 py-1 px-2 rounded-xl ">
						<SearchCheckIcon
							size={30}
							className="cursor-pointer"
							onClick={handleSearch}
						/>
						<input
							type="search"
							placeholder="Search product..."
							className="px-4 py-2 focus:outline-none w-full"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div>
							<Button
								onClick={handleSearch}
								className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg transition cursor-pointer"
							>
								Search
							</Button>
						</div>
					</div>

					<div className="overflow-x-auto ">
						<table className="min-w-full border border-black rounded-lg overflow-hidden">
							<thead className="bg-black text-white">
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
										Category
									</th>
									<th className="text-left px-4 py-3">
										Brand
									</th>
									<th className="text-left px-4 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{displayedProducts.length > 0 ? (
									displayedProducts.map((product, index) => (
										<tr
											key={product.id}
											className={`border-t border-zinc-200 ${
												index % 2 === 0
													? "bg-zinc-200"
													: "bg-white"
											}`}
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
											<td className="px-4 py-3">
												{product.category.name}
											</td>
											<td className="px-4 py-3">
												{product.brand}
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
											colSpan={5}
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
