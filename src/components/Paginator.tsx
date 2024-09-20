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
  const pagingOptions: TOption[] = [
    {
      label: rowsPerPage,
      value: rowsPerPage,
    },
  ];

  for (let i = 2; i <= 5; i++) {
    pagingOptions.push({
      label: rowsPerPage * i,
      value: rowsPerPage * i,
    });
  }
  const itemsSizeRef = useRef<number>(data.length);
  const rowsPerPageRef = useRef<number>(rowsPerPage);
  const currentPageRef = useRef<number>(1);
  const lastPage = Math.round(itemsSizeRef.current / rowsPerPageRef.current);
  const disablePrevPageButton = currentPageRef.current === 1;
  const disableNextPageButton = currentPageRef.current === lastPage;

  const handlePrevPageClick = () => {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      updateData(currentPageRef.current);
    }
    return;
  };

  const handleNextPageClick = () => {
    if (currentPageRef.current + rowsPerPage < itemsSizeRef.current) {
      currentPageRef.current += 1;
      updateData(currentPageRef.current);
    }
  };

  const updateData = (currentPageNumber: number, btnNavigation = true) => {
    let skip = (currentPageNumber - 1) * rowsPerPageRef.current;
    if (!btnNavigation) skip = (currentPageNumber - 1) * rowsPerPage;

    let take = skip + rowsPerPageRef.current;
    if (take >= itemsSizeRef.current) take = itemsSizeRef.current;

    if (skip > itemsSizeRef.current) return;

    const takenData = data.slice(skip, take);
    setData(takenData);
  };

  const handleSelect = (option: TOption) => {
    const { value } = option;
    rowsPerPageRef.current = value as number;
    updateData(currentPageRef.current, false);
  };

  return (
    <div className="flex justify-end gap-3 my-2 text-slate-200 text-opacity-75">
      <div className="flex items-center gap-2">
        <button
          disabled={disablePrevPageButton}
          className={`${btnsClass} ${
            disablePrevPageButton
              ? "cursor-not-allowed disabled"
              : "cursor-pointer  hover:opacity-60"
          }`}
          onClick={handlePrevPageClick}
        >
          <img src={PrevPageIcon} alt="Previous page" className={"h-5"} />
          <span>Previous</span>
        </button>
        <div>
          {currentPageRef.current} / {lastPage}
        </div>
        <button
          disabled={disableNextPageButton}
          className={`${btnsClass}
      ${
        disableNextPageButton
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
