"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/type/productType";
import { useCart } from "@/context/CartContext";
import ProductModalDetail from "@/components/template/User/product/detail/ProductModalDetail";
import { showError, showSuccess } from "@/lib/tasterHelper";
import ImageSection from "@/components/template/User/product/detail/ImageSection";
import DetailSection from "@/components/template/User/product/detail/DetailSection";
import Card from "@/components/template/User/product/Card";

const ProductDetailPage = () => {
	const { addToCart } = useCart();
	const params = useParams();
	const { getProductById, getTopProducts } = useProducts();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [topProducts, setTopProducts] = useState<Product[]>([]);

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

		const fetchTopProducts = async () => {
			try {
				const topProducts = await getTopProducts();
				setTopProducts(topProducts);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProduct();
		fetchTopProducts();
		//eslint-disable-next-line
	}, []);

	const handleQuantityChange = (action: "increment" | "decrement") => {
		setQuantity((prev) => {
			const maxStock = product?.stock ?? 1;
			if (action === "increment" && prev < maxStock) return prev + 1;
			if (action === "decrement" && prev > 1) return prev - 1;
			return prev;
		});
	};

	const handleAddToCart = async () => {
		if (!product || !params?.id) return;
		const result = await addToCart(params.id as string, quantity);
		if (result.success) {
			console.log("Successfully added to cart");
			setIsOpen(false);
			showSuccess("Successfully added to cart");
		} else {
			console.error("Failed to add to cart:", result.error);
			showError("Failed to add to cart");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center"
				>
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600 text-lg">
						Loading product details...
					</p>
				</motion.div>
			</div>
		);
	}

	if (!product) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-center min-h-screen"
			>
				<div className="text-center">
					<div className="text-6xl mb-4">😔</div>
					<p className="text-red-500 text-xl">Product not found.</p>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="mt-10 mb-10"
		>
			<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
				<div className="flex flex-col lg:flex-row">
					{/* Image Section */}
					<ImageSection product={product} />

					{/* Detail Section */}
					<DetailSection product={product} setIsOpen={setIsOpen} />
				</div>
			</div>

			{/* Modal with Framer Motion */}
			<ProductModalDetail
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				product={product}
				quantity={quantity}
				handleQuantityChange={handleQuantityChange}
				handleAddToCart={handleAddToCart}
			/>

			{/* top Products */}
			<div className="w-full flex flex-col gap-2 md:gap-4 mt-5">
				<span className="md:text-xl text-lg font-medium">
					Top Product
				</span>
				<div className="md:grid-cols-5 w-full grid grid-cols-2 gap-2">
					{topProducts.map((product) => (
						<Card
							onClick={() => {
								window.location.href = `/product/detail/${product.id}`;
							}}
							key={product.id}
							id={product.id}
							name={product.name}
							brand={product.brand}
							price={product.price}
							description={product.description}
							image={product.image}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default ProductDetailPage;
