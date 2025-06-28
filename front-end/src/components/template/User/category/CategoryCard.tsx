import Image, { StaticImageData } from "next/image";
import React from "react";

const CategoryCard = ({
	href,
	title,
	text,
}: {
	href: StaticImageData;
	text: string;
	title: string;
}) => {
	return (
		<div
			title={title}
			className="mx-auto flex items-center gap-2 justify-center flex-col p-4 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
		>
			<Image src={href} alt="" className="w-20 h-20 md:w-28 md:h-28" />
			<p className="text-xs font-semibold">{text}</p>
		</div>
	);
};

export default CategoryCard;
