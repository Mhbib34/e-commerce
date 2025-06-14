import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/stores/productStores";

type UseProductsPagination = {
	products: Product[];
	total: number;
	loading: boolean;
	error: string | null;
	deleteProduct: (id: string) => Promise<void>;
	updateProduct: (id: string, data: FormData) => Promise<Product>;
	getProductById: (id: string) => Promise<Product>;
	getAllProducts: () => Promise<Product[]>;
	allProducts: Product[];
};

export const useProducts = (
	page?: number,
	limit?: number
): UseProductsPagination => {
	const [products, setProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [allProducts, setAllProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const res = await axiosInstance.get(
					`/product/?page=${page}&limit=${limit}`
				);

				setProducts(res.data.product.data);
				setTotal(res.data.product.totalPages);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [page, limit]);

	const deleteProduct = async (id: string) => {
		try {
			await axiosInstance.delete(`/product/${id}`);
			setProducts((prev) => prev.filter((product) => product.id !== id));
		} catch (err) {
			console.error(err);
			setError("Failed to delete product");
		}
	};

	const updateProduct = async (id: string, data: FormData) => {
		try {
			const res = await axiosInstance.patch(`/product/${id}`, data, {
				headers: {
					"Content-Type":
						data instanceof FormData
							? "multipart/form-data"
							: "application/json",
				},
			});
			setProducts((prev) =>
				prev.map((p) => (p.id === id ? res.data.product : p))
			);
			return res.data;
		} catch (err) {
			console.error(err);
			throw new Error("Failed to update product");
		}
	};

	const getProductById = async (id: string) => {
		try {
			const res = await axiosInstance.get(`/product/${id}`);
			return res.data.product;
		} catch (err) {
			console.error(err);
			throw new Error("Failed to fetch product");
		}
	};

	const getAllProducts = async () => {
		try {
			const res = await axiosInstance.get(`/product/list`);
			setAllProducts(res.data.product);
			return res.data.product;
		} catch (err) {
			console.error(err);
			throw new Error("Failed to fetch product");
		}
	};
	return {
		products,
		total,
		loading,
		error,
		deleteProduct,
		updateProduct,
		getProductById,
		getAllProducts,
		allProducts,
	};
};
