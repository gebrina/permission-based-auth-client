import { FC, Fragment, useState } from "react";

export type TOption = {
  value: string;
  label: string;
};

type TSelectProps = {
  selectLabel: string;
  selected?: TOption;
  options: TOption[];
  onSelect: (option: TOption) => void;
};

export const Select: FC<TSelectProps> = ({
  selectLabel,
  options,
  onSelect,
  selected,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | undefined>(
    selected
  );

  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);

  const handleSelect = (option: TOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="absolute right-0 top-5 rounded-lg">
      <strong
        onClick={handleToggleOpenMenu}
        className="truncate block w-32 cursor-pointer text-slate-300"
      >
        {selectLabel}
      </strong>
      {openMenu && (
        <div className="shadow-xl bg-slate-600 rounded-lg shadow-slate-900">
          {options.map(({ value, label }, index) => (
            <Fragment key={label + index}>
              {label && (
                <div
                  onClick={() => handleSelect({ value, label })}
                  className={`cursor-pointer hover:bg-orange-700 p-2 ${
                    index === options.length - 1 && "rounded-b-lg"
                  }
                  ${
                    selectedOption &&
                    selectedOption.value === value &&
                    "bg-orange-600"
                  }
                  `}
                >
                  {label}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
