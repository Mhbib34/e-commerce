import { useState } from "react";

export const useProductForm = () => {
	const [products, setProducts] = useState({
		name: "",
		price: "",
		stock: "",
		brand: "",
		description: "",
		categoryName: "",
		image: null as File | null,
	});

	const resetForm = () => {
		setProducts({
			name: "",
			price: "",
			stock: "",
			brand: "",
			description: "",
			categoryName: "",
			image: null,
		});
	};

	const setField = <T extends keyof typeof products>(
		field: T,
		value: (typeof products)[T]
	) => {
		setProducts((prev) => ({ ...prev, [field]: value }));
	};

	// Individual setters for easier use
	const setName = (value: string) => setField("name", value);
	const setPrice = (value: string) => setField("price", value);
	const setStock = (value: string) => setField("stock", value);
	const setBrand = (value: string) => setField("brand", value);
	const setDescription = (value: string) => setField("description", value);
	const setCategoryName = (value: string) => setField("categoryName", value);
	const setImage = (value: File | null) => setField("image", value);

	return {
		...products,
		setProducts,
		resetForm,
		setField,
		setName,
		setPrice,
		setStock,
		setBrand,
		setDescription,
		setCategoryName,
		setImage,
	};
};
