import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import useProductStore from "@/stores/productStores";

export const useProducts = () => {
	const { products, setProducts } = useProductStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			if (products.length > 0) return;
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
	}, [products, setProducts]);

	return { products, loading, error };
};
