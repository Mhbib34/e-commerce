type InputProps = {
	type: string;
	value: string;
	placeholder: string;
	text?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, value, placeholder, text, onChange }: InputProps) => {
	return (
		<div className="flex flex-col gap-1">
			{text && (
				<label className="text-black" htmlFor={type}>
					{text}
				</label>
			)}
			<input
				id={type}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className="border border-black rounded-md p-2"
			/>
		</div>
	);
};

export default Input;
