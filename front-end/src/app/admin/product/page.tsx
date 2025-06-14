"use client";

import Button from "@/components/common/Button";
import LoadingAdmin from "@/components/fragment/LoadingAdmin";
import ProductAdminDisplay from "@/components/template/Product/ProductAdminDisplay";
import SearchFilterProduct from "@/components/template/Product/SearchFilterProduct";
import StatsCard from "@/components/template/Product/StatsCard";
import { useProducts } from "@/hooks/useProducts";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/stores/productStores";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const AdminProductPage: FC = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState<Product[] | null>(null);
	const [searching, setSearching] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;

	const {
		products,
		deleteProduct,
		loading,
		total,
		allProducts,
		getAllProducts,
	} = useProducts(page, itemsPerPage);
	const router = useRouter();

	useEffect(() => {
		getAllProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearch = async () => {
		const keyword = search.toLowerCase().trim();

		// Kosongin search = kembali ke default
		if (!keyword && selectedCategory === "all") {
			setSearchResult(null);
			setSearching(false);
			return;
		}

		setSearching(true);

		try {
			const res = await axiosInstance.get("/product/list");
			const allProducts: Product[] = res.data.product;

			const result = allProducts.filter((product) => {
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
			setPage(1);
		} catch (err) {
			console.error("Search failed:", err);
		}
	};

	const isSearching = searching && searchResult !== null;
	const displayedProducts = searchResult ?? products;
	const totalPages = isSearching
		? Math.ceil(displayedProducts.length / itemsPerPage)
		: Math.ceil(total);
	const paginatedProducts = displayedProducts;

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
				<StatsCard products={allProducts} />

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
					displayedProducts={paginatedProducts}
					deleteProduct={deleteProduct}
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
					itemsPerPage={itemsPerPage}
					totalItems={displayedProducts.length}
				/>
			</div>
		</div>
	);
};

export default AdminProductPage;
