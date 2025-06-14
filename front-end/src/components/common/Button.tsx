import React from "react";
interface Button extends React.PropsWithChildren {
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
	text?: string;
	title?: string;
}
const Button = ({ className, onClick, text, children, title }: Button) => {
	return (
		<button className={className} onClick={onClick} title={title}>
			{text}
			{children}
		</button>
	);
};

export default Button;
