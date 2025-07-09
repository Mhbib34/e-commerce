import { Eye, EyeOff, Key, Shield } from "lucide-react";
import React from "react";

type Props = {
	currentPassword: string;
	setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
	newPassword: string;
	setNewPassword: React.Dispatch<React.SetStateAction<string>>;
	confirmPassword: string;
	setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	handleUpdateUserPassword: () => Promise<void>;
};

const SecurityTab = ({
	currentPassword,
	setCurrentPassword,
	newPassword,
	setNewPassword,
	confirmPassword,
	setConfirmPassword,
	showPassword,
	setShowPassword,
	handleUpdateUserPassword,
}: Props) => {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
				<Shield size={20} />
				<span>Security Settings</span>
			</h2>

			<div className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Current Password
					</label>
					<div className="relative">
						<Key
							className="absolute left-3 top-3 text-gray-400"
							size={18}
						/>
						<input
							type={showPassword ? "text" : "password"}
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter current password"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
						>
							{showPassword ? (
								<EyeOff size={18} />
							) : (
								<Eye size={18} />
							)}
						</button>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						New Password
					</label>
					<div className="relative">
						<Key
							className="absolute left-3 top-3 text-gray-400"
							size={18}
						/>
						<input
							type={showPassword ? "text" : "password"}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter new password"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Confirm New Password
					</label>
					<div className="relative">
						<Key
							className="absolute left-3 top-3 text-gray-400"
							size={18}
						/>
						<input
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Confirm new password"
						/>
					</div>
				</div>

				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
					<h3 className="font-medium text-yellow-800 mb-2">
						Password Requirements
					</h3>
					<ul className="text-sm text-yellow-700 space-y-1">
						<li>• At least 8 characters long</li>
						<li>• Contains uppercase and lowercase letters</li>
						<li>• Contains at least one number</li>
						<li>• Contains at least one special character</li>
					</ul>
				</div>

				<button
					onClick={handleUpdateUserPassword}
					className="w-full bg-black text-white py-3 rounded-lg  transition-colors"
				>
					Update Password
				</button>
			</div>
		</div>
	);
};

export default SecurityTab;
