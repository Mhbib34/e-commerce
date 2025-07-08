// UpdateProductPage.tsx
"use client";

import LoadingSpinner from "@/components/fragment/Loading";
import ProductForm from "@/components/template/Admin/Product/ProductForm";
import { useProductForm } from "@/hooks/useProductForm";
import { useProducts } from "@/hooks/useProducts";
import { showError, showSuccess, showWarning } from "@/lib/tasterHelper";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateProductPage = () => {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;

	const { updateProduct, getProductById } = useProducts();

	//eslint-disable-next-line
	const [product, setProduct] = useState<any>(null);
	const {
		name,
		price,
		stock,
		brand,
		description,
		categoryName,
		image,
		setName,
		setPrice,
		setStock,
		setBrand,
		setDescription,
		setCategoryName,
		setImage,
	} = useProductForm();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const fetchedProduct = await getProductById(id);
				setProduct(fetchedProduct);
				setName(fetchedProduct.name);
				setPrice(fetchedProduct.price.toString());
				setStock(fetchedProduct?.stock?.toString() || "");
				setBrand(fetchedProduct?.brand || "");
				setCategoryName(fetchedProduct?.category?.name || "");
				setDescription(fetchedProduct?.description || "");
			} catch (error) {
				console.error(error);
				showError("Failed to fetch product data");
			}
		};

		if (id) fetchProduct();
		//eslint-disable-next-line
	}, [id]);

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !price || !stock || !categoryName || !description) {
			showWarning("Please fill in all required fields.");
			return;
		}
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("stock", stock);
		formData.append("brand", brand);
		formData.append("categoryName", categoryName);
		formData.append("description", description);
		if (image) formData.append("image", image);

		try {
			await updateProduct(id as string, formData);
			showSuccess("Product updated successfully.");
			router.push("/admin/product");
		} catch (error) {
			const err = error as AxiosError<{ errors?: string }>;
			const errorMessage =
				err.response?.data?.errors ||
				"Failed to update product. Please try again.";
			showError(errorMessage);
			console.log(errorMessage);
		}
	};

	if (!product) {
		return <LoadingSpinner />;
	}

	return (
		<ProductForm
			onSubmit={handleUpdate}
			textLink="Update Product"
			linkPage="/admin/product"
			buttonText="Update Product"
			name={name}
			setName={setName}
			price={price}
			setPrice={setPrice}
			stock={stock}
			setStock={setStock}
			categoryName={categoryName}
			setCategoryName={setCategoryName}
			brand={brand}
			setBrand={setBrand}
			description={description}
			setDescription={setDescription}
			setImageFile={setImage}
		/>
	);
};

export default UpdateProductPage;
