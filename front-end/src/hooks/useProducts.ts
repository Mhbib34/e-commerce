import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import useProductStore from "@/stores/productStores";

export const useProducts = () => {
	const { products, setProducts, removeProduct, updateProductStore } =
		useProductStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			if (useProductStore.getState().products.length > 0) return;
			setLoading(true);
			try {
				const res = await axiosInstance.get("/product/list");
				setProducts(res.data.product);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
		//eslint-disable-next-line
	}, []);

	const deleteProduct = async (id: string) => {
		try {
			await axiosInstance.delete(`/product/${id}`);
			removeProduct(id);
		} catch (err) {
			console.error(err);
			setError("Failed to delete product");
		}
	};

	const updateProduct = async (id: string, data: FormData) => {
		try {
			const isFormData = data instanceof FormData;

			const res = await axiosInstance.patch(`/product/${id}`, data, {
				headers: {
					"Content-Type": isFormData
						? "multipart/form-data"
						: "application/json",
				},
			});
			updateProductStore(id, res.data.product);
			const refreshedProduct = await axiosInstance.get(`/product/list`);
			setProducts(refreshedProduct.data.product);
			return res.data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to update product");
		}
	};

	const getProductById = async (id: string) => {
		try {
			const res = await axiosInstance.get(`/product/${id}`);
			return res.data.product;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to fetch product");
		}
	};
	return {
		products,
		loading,
		error,
		deleteProduct,
		updateProduct,
		getProductById,
	};
};
