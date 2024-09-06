import { FC, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "teritiary";
type TButtonProps = {
  variant: ButtonVariant;
  btnId?: string;
  styleClass?: string;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  label: string;
};

const getButtonStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return `bg-gradient-to-tr from-blue-700 to-pink-900
         hover:from-pink-900 hover:to-blue-700
      `;
    case "secondary":
      return `bg-gradient-to-br from-pink-700 to-orange-900
         hover:from-orange-900 hover:to-pink-700
      `;
    default:
      return `bg-gradient-to-tl from-yellow-700 to-red-900 text-slate-100
         hover:from-red-900 hover:to-yellow-700
      `;
  }
};

export const Button: FC<TButtonProps> = ({
  variant,
  label,
  btnId,
  styleClass,
  onClick,
}) => {
  const classnames = twMerge(
    `border-none py-2 text-xl rounded
    ${getButtonStyle(variant)}`,
    styleClass
  );

  return (
    <button id={btnId ? btnId : ""} onClick={onClick} className={classnames}>
      {label}
    </button>
  );
};
