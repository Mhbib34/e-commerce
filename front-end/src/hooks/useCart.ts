import axiosInstance from "@/lib/axiosInstance";
import { Cart } from "@/type/cartType";
import { useEffect, useState } from "react";

export const useCart = () => {
	const [cart, setCart] = useState<Cart[] | null>(null);

	const getCart = async () => {
		const res = await axiosInstance.get("/cart");
		setCart(res.data.cart);
	};

	useEffect(() => {
		getCart();
	}, []);

	return { cart };
};
