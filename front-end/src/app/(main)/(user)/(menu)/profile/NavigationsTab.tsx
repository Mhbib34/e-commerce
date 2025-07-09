import { itemVariants } from "@/utils/variants";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Shield, User } from "lucide-react";

type Tab = {
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};
const NavigationsTab = ({ activeTab, setActiveTab }: Tab) => {
	const tabs = [
		{ id: "personal", label: "Personal Info", icon: User },
		{ id: "security", label: "Security", icon: Shield },
		{ id: "preferences", label: "Preferences", icon: Globe },
	];
	return (
		<motion.div
			variants={itemVariants}
			className="bg-white rounded-2xl shadow-lg mb-6"
		>
			<div className="flex md:flex-row flex-col border-b border-gray-200">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors cursor-pointer ${
							activeTab === tab.id
								? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
								: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
						}`}
					>
						<tab.icon size={18} />
						<span className="font-medium">{tab.label}</span>
					</button>
				))}
			</div>
		</motion.div>
	);
};

export default NavigationsTab;
