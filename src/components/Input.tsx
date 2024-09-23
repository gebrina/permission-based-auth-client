import { ChangeEvent, FC, FocusEvent, useId } from "react";
import { twMerge } from "tailwind-merge";

type TInputProps = {
  defaultValue?: string;
  label?: string;
  name?: string;
  type?: string;
  variant?: "text-area" | "input";
  placeholder?: string;
  styleClasses?: string;
  errorMessage?: string;
  onChange: <T>(event: ChangeEvent<T>) => void;
  onBlur?: <T>(event: FocusEvent<T, HTMLElement>) => void;
};

export const Input: FC<TInputProps> = ({
  defaultValue,
  label,
  name,
  type,
  placeholder,
  variant = "input",
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
      {label && <label htmlFor={inputId}>{label}</label>}
      {variant === "input" ? (
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
      ) : (
        <textarea
          autoComplete="off"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`${classnames}`}
          id={inputId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      <p className="absolute text-red-500 right-0 top-3 text-sm">
        {errorMessage}
      </p>
    </div>
  );
};
