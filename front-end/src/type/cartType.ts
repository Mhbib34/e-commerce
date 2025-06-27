import { Product } from "./productType";
import { User } from "./userType";

export type Cart = {
	id: string;
	userId: string;
	productId: string;
	quantity: number;
	user: User;
	product: Product;
};
