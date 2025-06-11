import React from "react";
interface Button extends React.PropsWithChildren {
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
	text?: string;
}
const Button = ({ className, onClick, text, children }: Button) => {
	return (
		<button className={className} onClick={onClick}>
			{text}
			{children}
		</button>
	);
};

export default Button;
