"use client";

import Button from "@/components/common/Button";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShoppingBagIcon, LucideCrown } from "lucide-react";
import { formatCurrency } from "@/utils/format";
const ProductDetailPage = () => {
	const params = useParams();
	const { getProductById } = useProducts();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const id = params?.id;
				if (typeof id !== "string") return;

				const fetchedProduct = await getProductById(id);
				setProduct(fetchedProduct);
			} catch (error) {
				console.error("Failed to fetch product:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [params, getProductById]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<p className="text-gray-600">Loading product details...</p>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<p className="text-red-500">Product not found.</p>
			</div>
		);
	}

	return (
		<div className="mt-10 shadow-lg md:h-[80vh]">
			<div className="bg-white rounded-lg shadow-md p-6 md:h-full">
				<div className="flex flex-col md:flex-row gap-6 h-full">
					{/* Product Image */}
					<div className="md:w-1/2">
						<div className="relative w-full h-64 md:w-full md:h-full bg-gray-100 rounded-lg overflow-hidden">
							<Image
								src={`http://localhost:5000${product.image}`}
								alt={product.name}
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 256px"
							/>
						</div>
					</div>

					{/* Product Details */}
					<div className="flex flex-col gap-2 md:w-1/2">
						<div className="	">
							<div className="flex items-center gap-2">
								<LucideCrown className="w-5 h-5 text-yellow-500" />
								<span className="font-serif">
									{product.brand}
								</span>
							</div>
							<h1 className="text-3xl font-bold text-gray-900">
								{product.name}
							</h1>
						</div>

						<div className="flex items-center">
							<div className="text-yellow-400 text-md">{"★"}</div>
							<span className="text-sm text-gray-500 ml-1">
								4.8 ({product.stock} Reviews)
							</span>
						</div>

						<div className="mb-6 border-b border-gray-200 py-4">
							<span className="text-2xl font-bold text-blue-600 ">
								{formatCurrency(product.price)}
							</span>
						</div>

						<div className="flex gap-4 items-center flex-col md:flex-row md:w-[80%]">
							<div className="flex items-center bg-black cursor-pointer text-white py-2 px-4 rounded-full w-full justify-center gap-2 border-2">
								<ShoppingBagIcon className="w-6 h-6" />
								<Button
									text="Add to Cart"
									title="Add to Cart"
									className="font-medium cursor-pointer"
								/>
							</div>
							<div className="flex items-center cursor-pointer bg-black text-white py-2 px-4 rounded-full w-full justify-center hover:bg-white hover:text-black border-2 border-black transition-all duration-200 ease-in">
								<Button
									text="Buy Now"
									title="Buy Now"
									className="font-medium cursor-pointer"
								/>
							</div>
						</div>

						<div className="mt-6 border-t-2 border-gray-200 py-2">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Description
							</h3>
							<p>Category : {product.category?.name}</p>
							<p>Brand : {product.brand}</p>
							<p className="text-gray-700 leading-relaxed mt-2">
								{product.description ||
									"No description available."}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
