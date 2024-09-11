import { useRef } from "react";
import NextPageIcon from "../assets/next-page.svg";
import PrevPageIcon from "../assets/prev-page.svg";

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

  return (
    <div className="flex justify-end gap-3 my-2 text-slate-200 text-opacity-75">
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
  );
}
