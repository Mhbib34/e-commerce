import { Filter, Search } from "lucide-react";
import React from "react";

type Props = {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	statusFilter: string;
	setStatusFilter: (value: string) => void;
};

const Filters = ({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
}: Props) => {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input
						type="text"
						placeholder="Search for orders..."
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Status Filter */}
				<div className="relative">
					<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<select
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value="all">All Status</option>
						<option value="Pending">Pending</option>
						<option value="Processing">Processing</option>
						<option value="Shipped">Shipped</option>
						<option value="Delivered">Delivered</option>
						<option value="Cancelled">Cancelled</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Filters;
