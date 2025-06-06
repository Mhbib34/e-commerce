type InputProps = {
	children?: React.ReactNode;
	type: string;
	value: string;
	placeholder: string;
	text?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	type,
	value,
	placeholder,
	text,
	onChange,
	children,
}: InputProps) => {
	return (
		<div className="flex flex-col gap-1">
			{text && (
				<label className="text-black" htmlFor={type}>
					{text}
				</label>
			)}
			<div className="flex w-full flex-col items-start">
				<input
					id={type}
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="border border-black rounded-md p-2 w-full"
				/>
				{children}
			</div>
		</div>
	);
};

export default Input;
