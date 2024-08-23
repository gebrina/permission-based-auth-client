import { FC } from "react";

type TInputProps = {
  label: string;
  onChange: (value: string) => void;
  errorMessage: string;
};

export const Input: FC<TInputProps> = () => {
  return <input type="text" />;
};
