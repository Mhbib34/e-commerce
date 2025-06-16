import { Category } from "./categoryType";

export type Product = {
	id: string;
	name: string;
	description: string;
	brand: string;
	price: number;
	stock: number;
	category: Category;
};

export type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
	removeProduct: (id: string) => void;
	updateProductStore: (id: string, product: Product) => void;
};

export type UseProductsPagination = {
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
