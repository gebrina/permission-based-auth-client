import { ChangeEvent, FC, FocusEvent, useId } from "react";
import { twMerge } from "tailwind-merge";

type TInputProps = {
  defaultValue?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  styleClasses?: string;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement, HTMLElement>) => void;
};

export const Input: FC<TInputProps> = ({
  defaultValue,
  label,
  name,
  type,
  placeholder,
  errorMessage,
  styleClasses,
  onChange,
  onBlur,
}) => {
  const inputId = useId();
  const defaultStyle = `
     border-none rounded outline-none bg-transparent
    shadow-sm shadow-slate-300 py-1 md:py-2 px-3
  `;
  const classnames = twMerge(defaultStyle, styleClasses);

  return (
    <div className="flex flex-col gap-2  text-lg relative">
      <label htmlFor={inputId}>{label}</label>
      <input
        autoComplete="off"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={classnames}
        id={inputId}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className="absolute text-red-500 right-0 top-3 text-sm">
        {errorMessage}
      </p>
    </div>
  );
};
