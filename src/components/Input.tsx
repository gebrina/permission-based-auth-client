import { ChangeEvent, FC, useId } from "react";

type TInputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<TInputProps> = ({ label, type, value, onChange }) => {
  const inputId = useId();

  return (
    <div>
      <label htmlFor={inputId}></label>
      <input id={inputId} type={type} value={value} onChange={onChange} />
    </div>
  );
};
