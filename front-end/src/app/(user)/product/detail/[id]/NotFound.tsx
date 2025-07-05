// app/product/detail/[id]/not-found.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex items-center justify-center min-h-screen"
		>
			<div className="text-center">
				<div className="text-6xl mb-4">😔</div>
				<h1 className="text-red-500 text-xl mb-4">
					Product not found.
				</h1>
				<p className="text-gray-600 mb-6">
					The product you&apos;re looking for doesn&apos;t exist or
					has been removed.
				</p>
				<Link
					href="/products"
					className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
				>
					Browse All Products
				</Link>
			</div>
		</motion.div>
	);
}
