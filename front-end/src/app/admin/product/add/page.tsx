"use client";

import React from "react";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { showError, showSuccess, showWarning } from "@/lib/tasterHelper";
import { useProductForm } from "@/hooks/useProductForm";
import ProductForm from "@/components/template/Product/ProductForm";

const AddProductPage = () => {
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
		resetForm,
	} = useProductForm();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!name ||
			!price ||
			!stock ||
			!brand ||
			!description ||
			!categoryName ||
			!image
		) {
			showWarning("Please fill in all required fields.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("price", price);
			formData.append("stock", stock);
			formData.append("brand", brand);
			formData.append("description", description);
			formData.append("categoryName", categoryName);
			formData.append("image", image);

			const response = await axiosInstance.post("/product", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);

			showSuccess("Product added successfully.");
			resetForm();
		} catch (error) {
			const err = error as AxiosError<{ errors?: string }>;
			const errorMessage =
				err.response?.data?.errors ||
				"Failed to add product. Please try again.";
			showError(errorMessage);
			console.log(errorMessage);
		}
	};

	return (
		<ProductForm
			onSubmit={handleSubmit}
			textLink="Add Product"
			linkPage="/admin/product"
			buttonText="Add Product"
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

export default AddProductPage;
