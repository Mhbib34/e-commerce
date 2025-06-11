import { create } from "zustand";

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
};

type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
	removeProduct: (id: string) => void;
};

const useProductStore = create<ProductStore>((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	removeProduct: (id: string) =>
		set((state) => ({
			products: state.products.filter((product) => product.id !== id),
		})),
}));

export default useProductStore;
