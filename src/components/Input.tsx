import { ChangeEvent, FC, useId } from "react";

type TInputProps = {
  label: string;
  type: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
};

export const Input: FC<TInputProps> = ({ label, type, name, onChange }) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2  text-lg ">
      <label htmlFor={inputId}>{label}</label>
      <input
        className="border-none rounded outline-none bg-transparent
         shadow-sm
         shadow-slate-700
         py-1
         px-3
        "
        id={inputId}
        type={type}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};
