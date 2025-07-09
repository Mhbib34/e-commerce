import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "@/utils/variants";
import { User } from "@/type/userType";
import { Edit3, X } from "lucide-react";

type Props = {
	user: User;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	isEditing: boolean;
};

const Header = ({ user, setIsEditing, isEditing }: Props) => {
	return (
		<motion.div
			variants={itemVariants}
			className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden border-gray-200 border-2"
		>
			<div className="px-6 py-8 text-white">
				<div className="flex gap-10 md:items-center md:space-x-6 space-x-0 flex-col md:flex-row md:justify-between">
					<div className="flex items-center gap-2">
						<div className="relative">
							<div className="w-24 h-24 bg-gradient-to-r from-red-600 to-purple-600 bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold ">
								{user?.name?.charAt(0)}
							</div>
						</div>
						<div className="flex-1">
							<h1 className="md:text-3xl text-xl font-bold text-black">
								{user?.name}
							</h1>
							<p className="text-black mt-1">{user?.email}</p>
						</div>
					</div>
					<div>
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-black cursor-pointer bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center space-x-2 "
						>
							{isEditing ? <X size={16} /> : <Edit3 size={16} />}
							<span>{isEditing ? "Cancel" : "Edit Profile"}</span>
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Header;
