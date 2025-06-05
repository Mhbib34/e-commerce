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
}: FormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className="text-white border border-white p-5 rounded-lg md:w-[500px] w-full"
		>
			<div>
				<h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
				<p className="text-center">
					{textLink}{" "}
					<Link href={linkPage} className="text-blue-500">
						{textPage}
					</Link>{" "}
				</p>
				<div className="flex flex-col gap-4 mt-8">{children}</div>
				<div className="mt-4 text-end text-blue-500">
					<Link href="/">{forgotPassword}</Link>
				</div>
				<div>
					<button className="w-full bg-white text-black py-2 rounded-lg mt-4 cursor-pointer">
						{buttonText}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
