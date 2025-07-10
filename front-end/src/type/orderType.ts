import { Product } from "./productType";
import { User } from "./userType";

type OrderItem = {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	price: number;
	product: Product;
};

export type Order = {
	id: string;
	userId: string;
	total: number;
	status: string;
	createdAt: string;
	orderItems: OrderItem[];
	user: User;
};

export type OrderProps = {
	page?: number;
	limit?: number;
};

export type OrderData = {
	order: Order[];
	allOrder: Order[];
	totalRevenue: number;
	loading: boolean;
	total: number;
	orderPage: Order[];
	error: string | null;
	refetch: () => Promise<void>;
	fetchOrders: (page: number, limit: number) => Promise<void>;
	fetchOrderByUserId: (userId: string) => Promise<Order[]>;
	createOrder: () => Promise<void>;
	createOrderByCartId: (id: string) => Promise<void>;
	fetchUserOrders: () => Promise<Order[]>;
};
