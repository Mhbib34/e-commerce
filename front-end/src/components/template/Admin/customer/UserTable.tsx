import Button from "@/components/common/Button";
import { showConfirm } from "@/lib/tasterHelper";
import { User } from "@/type/userType";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { FaCheckCircle, FaEye, FaTimesCircle, FaTrash } from "react-icons/fa";

type props = {
	isLoading: boolean;
	searching: boolean;
	finalDisplayedUsers: User[];
	isSearchMode: boolean;
	userTotalSpent: { [userId: string]: number };
	handleViewUser: (userId: string) => void;
	handleDelete: (userId: string) => void;
};

const UserTable: React.FC<props> = ({
	isLoading,
	searching,
	finalDisplayedUsers,
	isSearchMode,
	userTotalSpent,
	handleViewUser,
	handleDelete,
}) => {
	return (
		<div className="bg-white shadow-md rounded-lg overflow-auto">
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Email
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Username
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Verified
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total Spent
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{isLoading || searching ? (
						<tr>
							<td colSpan={6} className="text-center py-4">
								Loading...
							</td>
						</tr>
					) : finalDisplayedUsers.length === 0 ? (
						<tr>
							<td colSpan={6} className="text-center py-4">
								{isSearchMode
									? "No customers found matching your search criteria"
									: "No customers found"}
							</td>
						</tr>
					) : (
						finalDisplayedUsers.map((customer) => (
							<tr key={customer.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									{customer.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{customer.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{customer.username}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{customer.isAccountVerified ? (
										<FaCheckCircle className="text-green-500" />
									) : (
										<FaTimesCircle className="text-red-500" />
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{userTotalSpent[customer.id] !== undefined
										? formatCurrency(
												userTotalSpent[customer.id]
										  )
										: "Loading..."}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<Button
										onClick={() =>
											handleViewUser(customer.id)
										}
										className="text-green-600 hover:text-green-800 mr-4"
										title="View"
									>
										<FaEye />
									</Button>
									<Button
										title="Delete"
										onClick={() =>
											showConfirm(
												"Are you sure you want to delete this customer?",
												customer.name,
												() => handleDelete(customer.id)
											)
										}
										className="text-red-600 hover:text-red-800"
									>
										<FaTrash />
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
