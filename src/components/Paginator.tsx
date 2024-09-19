import { useRef } from "react";
import NextPageIcon from "../assets/next-page.svg";
import PrevPageIcon from "../assets/prev-page.svg";
import { Button } from "./Button";
import { Select, TOption } from "./Select";

type TPaginatorProps<T> = {
  rowsPerPage: number;
  withDropDown?: boolean;
  data: T[];
  setData: (data: T[]) => void;
};

export function Paginator<T>({
  rowsPerPage,
  withDropDown,
  data,
  setData,
}: TPaginatorProps<T>) {
  const btnsClass = "flex items-center";
  const currentPageRef = useRef(1);
  const INITIAL_PAGING_SIZE = rowsPerPage * 2;
  const pagingOptions: TOption[] = [
    {
      label: INITIAL_PAGING_SIZE,
      value: INITIAL_PAGING_SIZE,
    },
  ];

  for (let i = 3; i <= 6; i++) {
    pagingOptions.push({
      label: INITIAL_PAGING_SIZE * i,
      value: INITIAL_PAGING_SIZE * i,
    });
  }

  const itemsSize = data.length;

  const handlePrevPageClick = () => {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      updateData(currentPageRef.current);
    }
    return;
  };

  const handleNextPageClick = () => {
    if (currentPageRef.current + rowsPerPage < itemsSize) {
      currentPageRef.current += 1;
      updateData(currentPageRef.current);
    }
  };

  const updateData = (currentPageNumber: number) => {
    const skip = currentPageNumber == 1 ? 0 : currentPageNumber * rowsPerPage;
    let take = skip + rowsPerPage;
    if (take >= itemsSize) {
      take = itemsSize;
    }
    if (skip > itemsSize) return;

    const takenData = data.slice(skip, take);
    setData(takenData);
  };

  const handleSelect = (option: TOption) => {
    console.log(option);
  };

  return (
    <div className="flex justify-end gap-3 my-2 text-slate-200 text-opacity-75">
      <div className="flex gap-2">
        <button
          className={`${btnsClass} ${
            currentPageRef.current === 1
              ? "cursor-not-allowed"
              : "cursor-pointer  hover:opacity-60"
          }`}
          onClick={handlePrevPageClick}
        >
          <img src={PrevPageIcon} alt="Previous page" className={"h-5"} />
          <span>Previous</span>
        </button>
        <div>
          {currentPageRef.current} / {Math.round(itemsSize / rowsPerPage)}
        </div>
        <button
          className={`${btnsClass}
      ${
        currentPageRef.current === Math.round(itemsSize / rowsPerPage)
          ? "cursor-not-allowed"
          : "cursor-pointer hover:opacity-50"
      }
      `}
          onClick={handleNextPageClick}
        >
          <span>Next</span>
          <img src={NextPageIcon} alt="Next page" className={"h-5"} />
        </button>
      </div>

      {withDropDown && (
        <div>
          <Button
            btnId="paging-options-btn"
            styleClass="text-lg px-2 py-1 text-left from-slate-900 to-slate-600 rounded-lg hover:from-slate-900 hover:to-slate-700"
            label="Show upto..."
            onClick={(e) => e?.preventDefault()}
            variant="primary"
          />

          <Select
            options={pagingOptions}
            onSelect={handleSelect}
            targetId="paging-options-btn"
            triggerId="paging-options-btn"
          />
        </div>
      )}
    </div>
  );
}
