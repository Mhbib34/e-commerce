"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	//eslint-disable-next-line
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const handleGoHome = () => {
		// For demo purposes, just show alert
		// In real app: router.push('/') or window.location.href = '/'
		alert("Redirecting to home page...");
	};

	const handleGoBack = () => {
		// For demo purposes, just show alert
		// In real app: router.back() or window.history.back()
		alert("Going back...");
	};

	return (
		<div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
			{/* Animated background particles */}
			<div className="absolute inset-0">
				{[...Array(50)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white rounded-full opacity-30"
						initial={{ opacity: 0 }}
						animate={{
							opacity: [0.3, 0.8, 0.3],
							scale: [1, 1.5, 1],
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>

			{/* Glowing cursor follower */}
			<motion.div
				className="fixed w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen"
				style={{
					left: mousePosition.x - 8,
					top: mousePosition.y - 8,
				}}
				animate={{
					scale: [1, 1.5, 1],
					opacity: [0.5, 1, 0.5],
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
				}}
			/>

			{/* Main content */}
			<div className="relative z-10 text-center px-4">
				{/* Animated 404 */}
				<motion.div
					initial={{ scale: 0, rotateZ: -180 }}
					animate={{ scale: 1, rotateZ: 0 }}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 15,
						delay: 0.2,
					}}
					className="mb-8"
				>
					<h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
						404
					</h1>
					<motion.div
						className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ delay: 0.8, duration: 0.8 }}
					/>
				</motion.div>

				{/* Glitch effect text */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.8 }}
					className="mb-6"
				>
					<h2 className="text-2xl md:text-4xl font-bold mb-4 relative">
						<span className="relative z-10">PAGE NOT FOUND</span>
						<motion.span
							className="absolute inset-0 text-red-500 opacity-70"
							animate={{
								x: [0, 2, -2, 0],
								opacity: [0, 1, 0, 1],
							}}
							transition={{
								duration: 0.3,
								repeat: Infinity,
								repeatDelay: 3,
							}}
						>
							PAGE NOT FOUND
						</motion.span>
					</h2>
					<p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
						Oops! The page you&apos;re looking for seems to have
						vanished into the digital void.
					</p>
				</motion.div>

				{/* Floating geometric shapes */}
				<motion.div
					className="absolute -top-20 -left-20 w-40 h-40 border-2 border-purple-500 rounded-full opacity-20"
					animate={{
						rotate: 360,
						scale: [1, 1.2, 1],
					}}
					transition={{
						rotate: {
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						},
						scale: { duration: 3, repeat: Infinity },
					}}
				/>
				<motion.div
					className="absolute -bottom-20 -right-20 w-32 h-32 border-2 border-pink-500 rotate-45 opacity-20"
					animate={{
						rotate: [45, 405],
						scale: [1, 1.3, 1],
					}}
					transition={{
						rotate: {
							duration: 15,
							repeat: Infinity,
							ease: "linear",
						},
						scale: { duration: 4, repeat: Infinity },
					}}
				/>

				{/* Action buttons */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.4, duration: 0.8 }}
					className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
				>
					<motion.button
						onClick={handleGoHome}
						className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="relative z-10">Go Home</span>
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							layoutId="buttonGlow"
						/>
					</motion.button>

					<motion.button
						onClick={handleGoBack}
						className="group relative px-8 py-3 border-2 border-purple-500 rounded-full font-semibold text-purple-400 hover:text-white hover:bg-purple-500 transition-all duration-300 overflow-hidden"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="relative z-10">Go Back</span>
						<motion.div
							className="absolute inset-0 bg-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
							layoutId="buttonBackground"
						/>
					</motion.button>
				</motion.div>

				{/* Animated error code */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2, duration: 1 }}
					className="mt-12 text-gray-600 text-sm font-mono"
				>
					<motion.span
						animate={{
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
					>
						ERROR_CODE: 404_NOT_FOUND
					</motion.span>
				</motion.div>
			</div>

			{/* Animated grid background */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
            linear-gradient(90deg, #333 1px, transparent 1px),
            linear-gradient(180deg, #333 1px, transparent 1px)
          `,
						backgroundSize: "50px 50px",
					}}
				/>
			</div>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
		</div>
	);
};

export default NotFoundPage;
