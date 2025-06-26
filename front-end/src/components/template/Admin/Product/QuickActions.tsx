import { Eye, Plus, Users, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const QuickActions = () => {
	return (
		<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">
					Quick Actions
				</h3>
			</div>
			<div className="p-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Link
						href="/admin/product/add"
						className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Plus className="h-8 w-8 text-blue-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Add Product
						</span>
					</Link>
					<Link
						href="/admin/orders"
						className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Eye className="h-8 w-8 text-green-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							View Orders
						</span>
					</Link>
					<Link
						href="/admin/users"
						className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Users className="h-8 w-8 text-purple-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Manage Users
						</span>
					</Link>
					<Link
						href="/admin/settings"
						className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Settings className="h-8 w-8 text-orange-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Settings
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default QuickActions;
