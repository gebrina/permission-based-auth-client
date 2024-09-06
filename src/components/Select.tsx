import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

export type TOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type TSelectProps = {
  selectLabel?: string;
  selected?: TOption;
  options: TOption[];
  triggerId: string;
  targetId: string;
  styleClass?: string;
  hideOnSelection?: boolean;
  onSelect: (option: TOption) => void;
};

export const Select: FC<TSelectProps> = ({
  selectLabel,
  options,
  selected,
  triggerId,
  targetId,
  styleClass,
  hideOnSelection = true,
  onSelect,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TOption | undefined>(
    selected
  );

  const selectRef = useRef<HTMLDivElement | null>(null);
  const classnames = twMerge(`fixed z-50 w-full rounded-lg`, styleClass);

  const handleToggleOpenMenu = useCallback(
    () => setOpenMenu((prev) => !prev),
    []
  );

  useEffect(() => {
    const triggerElement: HTMLElement = document.querySelector(
      `#${triggerId}`
    )!;

    const handletTriggerElementClick = () => {
      const targetElement: HTMLElement = document.querySelector(
        `#${targetId}`
      )!;
      const { top, left, height } = targetElement.getBoundingClientRect();
      if (selectRef.current) {
        selectRef.current.style.top = top + height + "px";
        selectRef.current.style.left = left + "px";
      }
      handleToggleOpenMenu();
    };

    triggerElement.addEventListener("click", handletTriggerElementClick);
    return () =>
      triggerElement.removeEventListener("click", handletTriggerElementClick);
  }, [triggerId, targetId, handleToggleOpenMenu]);

  const handleSelect = (option: TOption) => {
    setSelectedOption(option);
    onSelect(option);
    hideOnSelection && handleToggleOpenMenu();
  };

  return (
    <div ref={selectRef} className={classnames}>
      {selectLabel && (
        <strong
          onClick={handleToggleOpenMenu}
          className="truncate block w-32 cursor-pointer text-slate-300"
        >
          {selectLabel}
        </strong>
      )}
      {openMenu && (
        <div className="shadow-xl bg-slate-600 rounded-lg shadow-slate-900">
          {options.map(({ value, label, icon }, index) => (
            <Fragment key={label + index}>
              {label && (
                <div
                  onClick={() => handleSelect({ value, label })}
                  className={`flex  items-center cursor-pointer hover:bg-orange-700 p-2 ${
                    index === options.length - 1 && "rounded-b-lg"
                  }
                  ${index === 1 && "rounded-t-lg"}
                  ${
                    selectedOption &&
                    selectedOption.value === value &&
                    "bg-orange-600"
                  }
                  `}
                >
                  {icon && icon} {label}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
