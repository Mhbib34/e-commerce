import { Product, ProductStore } from "@/type/productType";
import { create } from "zustand";

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
