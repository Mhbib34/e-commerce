import { FaSearch } from "react-icons/fa";
import Button from "../common/Button";

type Props = {
	value: string;
	searching: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
	handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
};

const SearchForm: React.FC<Props> = ({
	value,
	onChange,
	searching,
	handleSearch,
	handleKeyPress,
	children,
}: Props) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-6">
			<div className="flex items-center justify-between w-full border-2 border-black px-2 py-1 rounded-md">
				<div className="w-full flex items-center gap-2">
					<FaSearch className="text-black" />
					<input
						type="search"
						placeholder="Search customers..."
						value={value}
						onChange={onChange}
						onKeyPress={handleKeyPress}
						className="w-full focus:outline-none"
					/>
				</div>
				<Button
					onClick={handleSearch}
					className="bg-black px-2 py-1 text-white hover:bg-white transition-all duration-200 ease-in hover:text-black border-2 rounded-md cursor-pointer disabled:opacity-50"
				>
					{searching ? "..." : "Search"}
				</Button>
			</div>
			{children}
		</div>
	);
};

export default SearchForm;
