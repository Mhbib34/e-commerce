import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/stores/OrderStores";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

type OrderProps = {
	page?: number;
	limit?: number;
};

type OrderData = {
	order: Order[];
	allOrder: Order[];
	totalRevenue: number;
	loading: boolean;
	total: number;
	orderPage: Order[];
	error: string | null;
	refetch: () => Promise<void>;
};

export const useOrder = ({
	page = 1,
	limit = 5,
}: OrderProps = {}): OrderData => {
	const [order, setOrder] = useState<Order[]>([]);
	const [allOrder, setAllOrder] = useState<Order[]>([]);
	const [totalRevenue, setTotalRevenue] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState<number>(0);
	const [orderPage, setOrderPage] = useState<Order[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { isAuthenticated } = useAuth();

	const fetchOrder = useCallback(async () => {
		if (!isAuthenticated) return;

		setLoading(true);
		setError(null);

		try {
			// Use Promise.all for concurrent requests to improve performance
			const [orderRes, allOrderRes, pageOrderRes] = await Promise.all([
				axiosInstance.get("/order"),
				axiosInstance.get("/order/list"),
				axiosInstance.get(`/order/page?page=${page}&limit=${limit}`),
			]);

			setOrder(orderRes.data.order);
			setAllOrder(allOrderRes.data.order);

			// Calculate total revenue
			const sumTotalRevenue = allOrderRes.data.order.reduce(
				(total: number, order: Order) => total + order.total,
				0
			);
			setTotalRevenue(sumTotalRevenue);

			setOrderPage(pageOrderRes.data.order.data);
			setTotal(pageOrderRes.data.order.totalPages);
		} catch (error) {
			console.error("Error fetching orders:", error);
			setError("Failed to fetch orders");
		} finally {
			setLoading(false);
		}
	}, [isAuthenticated, page, limit]);

	useEffect(() => {
		fetchOrder();
	}, [fetchOrder]);

	return {
		order,
		loading,
		error,
		allOrder,
		totalRevenue,
		orderPage,
		total,
		refetch: fetchOrder,
	};
};
