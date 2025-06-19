import Button from "@/components/common/Button";
import { Product } from "@/type/productType";
import { Search } from "lucide-react";

type ProductFormProps = {
	products: Product[];
	search: string;
	setSearch: (value: string) => void;
	handleSearch: () => void;
	selectedCategory: string;
	setSelectedCategory: (value: string) => void;
};

const SearchFilterProduct = ({
	products,
	search,
	setSearch,
	handleSearch,
	selectedCategory,
	setSelectedCategory,
}: ProductFormProps) => {
	const categories = [
		"all",
		...new Set(products.map((p) => p.category.name)),
	];
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 ">
			<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
				{/* Search */}
				<div className=" w-[80%]">
					<div className="relative flex gap-4 items-center w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors">
						<Search className="" />
						<input
							type="search"
							placeholder="Search products..."
							className=" w-full focus:outline-none"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && handleSearch()
							}
						/>
					</div>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-4">
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category === "all"
									? "All Categories"
									: category}
							</option>
						))}
					</select>

					<Button
						onClick={handleSearch}
						className="inline-flex items-center gap-2 border-2 bg-black cursor-pointer hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
					>
						Search
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SearchFilterProduct;
