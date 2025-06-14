import Button from "@/components/common/Button";
import { Eye, Plus, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const QuickActions = () => {
	const router = useRouter();
	return (
		<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">
					Quick Actions
				</h3>
			</div>
			<div className="p-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Button
						onClick={() => router.push("/admin/product/add")}
						className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
					>
						<Plus className="h-8 w-8 text-blue-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Add Product
						</span>
					</Button>
					<Button className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
						<Eye className="h-8 w-8 text-green-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							View Orders
						</span>
					</Button>
					<Button className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
						<Users className="h-8 w-8 text-purple-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Manage Users
						</span>
					</Button>
					<Button className="flex flex-col items-center p-4 border border-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
						<TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
						<span className="text-sm font-medium text-gray-900">
							Analytics
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default QuickActions;
