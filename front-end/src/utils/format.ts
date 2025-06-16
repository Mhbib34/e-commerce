export const formatDate = (dateString: string) => {
	try {
		return new Date(dateString).toLocaleString("id-ID", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} catch (error) {
		console.error("Error parsing date:", error);
		return "Invalid Date";
	}
};

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
};
