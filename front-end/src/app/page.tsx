"use client";

import { imagesCategory, imagesForm } from "@/assets/assets";
import Button from "@/components/common/Button";
import CategoryCard from "@/components/template/User/category/CategoryCard";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	const image = [
		{
			src: imagesCategory.laptop,
			alt: "Laptop",
		},
		{
			src: imagesCategory.electronics,
			alt: "Electronics",
		},
		{
			src: imagesCategory.handphone,
			alt: "Handphone",
		},
		{
			src: imagesCategory.mouse,
			alt: "Mouse",
		},
		{
			src: imagesCategory.footballShoes,
			alt: "FootballShoes",
		},
		{
			src: imagesCategory.television,
			alt: "Television",
		},
	];

	return (
		<div className="flex items-center justify-center mt-4">
			{isAuthenticated ? (
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
							{image.map((item, index) => (
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
			) : (
				<div className="text-center">
					<Image
						src={imagesForm.login}
						alt="Login"
						width={400}
						height={400}
					/>
					<div className="flex flex-col items-center">
						<p className="text-xl font-medium">
							You are not logged in
						</p>
						<p className="">
							Please log in to access our services.
						</p>
						<Button
							onClick={() => router.push("/login")}
							className="bg-black text-white font-bold py-2 px-4 rounded-md mt-5"
						>
							Login
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
