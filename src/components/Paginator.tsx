import { useEffect, useState } from "react";
import NextPageIcon from "../assets/next-page.svg";
import PrevPageIcon from "../assets/prev-page.svg";
import { Button } from "./Button";
import { Select, TOption } from "./Select";

type TPaginatorProps<T> = {
  rowsPerPage: number;
  currentPage: number;
  withDropDown?: boolean;
  data: T[];
  setData: (data: T[]) => void;
  setPage: (pageNumber: number) => void;
};

export function Paginator<T>({
  rowsPerPage,
  currentPage,
  withDropDown,
  data,
  setData,
  setPage,
}: TPaginatorProps<T>) {
  const btnsClass = "flex items-center";
  const pagingOptions: TOption[] = [
    {
      label: rowsPerPage,
      value: rowsPerPage,
    },
  ];

  for (let i = 2; i <= 6; i += 2) {
    if (i * rowsPerPage <= data.length) {
      pagingOptions.push({
        label: rowsPerPage * i,
        value: rowsPerPage * i,
      });
    }
  }
  const [itemSize, setItemSize] = useState(data.length);
  const [rowsNumberPerPage, setRowsNumberPerPage] = useState(rowsPerPage);
  const lastPage = Math.round(itemSize / rowsNumberPerPage);
  const disablePrevPageButton = currentPage === 1;
  const disableNextPageButton = currentPage === lastPage;

  useEffect(() => {
    setItemSize((prevSize) => {
      const dataSize = data.length;
      const pageRows =
        dataSize < rowsNumberPerPage ? dataSize : rowsNumberPerPage;
      const itemsSize = prevSize !== dataSize ? dataSize : prevSize;
      setRowsNumberPerPage(pageRows);
      return itemsSize;
    });
  }, [data, rowsNumberPerPage]);

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      const pageNumber = currentPage - 1;
      setPage(pageNumber);
      updateData(pageNumber);
      setRowsNumberPerPage(rowsPerPage);
    }
    return;
  };

  const handleNextPageClick = () => {
    if (currentPage + rowsPerPage < itemSize) {
      const pageNumber = currentPage + 1;
      setPage(pageNumber);
      updateData(pageNumber);
    }
  };

  const updateData = (
    currentPageNumber: number,
    btnNavigation = true,
    rowsNumberPerPage: number = rowsPerPage
  ) => {
    let skip = (currentPageNumber - 1) * rowsNumberPerPage;
    if (!btnNavigation) skip = (currentPageNumber - 1) * rowsNumberPerPage;

    let take = skip + rowsNumberPerPage;
    if (take >= itemSize) take = itemSize;

    if (skip > itemSize) return;

    const takenData = data.slice(skip, take);
    setData(takenData);
  };

  const handleSelect = (option: TOption) => {
    const { value } = option;
    const selectedItemSize = value as number;
    setRowsNumberPerPage(selectedItemSize);
    updateData(currentPage, false, selectedItemSize);
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
          {currentPage} / {lastPage}
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
            selected={pagingOptions.find(
              (item) => item.label === rowsNumberPerPage
            )}
            targetId="paging-options-btn"
            triggerId="paging-options-btn"
          />
        </div>
      )}
    </div>
  );
}
