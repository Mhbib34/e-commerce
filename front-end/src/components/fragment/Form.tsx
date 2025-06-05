import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type FormProps = {
	children?: React.ReactNode;
	textPage: string;
	linkPage: string;
	forgotPassword?: string;
	title: string;
	textLink: string;
	buttonText: string;
	onSubmit?: { (e: React.FormEvent<HTMLFormElement>): void };
	image: StaticImageData;
};

const Form = ({
	children,
	textPage,
	linkPage,
	forgotPassword,
	title,
	textLink,
	buttonText,
	onSubmit,
	image,
}: FormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className="text-black border  bg-white p-5 rounded-lg md:w-[500px] w-full"
		>
			<div className="w-40 h-40 mx-auto relative">
				<Image
					src={image}
					alt="Logo"
					fill
					priority
					sizes="(max-width: 768px) 150px, 200px"
					className="object-contain"
				/>
			</div>
			<div>
				<h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
				<p className="text-center">
					{textLink}{" "}
					<Link href={linkPage} className="text-blue-500 font-medium">
						{textPage}
					</Link>{" "}
				</p>
				<div className="flex flex-col gap-4 mt-4">{children}</div>
				<div className="mt-4 text-end text-blue-500 font-medium">
					<Link href="/">{forgotPassword}</Link>
				</div>
				<div>
					<button className="w-full bg-black text-white py-2 rounded-lg mt-4 cursor-pointer">
						{buttonText}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
