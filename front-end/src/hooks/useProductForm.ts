// hooks/useProductForm.ts
import { useState } from "react";

export const useProductForm = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [brand, setBrand] = useState("");
	const [description, setDescription] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const [image, setImage] = useState<File | null>(null);

	const resetForm = () => {
		setName("");
		setPrice("");
		setStock("");
		setBrand("");
		setDescription("");
		setCategoryName("");
		setImage(null);
	};

	return {
		name,
		setName,
		price,
		setPrice,
		stock,
		setStock,
		brand,
		setBrand,
		description,
		setDescription,
		categoryName,
		setCategoryName,
		image,
		setImage,
		resetForm,
	};
};
