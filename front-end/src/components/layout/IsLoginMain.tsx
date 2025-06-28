import { imagesForm } from "@/assets/assets";
import { imageCategoryCard } from "@/utils/categoryImages";
import Image from "next/image";
import React from "react";
import CategoryCard from "../template/User/category/CategoryCard";

const IsLoginMain = () => {
	return (
		<div className="flex flex-col items-center md:gap-10 gap-5 w-full">
			<div className="w-full rounded-xl mt-4">
				<Image
					src={imagesForm.imageMain}
					alt="product"
					className="w-full rounded-xl"
				/>
			</div>
			<div className="w-full flex flex-col gap-2 md:gap-4">
				<span className="md:text-xl text-lg font-medium">
					Categories
				</span>
				<div className="md:flex md:items-center md:justify-between w-full grid grid-cols-3 gap-2">
					{imageCategoryCard.map((item, index) => (
						<CategoryCard
							text={item.alt}
							href={item.src}
							key={index}
							title={item.alt}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default IsLoginMain;
