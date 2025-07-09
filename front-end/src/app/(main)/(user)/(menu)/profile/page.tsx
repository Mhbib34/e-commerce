"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import PersonalTab from "./components/PersonalTab";
import SecurityTab from "./components/SecurityTab";
import PrefencesTab from "./components/PrefencesTab";
import Header from "./components/Header";
import { containerVariants, itemVariants } from "@/utils/variants";
import NavigationsTab from "./components/NavigationsTab";

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
				{user && (
					<Header
						user={user}
						setIsEditing={setIsEditing}
						isEditing={isEditing}
					/>
				)}

				{/* Navigation Tabs */}
				<NavigationsTab
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				{/* Content */}
				<motion.div
					variants={itemVariants}
					className="bg-white rounded-2xl shadow-lg"
				>
					{activeTab === "personal" && user && (
						<PersonalTab
							user={user}
							isEditing={isEditing}
							setIsEditing={setIsEditing}
							name={name}
							setName={setName}
							email={email}
							setEmail={setEmail}
							username={username}
							setUsername={setUsername}
							handleUpdateUser={handleUpdateUser}
						/>
					)}

					{activeTab === "security" && (
						<SecurityTab
							currentPassword={currentPassword}
							setCurrentPassword={setCurrentPassword}
							newPassword={newPassword}
							setNewPassword={setNewPassword}
							confirmPassword={confirmPassword}
							setConfirmPassword={setConfirmPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
							handleUpdateUserPassword={handleUpdateUserPassword}
						/>
					)}

					{activeTab === "preferences" && <PrefencesTab />}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ProfileManagementPage;
