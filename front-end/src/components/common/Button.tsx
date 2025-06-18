import React from "react";
interface Button extends React.PropsWithChildren {
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
	text?: string;
	title?: string;
	disabled?: boolean;
}
const Button = ({
	className,
	onClick,
	text,
	children,
	title,
	disabled,
}: Button) => {
	return (
		<button
			className={className}
			onClick={onClick}
			title={title}
			disabled={disabled}
		>
			{text}
			{children}
		</button>
	);
};

export default Button;
