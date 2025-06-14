"use client";

import { ReactNode, useState, useEffect } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
	children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isSidebarOpen) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isSidebarOpen]);

	// Handle body scroll when sidebar is open on mobile
	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isSidebarOpen]);

	const closeSidebar = () => setSidebarOpen(false);
	const openSidebar = () => setSidebarOpen(true);

	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		router.push("/login");
	}

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			{/* Sidebar - Menggunakan flex untuk otomatis menyesuaikan */}
			<aside
				className={`
          bg-white shadow-2xl border-r border-gray-200
          transform transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          fixed md:relative top-0 left-0 h-full z-50 md:z-auto
        `}
				aria-label="Admin navigation"
			>
				<AdminSidebar onClose={closeSidebar} />
			</aside>

			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
					onClick={closeSidebar}
					aria-label="Close sidebar"
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							closeSidebar();
						}
					}}
				/>
			)}

			{/* Main Content - flex-1 akan otomatis mengambil sisa ruang */}
			<main className="flex-1 flex flex-col overflow-hidden">
				{/* Mobile Header */}
				<header className="md:hidden bg-white border-b border-gray-200 shadow-sm">
					<div className="flex items-center justify-between px-4 py-3">
						<Button
							onClick={openSidebar}
							className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
							aria-label="Open navigation menu"
						>
							<Menu size={24} className="text-gray-700" />
						</Button>

						<h1 className="text-lg font-semibold text-gray-900">
							Admin Panel
						</h1>

						{/* Placeholder for potential user menu */}
						<div className="w-8" />
					</div>
				</header>

				{/* Content Area */}
				<div className="flex-1 overflow-y-auto scrollbar-none bg-gray-50">
					<div className="p-6">{children}</div>
				</div>
			</main>
		</div>
	);
}
