"use client";

import LoadingAdmin from "@/components/fragment/LoadingAdmin";
import ProductAdminDisplay from "@/components/template/Admin/Product/ProductAdminDisplay";
import ProductModal from "@/components/template/Admin/Product/ProductModal";
import SearchFilterProduct from "@/components/template/Admin/Product/SearchFilterProduct";
import StatsCard from "@/components/template/Admin/Product/StatsCard";
import { useProducts } from "@/hooks/useProducts";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/type/productType";
import { Plus } from "lucide-react";
import Link from "next/link";
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
			console.log(allProducts);

			const result = allProducts.filter((product) => {
				const matchesKeyword =
					product.name.toLowerCase().includes(keyword) ||
					product.category?.name?.toLowerCase().includes(keyword) ||
					product?.brand?.toLowerCase().includes(keyword);

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

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewProduct = (ProductId: string) => {
		const Product = paginatedProducts.find(
			(Product) => Product.id === ProductId
		);
		if (Product) {
			setSelectedProduct(Product);
			setIsModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	if (loading) {
		return <LoadingAdmin />;
	}

	return (
		<div className="min-h-screen bg-white  mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="max-w-7xl">
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
						<Link
							href="/admin/product/add"
							className="inline-flex items-center gap-2 border-2 bg-black cursor-pointer hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
						>
							<Plus size={20} />
							Add Product
						</Link>
					</div>
				</div>

				{/* Stats Cards */}
				<StatsCard products={allProducts} />

				{/* Filters and Search */}
				<SearchFilterProduct
					products={allProducts}
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
					totalItems={allProducts.length}
					onClick={handleViewProduct}
				/>
			</div>
			<ProductModal
				selectedProduct={selectedProduct}
				isModalOpen={isModalOpen}
				handleCloseModal={handleCloseModal}
			/>
		</div>
	);
};

export default AdminProductPage;
