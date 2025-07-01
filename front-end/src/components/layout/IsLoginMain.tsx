import { imagesForm } from "@/assets/assets";
import { imageCategoryCard } from "@/utils/categoryImages";
import Image from "next/image";
import React, { useEffect } from "react";
import CategoryCard from "../template/User/category/CategoryCard";
import Card from "../template/User/product/Card";
import { useProducts } from "@/hooks/useProducts";

const IsLoginMain = () => {
	const { allProducts, getAllProducts } = useProducts();
	useEffect(() => {
		getAllProducts();
		//eslint-disable-next-line
	}, []);

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
			<div className="w-full flex flex-col gap-2 md:gap-4">
				<span className="md:text-xl text-lg font-medium">Product</span>
				<div className="md:grid-cols-5 w-full grid grid-cols-2 gap-2">
					{allProducts.length > 0 ? (
						allProducts
							.filter((item) => item.stock && item.stock > 0)
							.map((product) => (
								<Card
									onClick={() => {
										window.location.href = `/product/detail/${product.id}`;
									}}
									key={product.id}
									id={product.id}
									name={product.name}
									brand={product.brand}
									price={product.price}
									description={product.description}
									image={product.image}
								/>
							))
					) : (
						<p>Loading..</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default IsLoginMain;
