import { create } from "zustand";

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	categoryName: string;
};

type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
	removeProduct: (id: string) => void;
	updateProductStore: (id: string, product: Product) => void;
};

const useProductStore = create<ProductStore>((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	removeProduct: (id: string) =>
		set((state) => ({
			products: state.products.filter((product) => product.id !== id),
		})),
	updateProductStore: (id: string, product: Product) =>
		set((state) => ({
			products: state.products.map((p) => (p.id === id ? product : p)),
		})),
}));

export default useProductStore;
