import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

export const getStatusColor = (status: string) => {
	switch (status) {
		case "Pending":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "Processing":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "Shipped":
			return "bg-purple-100 text-purple-800 border-purple-200";
		case "Delivered":
			return "bg-green-100 text-green-800 border-green-200";
		case "Cancelled":
			return "bg-red-100 text-red-800 border-red-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const getStatusIcon = (status: string) => {
	switch (status) {
		case "Delivered":
			return <CheckCircle className="w-4 h-4" />;
		case "Shipped":
			return <Truck className="w-4 h-4" />;
		case "Processing":
			return <Clock className="w-4 h-4" />;
		case "Pending":
			return <Clock className="w-4 h-4" />;
		case "Cancelled":
			return <XCircle className="w-4 h-4" />;
		default:
			return <Package className="w-4 h-4" />;
	}
};
