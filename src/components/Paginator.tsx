import { FC } from "react";

type TPaginatorProps = {
  itemsSize: number;
  rowsPerPage: number;
  withDropDown?: boolean;
};

export const Paginator: FC<TPaginatorProps> = () => {
  return <div>Paginator</div>;
};
