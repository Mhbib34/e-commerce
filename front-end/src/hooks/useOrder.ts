import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { Order, OrderData, OrderProps } from "@/type/orderType";
import { showError, showSuccess } from "@/lib/tasterHelper";
import { AxiosError } from "axios";
import { useCart } from "@/context/CartContext";

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

	const { fetchCartItems } = useCart();
	// Main fetch function that can be called with different parameters
	const fetchOrders = useCallback(
		async (currentPage: number = page, currentLimit: number = limit) => {
			if (!isAuthenticated) return;

			setLoading(true);
			setError(null);

			try {
				// Fetch paginated orders for the table
				const pageOrderRes = await axiosInstance.get(
					`/order/page?page=${currentPage}&limit=${currentLimit}`
				);

				// Fetch all orders for search functionality and total revenue
				const allOrderRes = await axiosInstance.get("/order/list");

				// Set paginated orders
				setOrderPage(pageOrderRes.data.order.data || []);

				// Set total count from pagination response
				// Assuming the API returns totalItems or totalCount
				const totalItems =
					pageOrderRes.data.order.totalItems ||
					pageOrderRes.data.order.total ||
					pageOrderRes.data.order.count ||
					0;
				setTotal(totalItems);

				// Set all orders for search functionality
				setAllOrder(allOrderRes.data.order || []);

				// Calculate total revenue from all orders
				const sumTotalRevenue = (allOrderRes.data.order || []).reduce(
					(total: number, order: Order) => total + (order.total || 0),
					0
				);
				setTotalRevenue(sumTotalRevenue);
				//eslint-disable-next-line
			} catch (error: any) {
				console.error("Error fetching orders:", error);
				setError(
					error?.response?.data?.message || "Failed to fetch orders"
				);

				// Reset states on error
				setOrderPage([]);
				setAllOrder([]);
				setTotal(0);
				setTotalRevenue(0);
			} finally {
				setLoading(false);
			}
		},
		[isAuthenticated, page, limit]
	);

	// Legacy fetch function for backward compatibility
	const fetchOrder = useCallback(async () => {
		if (!isAuthenticated) return;

		setLoading(true);
		setError(null);

		try {
			// Use Promise.all for concurrent requests to improve performance
			const [orderRes, allOrderRes, pageOrderRes] = await Promise.all([
				axiosInstance
					.get("/order")
					.catch(() => ({ data: { order: [] } })), // Make this optional
				axiosInstance.get("/order/list"),
				axiosInstance.get(`/order/page?page=${page}&limit=${limit}`),
			]);

			// Set individual user orders (if applicable)
			setOrder(orderRes.data.order || []);

			// Set all orders for search functionality
			const sortedAllOrders = (allOrderRes.data.order || []).sort(
				(a: Order, b: Order) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			);
			setAllOrder(sortedAllOrders);

			// Calculate total revenue
			const sumTotalRevenue = (allOrderRes.data.order || []).reduce(
				(total: number, order: Order) => total + (order.total || 0),
				0
			);
			setTotalRevenue(sumTotalRevenue);

			// Set paginated orders
			const sortedPageOrders = (pageOrderRes.data.order.data || []).sort(
				(a: Order, b: Order) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			);
			setOrderPage(sortedPageOrders);
			console.log(sortedPageOrders);

			// Set total - this should be total items, not total pages
			const totalItems =
				pageOrderRes.data.order.totalItems ||
				pageOrderRes.data.order.total ||
				pageOrderRes.data.order.count ||
				0;
			setTotal(totalItems);
			//eslint-disable-next-line
		} catch (error: any) {
			console.error("Error fetching orders:", error);
			setError(
				error?.response?.data?.message || "Failed to fetch orders"
			);

			// Reset states on error
			setOrder([]);
			setOrderPage([]);
			setAllOrder([]);
			setTotal(0);
			setTotalRevenue(0);
		} finally {
			setLoading(false);
		}
	}, [isAuthenticated, page, limit]);

	const fetchOrderByUserId = async (userId: string) => {
		try {
			const res = await axiosInstance.get(`/order/user/${userId}`);
			return res.data.order;
		} catch (err) {
			console.error(err);
		}
	};

	const createOrder = async () => {
		try {
			const res = await axiosInstance.post("/order");
			showSuccess(res.data.message);
			fetchCartItems();
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				showError(error.response.data.errors);
			} else {
				showError(
					error.response?.data?.errors || "Create order failed."
				);
				console.log(error);
			}
		}
	};

	const createOrderByCartId = async (cartId: string) => {
		try {
			const res = await axiosInstance.post(`/order/cart/${cartId}`);
			showSuccess(res.data.message);
			fetchCartItems();
		} catch (err) {
			const error = err as AxiosError<{ errors: string }>;
			if (error.response?.status === 401) {
				showError(error.response.data.errors);
			} else {
				showError(
					error.response?.data?.errors || "Create order failed."
				);
				console.log(error);
			}
		}
	};

	const fetchUserOrders = async () => {
		try {
			const res = await axiosInstance.get("/order");
			console.log(res.data.order);
			return res.data.order;
		} catch (error) {
			console.log(error);
		}
	};
	return {
		order,
		loading,
		error,
		allOrder,
		totalRevenue,
		orderPage,
		total,
		refetch: fetchOrder,
		fetchOrders, // New function for manual pagination
		fetchOrderByUserId,
		createOrder,
		createOrderByCartId,
		fetchUserOrders,
	};
};
