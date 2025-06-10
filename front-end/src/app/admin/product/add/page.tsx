"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axiosInstance from "@/lib/axiosInstance";

const AddProductPage = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !price || !stock || !description || !category || !image) {
			toast.warn("Please fill in all fields.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("price", price);
			formData.append("stock", stock);
			formData.append("description", description);
			formData.append("category", category);
			formData.append("image", image);

			const response = await axiosInstance.post("/product", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success(`${response.data.message} 🎉`);
		} catch (error) {
			const err = error as AxiosError<{ errors?: string }>;
			const errorMessage =
				err.response?.data?.errors ||
				"Failed to add product. Please try again.";
			toast.error(errorMessage);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-zinc-950 px-4 py-10">
			<Form
				onSubmit={handleSubmit}
				title="Product"
				linkPage="/admin/product"
				textLink="Add Product"
				buttonText="Add Product"
				image={imagesForm.p6}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
					<Input
						type="text"
						text="Product Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Product Name"
					/>
					<Input
						type="number"
						text="Product Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Product Price"
					/>
					<Input
						type="number"
						text="Product Stock"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						placeholder="Product Stock"
					/>
					<Input
						type="text"
						text="Product Category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						placeholder="Product Category"
					/>
				</div>

				<div className="mt-4 w-full">
					<label htmlFor="description">Product Description</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Product Description"
						className="w-full p-2 border border-black rounded-md mt-1"
					/>
				</div>

				<div className="w-full">
					<label className="block text-sm mb-1">Product Image</label>
					<input
						type="file"
						accept="image/*"
						className="block w-full text-sm  border border-black rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white transition file:cursor-pointer"
						onChange={(e) => {
							if (e.target.files?.[0])
								setImage(e.target.files[0]);
						}}
					/>
				</div>
			</Form>
		</div>
	);
};

export default AddProductPage;
