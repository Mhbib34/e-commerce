import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/stores/OrderStores";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useOrder = () => {
	const [order, setOrder] = useState<Order[]>([]);
	const [allOrder, setAllOrder] = useState<Order[]>([]);
	const [totalRevenue, setTotalRevenue] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			const fetchOrder = async () => {
				setLoading(true);
				try {
					const res = await axiosInstance.get("/order");
					const allOrder = await axiosInstance.get("/order/list");
					setAllOrder(allOrder.data.order);
					console.log(allOrder);
					const sumTotalRevenue = allOrder.data.order.reduce(
						(total: number, order: Order) => total + order.total,
						0
					);
					setTotalRevenue(sumTotalRevenue);
					setOrder(res.data.order);
				} catch (error) {
					console.error(error);
					setError("Failed to fetch products");
				} finally {
					setLoading(false);
				}
			};
			fetchOrder();
		}
	}, []);

	return { order, loading, error, allOrder, totalRevenue };
};
