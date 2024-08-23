import { FC } from "react";

type ButtonVariant = "primary" | "secondary" | "teritiary";
type TButtonProps = {
  variant: ButtonVariant;
  onClick: () => void;
  label: string;
};

const getButtonStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "bg-red-900 text-white font-bold";
    case "secondary":
      return "bg-slate-600 text-red-900 font-bold";
    default:
      return "bg-white text-pink-500 font bold";
  }
};

export const Button: FC<TButtonProps> = ({ variant, label, onClick }) => {
  return (
    <button onClick={onClick} className={`${getButtonStyle(variant)}`}>
      {label}
    </button>
  );
};
