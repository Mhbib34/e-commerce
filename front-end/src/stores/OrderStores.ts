type OrderProduct = {
	id: string;
	name: string;
};

type OrderItem = {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	price: number;
	product: OrderProduct;
};

export type Order = {
	id: string;
	userId: string;
	total: number;
	status: string;
	createdAt: string;
	orderItems: OrderItem[];
	user: OrderProduct;
};
