"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Cart } from "@/type/cartType";
import { showError } from "@/lib/tasterHelper";
import { AxiosError } from "axios";

// Tipe respons addToCart
interface AddToCartResponse {
	success: true;
	data: {
		message: string;
		item: Cart;
	};
}

interface AddToCartError {
	success: false;
	error: Error;
}

// Tipe context yang disediakan
interface CartContextType {
	cartItems: Cart[];
	cartCount: number;
	loading: boolean;
	addToCart: (
		productId: string,
		quantity?: number
	) => Promise<AddToCartResponse | AddToCartError>;
	removeFromCart: (productId: string) => Promise<void>;
	updateQuantity: (productId: string, quantity: number) => Promise<void>;
	fetchCartItems: () => Promise<void>;
}

// Inisialisasi context
const CartContext = createContext<CartContextType | null>(null);

// Hook untuk akses context
export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<Cart[]>([]);
	const [cartCount, setCartCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchCartItems = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(`/cart`);
			const items = response.data.cart ?? [];
			setCartItems(items);

			const total = items.length;
			setCartCount(total);
		} catch (error) {
			console.error("Failed to fetch cart items:", error);
			setCartItems([]);
			setCartCount(0);
		} finally {
			setLoading(false);
		}
	};

	const addToCart = async (
		productId: string,
		quantity: number = 1
	): Promise<AddToCartResponse | AddToCartError> => {
		try {
			setLoading(true);
			const response = await axiosInstance.post<{
				message: string;
				item: Cart;
			}>("/cart", { productId, quantity });

			await fetchCartItems();

			return {
				success: true,
				data: response.data,
			};
		} catch (err) {
			if (err instanceof Error) {
				return { success: false, error: err };
			}
			return {
				success: false,
				error: new Error("Unknown error occurred"),
			};
		} finally {
			setLoading(false);
		}
	};

	const removeFromCart = async (cartItemId: string): Promise<void> => {
		try {
			await axiosInstance.delete(`/cart/${cartItemId}`);
			await fetchCartItems();
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				showError(error.response.data.errors);
			} else {
				showError(
					error.response?.data?.errors || "Update quantity failed."
				);
				console.log(error);
			}
		}
	};

	const updateQuantity = async (
		cartItemId: string,
		quantity: number
	): Promise<void> => {
		try {
			await axiosInstance.patch(`/cart/${cartItemId}`, { quantity });
			await fetchCartItems();
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				showError(error.response.data.errors);
			} else {
				showError(
					error.response?.data?.errors || "Update quantity failed."
				);
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchCartItems();
	}, []);

	const value: CartContextType = {
		cartItems,
		cartCount,
		loading,
		addToCart,
		removeFromCart,
		updateQuantity,
		fetchCartItems,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
