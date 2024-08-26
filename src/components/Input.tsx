import { ChangeEvent, FC, FocusEvent, useId } from "react";

type TInputProps = {
  type: string;
  label: string;
  name: string;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement, HTMLElement>) => void;
};

export const Input: FC<TInputProps> = ({
  label,
  type,
  name,
  errorMessage,
  onChange,
  onBlur,
}) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2  text-lg relative">
      <label htmlFor={inputId}>{label}</label>
      <input
        autoComplete="off"
        className="border-none rounded outline-none bg-transparent
         shadow-sm
         shadow-slate-300
         py-1
         md:py-2
         px-3
        "
        id={inputId}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className="absolute text-red-500 right-0 text-sm">{errorMessage}</p>
    </div>
  );
};
