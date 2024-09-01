import { FC } from "react";

export type TOption = {
  value: string;
  label: string;
};

type TSelectProps = {
  selectLabel: string;
  options: TOption[];
  onSelect: (option: TOption) => void;
};

export const Select: FC<TSelectProps> = ({
  selectLabel,
  options,
  onSelect,
}) => {
  return (
    <div className="absolute right-0 top-5 bg-slate-600 shadow-xl shadow-slate-900 rounded-lg">
      <strong className="truncate block w-32 p-2 text-slate-300">
        {selectLabel}
      </strong>
      {options.map(({ value, label }, index) => (
        <>
          {label && (
            <div
              onClick={() => onSelect({ value, label })}
              key={label}
              className={`cursor-pointer hover:bg-orange-700 p-2 ${
                index === options.length - 1 && "rounded-b-lg"
              }`}
            >
              {label}
            </div>
          )}
        </>
      ))}
    </div>
  );
};
