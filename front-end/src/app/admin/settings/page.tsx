"use client";

import Button from "@/components/common/Button";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/tasterHelper";
import React, { useState } from "react";
import { FaSave, FaUserPlus } from "react-icons/fa";

// Mock API function (replace with your actual API)
const saveSettings = async (settings) => {
	// Simulate saving settings
	console.log("Saving settings:", settings);
	return { success: true };
};

const SettingsPage = () => {
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "ADMIN",
		password: "",
		username: "",
	});

	const [storeSettings, setStoreSettings] = useState({
		storeName: "Velora",
		currency: "IDR",
		taxRate: 10,
	});
	const [notificationSettings, setNotificationSettings] = useState({
		orderEmails: true,
		lowStockAlerts: true,
		customerEmails: false,
	});
	const [isSaving, setIsSaving] = useState(false);

	const handleStoreSettingsChange = (e) => {
		const { name, value } = e.target;
		setStoreSettings((prev) => ({ ...prev, [name]: value }));
	};

	const handleNotificationChange = (e) => {
		const { name, checked } = e.target;
		setNotificationSettings((prev) => ({ ...prev, [name]: checked }));
	};

	const handleNewUserChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setNewUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveSettings = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			await saveSettings({ storeSettings, notificationSettings });
			alert("Settings saved successfully!");
		} catch (error) {
			console.error("Error saving settings:", error);
			alert("Failed to save settings.");
		}
		setIsSaving(false);
	};

	const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`/user/register`, {
				name: newUser.name,
				username: newUser.username,
				email: newUser.email,
				password: newUser.password,
				role: newUser.role,
			});
			console.log(response);
			showSuccess(`${response.data.message} 🎉`);

			setNewUser({
				name: "",
				email: "",
				role: "ADMIN",
				password: "",
				username: "",
			});
		} catch (error) {
			console.error(error);
		}
	};

	console.log(newUser.role);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Store Settings */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">
						Store Settings
					</h2>
					<form onSubmit={handleSaveSettings}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Store Name
							</label>
							<input
								type="text"
								name="storeName"
								value={storeSettings.storeName}
								onChange={handleStoreSettingsChange}
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Currency
							</label>
							<select
								name="currency"
								value={storeSettings.currency}
								onChange={handleStoreSettingsChange}
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="USD">USD</option>
								<option value="IDR">IDR</option>
								<option value="EUR">EUR</option>
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Tax Rate (%)
							</label>
							<input
								type="number"
								name="taxRate"
								value={storeSettings.taxRate}
								onChange={handleStoreSettingsChange}
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							disabled={isSaving}
							className="w-full bg-black cursor-pointer text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border-2 transition-all duration-200 ease-in-out flex items-center justify-center"
						>
							<FaSave className="mr-2" />{" "}
							{isSaving ? "Saving..." : "Save Store Settings"}
						</button>
					</form>
				</div>

				{/* Notification Settings */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">
						Notification Settings
					</h2>
					<form onSubmit={handleSaveSettings}>
						<div className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="orderEmails"
									checked={notificationSettings.orderEmails}
									onChange={handleNotificationChange}
									className="mr-2"
								/>
								<span className="text-sm font-medium text-gray-700">
									Send Order Confirmation Emails
								</span>
							</label>
						</div>
						<div className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="lowStockAlerts"
									checked={
										notificationSettings.lowStockAlerts
									}
									onChange={handleNotificationChange}
									className="mr-2"
								/>
								<span className="text-sm font-medium text-gray-700">
									Low Stock Alerts
								</span>
							</label>
						</div>
						<div className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="customerEmails"
									checked={
										notificationSettings.customerEmails
									}
									onChange={handleNotificationChange}
									className="mr-2"
								/>
								<span className="text-sm font-medium text-gray-700">
									Customer Marketing Emails
								</span>
							</label>
						</div>
						<Button
							disabled={isSaving}
							className="w-full bg-black cursor-pointer text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border-2 transition-all duration-200 ease-in-out flex items-center justify-center"
						>
							<FaSave className="mr-2" />{" "}
							{isSaving
								? "Saving..."
								: "Save Notification Settings"}
						</Button>
					</form>
				</div>

				{/* User Management */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">Add New User</h2>
					<form onSubmit={handleAddUser}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={newUser.name}
								onChange={handleNewUserChange}
								required
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								name="username"
								value={newUser.username}
								onChange={handleNewUserChange}
								required
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={newUser.email}
								onChange={handleNewUserChange}
								required
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={newUser.password}
								onChange={handleNewUserChange}
								required
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Role
							</label>
							<select
								name="role"
								value={newUser.role}
								onChange={handleNewUserChange}
								className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
							>
								<option value="ADMIN">ADMIN</option>
								<option value="USER">USER</option>
							</select>
						</div>
						<Button className="w-full bg-black cursor-pointer text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border-2 transition-all duration-200 ease-in-out flex items-center justify-center">
							<FaUserPlus className="mr-2" /> Add User
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
