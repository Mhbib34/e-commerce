"use client";

import { imagesForm } from "@/assets/assets";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();

	return (
		<div className="h-screen flex items-center justify-center">
			{isAuthenticated ? (
				<div className="text-center">
					<Image
						src={imagesForm.logout}
						alt="Logout"
						width={400}
						height={400}
					/>
					<div>
						<h1 className="text-2xl font-bold mb-4">
							Welcome, {user?.name || user?.username}!
						</h1>
						<p className="">Email: {user?.email}</p>
						<p className="">
							Account Status:{" "}
							{user?.isAccountVerified
								? "Verified"
								: "Not Verified"}
						</p>
						<Button
							onClick={logout}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>
							Logout
						</Button>
					</div>
				</div>
			) : (
				<div className="text-center">
					<Image
						src={imagesForm.login}
						alt="Login"
						width={400}
						height={400}
					/>
					<div className="flex flex-col items-center">
						<p className="text-xl font-medium">
							You are not logged in
						</p>
						<p className="">
							Please log in to access our services.
						</p>
						<Button
							onClick={() => router.push("/login")}
							className="bg-black text-white font-bold py-2 px-4 rounded-md mt-5"
						>
							Login
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
