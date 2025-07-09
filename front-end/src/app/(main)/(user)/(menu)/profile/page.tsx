"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
	User,
	Mail,
	// Calendar,
	// MapPin,
	// Camera,
	Edit3,
	Save,
	X,
	Shield,
	Key,
	// Bell,
	Globe,
	Eye,
	EyeOff,
	UserCircleIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ProfileManagementPage = () => {
	const { user, updateUser, updateUserPassword } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [activeTab, setActiveTab] = useState("personal");
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [username, setUsername] = useState(user?.username || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const tabs = [
		{ id: "personal", label: "Personal Info", icon: User },
		{ id: "security", label: "Security", icon: Shield },
		{ id: "preferences", label: "Preferences", icon: Globe },
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
	};

	const handleUpdateUser = async () => {
		try {
			const res = await updateUser({
				name,
				email,
				username,
			});
			console.log(res);
			setIsEditing(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateUserPassword = async () => {
		try {
			const res = await updateUserPassword({
				currentPassword,
				newPassword,
				confirmPassword,
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className=" px-4 mt-10">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-4xl mx-auto"
			>
				{/* Header */}
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
									<p className="text-black mt-1">
										{user?.email}
									</p>
								</div>
							</div>
							<div>
								<button
									onClick={() => setIsEditing(!isEditing)}
									className="bg-black cursor-pointer bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center space-x-2 "
								>
									{isEditing ? (
										<X size={16} />
									) : (
										<Edit3 size={16} />
									)}
									<span>
										{isEditing ? "Cancel" : "Edit Profile"}
									</span>
								</button>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Navigation Tabs */}
				<motion.div
					variants={itemVariants}
					className="bg-white rounded-2xl shadow-lg mb-6"
				>
					<div className="flex md:flex-row flex-col border-b border-gray-200">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
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

				{/* Content */}
				<motion.div
					variants={itemVariants}
					className="bg-white rounded-2xl shadow-lg"
				>
					{activeTab === "personal" && (
						<div className="p-6">
							<h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
								<User size={20} />
								<span>Personal Information</span>
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full Name
									</label>
									<div
										className={`flex gap-2 items-center px-4 py-3 border border-gray-300 rounded-lg ${
											!isEditing &&
											"bg-gray-50 text-gray-500"
										}`}
									>
										<User className="text-gray-400" />
										<input
											type="text"
											value={
												isEditing ? name : user?.name
											}
											onChange={(e) =>
												setName(e.target.value)
											}
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
											!isEditing &&
											"bg-gray-50 text-gray-500"
										}`}
									>
										<Mail
											className=" text-gray-400"
											size={18}
										/>
										<input
											type="email"
											value={
												isEditing ? email : user?.email
											}
											onChange={(e) =>
												setEmail(e.target.value)
											}
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
											!isEditing &&
											"bg-gray-50 text-gray-500"
										}`}
									>
										<UserCircleIcon
											className=" text-gray-400"
											size={18}
										/>
										<input
											type="tel"
											value={
												isEditing
													? username
													: user?.username
											}
											onChange={(e) =>
												setUsername(e.target.value)
											}
											disabled={!isEditing}
											className="focus:outline-none w-full"
										/>
									</div>
								</div>

								{/* <div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Birth Date
									</label>
									<div className="relative">
										<Calendar
											className="absolute left-3 top-3 text-gray-400"
											size={18}
										/>
										<input
											type="date"
											value={formData.birthDate}
											onChange={(e) =>
												handleInputChange(
													"birthDate",
													e.target.value
												)
											}
											disabled={!isEditing}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
										/>
									</div>
								</div> */}

								{/* <div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Gender
									</label>
									<select
										value={formData.gender}
										onChange={(e) =>
											handleInputChange(
												"gender",
												e.target.value
											)
										}
										disabled={!isEditing}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div> */}
							</div>

							{/* <div className="mt-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Address
								</label>
								<div className="relative">
									<MapPin
										className="absolute left-3 top-3 text-gray-400"
										size={18}
									/>
									<textarea
										value={formData.address}
										onChange={(e) =>
											handleInputChange(
												"address",
												e.target.value
											)
										}
										disabled={!isEditing}
										rows={3}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
									/>
								</div>
							</div> */}

							{/* <div className="mt-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Bio
								</label>
								<textarea
									value={formData.bio}
									onChange={(e) =>
										handleInputChange("bio", e.target.value)
									}
									disabled={!isEditing}
									rows={4}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
									placeholder="Tell us about yourself..."
								/>
							</div> */}

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
					)}

					{activeTab === "security" && (
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
											type={
												showPassword
													? "text"
													: "password"
											}
											value={currentPassword}
											onChange={(e) =>
												setCurrentPassword(
													e.target.value
												)
											}
											className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Enter current password"
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
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
											type={
												showPassword
													? "text"
													: "password"
											}
											value={newPassword}
											onChange={(e) =>
												setNewPassword(e.target.value)
											}
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
											type={
												showPassword
													? "text"
													: "password"
											}
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value
												)
											}
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
										<li>
											• Contains uppercase and lowercase
											letters
										</li>
										<li>• Contains at least one number</li>
										<li>
											• Contains at least one special
											character
										</li>
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
					)}

					{activeTab === "preferences" && (
						<div className="p-6">
							<h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
								<Globe size={20} />
								<span>Preferences</span>
							</h2>

							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Language
									</label>
									<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
										<option value="en">English</option>
										<option value="id">
											Bahasa Indonesia
										</option>
										<option value="zh">中文</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Currency
									</label>
									<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
										<option value="idr">
											Indonesian Rupiah (IDR)
										</option>
										<option value="usd">
											US Dollar (USD)
										</option>
										<option value="sgd">
											Singapore Dollar (SGD)
										</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Time Zone
									</label>
									<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
										<option value="asia/jakarta">
											Asia/Jakarta (WIB)
										</option>
										<option value="asia/makassar">
											Asia/Makassar (WITA)
										</option>
										<option value="asia/jayapura">
											Asia/Jayapura (WIT)
										</option>
									</select>
								</div>
							</div>
						</div>
					)}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ProfileManagementPage;
