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
      {text && <label className="text-white">{text}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};

export default Input;
