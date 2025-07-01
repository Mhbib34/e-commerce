"use client";

import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
		return <p className="mt-4">Loading product detail...</p>;
	}

	if (!product) {
		return <p className="mt-4 text-red-500">Product not found.</p>;
	}

	return (
		<div className="mt-4">
			<h1>{product.name}</h1>
		</div>
	);
};

export default ProductDetailPage;
