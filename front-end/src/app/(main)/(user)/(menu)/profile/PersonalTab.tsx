import { User } from "@/type/userType";
import { Mail, Save, User2, UserCircleIcon } from "lucide-react";
import React from "react";

type Props = {
	user: User;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	handleUpdateUser: () => Promise<void>;
};
const PersonalTab = ({
	user,
	isEditing,
	setIsEditing,
	name,
	setName,
	email,
	setEmail,
	username,
	setUsername,
	handleUpdateUser,
}: Props) => {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
				<User2 size={20} />
				<span>Personal Information</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Full Name
					</label>
					<div
						className={`flex gap-2 items-center px-4 py-3 border border-gray-300 rounded-lg ${
							!isEditing && "bg-gray-50 text-gray-500"
						}`}
					>
						<User2 className="text-gray-400" />
						<input
							type="text"
							value={isEditing ? name : user?.name}
							onChange={(e) => setName(e.target.value)}
							disabled={!isEditing}
							className="focus:outline-none w-full"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Email
					</label>
					<div
						className={`flex gap-2 items-center px-4 py-3 border border-gray-300 rounded-lg ${
							!isEditing && "bg-gray-50 text-gray-500"
						}`}
					>
						<Mail className=" text-gray-400" size={18} />
						<input
							type="email"
							value={isEditing ? email : user?.email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={!isEditing}
							className="focus:outline-none w-full"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Username
					</label>
					<div
						className={`flex gap-2 items-center px-4 py-3 border border-gray-300 rounded-lg ${
							!isEditing && "bg-gray-50 text-gray-500"
						}`}
					>
						<UserCircleIcon className=" text-gray-400" size={18} />
						<input
							type="tel"
							value={isEditing ? username : user?.username}
							onChange={(e) => setUsername(e.target.value)}
							disabled={!isEditing}
							className="focus:outline-none w-full"
						/>
					</div>
				</div>
			</div>

			{isEditing && (
				<div className="mt-6 flex justify-end space-x-3">
					<button
						onClick={() => setIsEditing(false)}
						className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleUpdateUser}
						className="px-6 py-2 bg-black text-white rounded-lg transition-colors flex items-center space-x-2"
					>
						<Save size={16} />
						<span>Save Changes</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default PersonalTab;
