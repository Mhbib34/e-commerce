import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import useProductStore from "@/stores/productStores";

export const useProducts = () => {
	const { products, setProducts, removeProduct } = useProductStore();
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

	return { products, loading, error, deleteProduct };
};
