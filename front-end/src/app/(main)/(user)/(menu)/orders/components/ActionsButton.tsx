import { ChevronRight } from "lucide-react";
import React from "react";

const ActionsButton = () => {
	return (
		<div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
			<div className="flex items-center justify-between">
				<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium">
					See Details
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default ActionsButton;
