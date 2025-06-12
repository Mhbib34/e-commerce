"use client";
import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import LoadingSpinner from "@/components/fragment/Loading";
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
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const fetchedProduct = await getProductById(id);
				setProduct(fetchedProduct);
				setName(fetchedProduct.name);
				setPrice(fetchedProduct.price.toString());
				setStock(fetchedProduct.stock.toString());
				setCategoryName(fetchedProduct.category.name);
				setDescription(fetchedProduct.description);
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
				"Failed to add product. Please try again.";
			showError(errorMessage);
			console.log(errorMessage);
		}
	};

	if (!product) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-white px-4 py-10">
			<Form
				onSubmit={handleUpdate}
				title="Product"
				linkPage="/admin/product"
				textLink="Update Product"
				buttonText="Update Product"
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
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
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

export default UpdateProductPage;
