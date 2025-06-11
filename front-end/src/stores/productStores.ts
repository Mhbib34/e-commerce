import { create } from "zustand";

type Product = {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
};

type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
};

const useProductStore = create<ProductStore>((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
}));

export default useProductStore;
