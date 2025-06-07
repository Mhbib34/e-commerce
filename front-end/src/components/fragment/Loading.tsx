"use client";

const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-black">
			<div className="relative w-16 h-16">
				<svg
					className="animate-spin-slow absolute inset-0 w-full h-full"
					viewBox="0 0 100 100"
				>
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke="white"
						strokeOpacity="0.1"
						strokeWidth="10"
						fill="none"
					/>
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke="white"
						strokeWidth="10"
						strokeLinecap="round"
						fill="none"
						strokeDasharray="80"
						strokeDashoffset="60"
					/>
				</svg>
			</div>
		</div>
	);
};

export default LoadingSpinner;
