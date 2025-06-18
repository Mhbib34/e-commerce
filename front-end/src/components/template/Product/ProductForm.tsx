// components/form/ProductForm.tsx
import React from "react";
import Input from "../../common/Input";
import Form from "../../fragment/Form";
import { imagesForm } from "@/assets/assets";
import { StaticImageData } from "next/image";

type ProductFormProps = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	title?: string;
	textLink: string;
	linkPage: string;
	buttonText: string;
	image?: StaticImageData;

	// input states
	name: string;
	price: string;
	stock: string;
	categoryName: string;
	brand: string;
	description: string;

	// input handlers
	setName: (val: string) => void;
	setPrice: (val: string) => void;
	setStock: (val: string) => void;
	setCategoryName: (val: string) => void;
	setBrand: (val: string) => void;
	setDescription: (val: string) => void;
	setImageFile: (file: File) => void;
};

const ProductForm = ({
	onSubmit,
	title = "Product",
	textLink,
	linkPage,
	buttonText,
	image = imagesForm.p6,

	name,
	price,
	stock,
	categoryName,
	brand,
	description,

	setName,
	setPrice,
	setStock,
	setCategoryName,
	setBrand,
	setDescription,
	setImageFile,
}: ProductFormProps) => {
	return (
		<div className="flex justify-center items-center min-h-screen bg-white px-4 py-10">
			<Form
				onSubmit={onSubmit}
				title={title}
				linkPage={linkPage}
				textLink={textLink}
				buttonText={buttonText}
				image={image}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
					<Input
						type="text"
						text="Product Name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Product Name"
					/>
					<Input
						type="number"
						text="Product Price"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Product Price"
					/>
					<Input
						type="number"
						text="Product Stock"
						name="stock"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						placeholder="Product Stock"
					/>
					<Input
						type="text"
						text="Product Category"
						name="categoryName"
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						placeholder="Product Category"
					/>
				</div>

				<Input
					type="text"
					text="Product Brand"
					value={brand}
					name="brand"
					onChange={(e) => setBrand(e.target.value)}
					placeholder="Product Brand"
				/>

				<div className="mt-4 w-full">
					<label htmlFor="description">Product Description</label>
					<textarea
						id="description"
						value={description}
						name="description"
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
						name="image"
						className="block w-full text-sm border border-black rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white transition file:cursor-pointer"
						onChange={(e) => {
							if (e.target.files?.[0]) {
								setImageFile(e.target.files[0]);
							}
						}}
					/>
				</div>
			</Form>
		</div>
	);
};

export default ProductForm;
