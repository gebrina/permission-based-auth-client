import { FC } from "react";

type THeaderProps = {
  title: string;
};

export const Header: FC<THeaderProps> = ({ title }) => {
  return (
    <header className="bg-slate-200 font-bold bg-opacity-30  p-2 text-2xl">
      <h3>{title}</h3>
    </header>
  );
};
