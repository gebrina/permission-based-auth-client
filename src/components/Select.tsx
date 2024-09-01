import { FC } from "react";

export type TOption = {
  value: string;
  label: string;
};

type TSelectProps = {
  options: TOption[];
  onSelect: (option: TOption) => void;
};

export const Select: FC<TSelectProps> = () => {
  return <div>Select</div>;
};
