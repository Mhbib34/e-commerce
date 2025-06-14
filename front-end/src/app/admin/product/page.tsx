"use client";

import Button from "@/components/common/Button";
import LoadingAdmin from "@/components/fragment/LoadingAdmin";
import ProductAdminDisplay from "@/components/template/Product/ProductAdminDisplay";
import SearchFilterProduct from "@/components/template/Product/SearchFilterProduct";
import StatsCard from "@/components/template/Product/StatsCard";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/stores/productStores";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const AdminProductPage: FC = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState<Product[] | null>(null);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const { products, deleteProduct, loading } = useProducts();
	const router = useRouter();

	const handleSearch = () => {
		const keyword = search.toLowerCase().trim();
		const result = products.filter((product) => {
			const matchesKeyword =
				product.name.toLowerCase().includes(keyword) ||
				product.category?.name?.toLowerCase().includes(keyword) ||
				product.brand.toLowerCase().includes(keyword);

			const matchesCategory =
				selectedCategory === "all" ||
				product.category?.name === selectedCategory;

			return matchesKeyword && matchesCategory;
		});
		setSearchResult(result);
	};

	const displayedProducts = searchResult ?? products;

	if (loading) {
		return <LoadingAdmin />;
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Products
							</h1>
							<p className="mt-1 text-gray-600">
								Manage your product inventory
							</p>
						</div>
						<Button
							onClick={() => router.push("/admin/product/add")}
							className="inline-flex items-center gap-2 border-2 bg-black cursor-pointer hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
						>
							<Plus size={20} />
							Add Product
						</Button>
					</div>
				</div>

				{/* Stats Cards */}
				<StatsCard products={products} />
				{/* Filters and Search */}
				<SearchFilterProduct
					products={products}
					search={search}
					setSearch={setSearch}
					handleSearch={handleSearch}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				{/* Products Table */}
				<ProductAdminDisplay
					displayedProducts={displayedProducts}
					deleteProduct={deleteProduct}
				/>
			</div>
		</div>
	);
};

export default AdminProductPage;
