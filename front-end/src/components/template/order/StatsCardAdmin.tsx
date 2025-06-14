import React, { useEffect } from "react";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";

type StatCardProps = {
	title: string;
	value: number;
	icon: React.ElementType;
	isRevenue?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	icon: Icon,
	isRevenue = false,
}) => {
	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<p className="text-2xl font-bold text-gray-900 mt-2">
						{isRevenue
							? `Rp ${value.toLocaleString("id-ID")}`
							: value.toLocaleString("id-ID")}
					</p>
				</div>
				<div className="p-3 bg-blue-50 rounded-full">
					<Icon className="h-6 w-6 text-blue-600" />
				</div>
			</div>
		</div>
	);
};

const StatsCardAdmin = () => {
	const { nonAdminUsers } = useAuth();
	const { order, totalRevenue } = useOrder();
	const { allProducts, getAllProducts } = useProducts();

	useEffect(() => {
		getAllProducts();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCard
				title="Total Revenue"
				value={totalRevenue}
				icon={DollarSign}
				isRevenue={true}
			/>
			<StatCard
				title="Total Orders"
				value={order.length}
				icon={ShoppingCart}
			/>
			<StatCard
				title="Total Products"
				value={allProducts.length}
				icon={Package}
			/>
			<StatCard
				title="Total Customers"
				value={nonAdminUsers.length}
				icon={Users}
			/>
		</div>
	);
};

export default StatsCardAdmin;
