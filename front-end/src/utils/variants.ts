import { Variants } from "framer-motion";

export const cartBadgeVariants: Variants = {
	hidden: {
		scale: 0,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 15,
		},
	},
	pulse: {
		scale: [1, 1.2, 1],
		transition: {
			duration: 0.4,
			ease: "easeInOut",
		},
	},
};

export const buttonVariants: Variants = {
	hover: {
		scale: 1.05,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	tap: {
		scale: 0.95,
		transition: {
			duration: 0.1,
			ease: "easeInOut",
		},
	},
};

export const searchBarVariants: Variants = {
	hidden: {
		width: 0,
		opacity: 0,
	},
	visible: {
		width: "100%",
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const dropdownVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -10,
		scale: 0.95,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		scale: 0.95,
		transition: {
			duration: 0.15,
			ease: "easeIn",
		},
	},
};

export const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -20,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
};

export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};
