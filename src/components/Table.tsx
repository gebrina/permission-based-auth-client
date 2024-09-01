import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";

import { Fragment } from "react";

export type THeader<T> = {
  name?: string;
  key: keyof T;
  styleClasses?: string;
};

type TTableProps<T> = {
  data: T[];
  columns: THeader<T>[];
  onDelete?: (rowId: string) => void;
  onEdit?: (rowData: T) => void;
};

export function Table<T extends { id: string }>({
  data,
  columns,
  onDelete,
  onEdit,
}: TTableProps<T>) {
  return (
    <div className="">
      <table className="w-full bg-slate-200 bg-opacity-10">
        <thead>
          <tr className="">
            {columns.map(({ key, name, styleClasses }) => (
              <Fragment key={key.toString()}>
                {name && (
                  <th
                    className={`${styleClasses} text-left pr-2 py-2`}
                    key={key.toString()}
                  >
                    {name}
                  </th>
                )}
              </Fragment>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="border-y border-slate-400" key={item.id}>
              {columns.map(({ key, styleClasses }, index) => (
                <td
                  className={`${styleClasses} pl-0 p-2 truncate`}
                  key={key.toString() + index}
                >
                  <>{item[key]}</>
                </td>
              ))}
              <td className="p-2 flex gap-3">
                {onEdit && (
                  <img
                    className="h-5 cursor-pointer hover:opacity-50"
                    onClick={() => onEdit(item)}
                    src={EditIcon}
                    alt="Edit record"
                  />
                )}
                {onDelete && (
                  <img
                    className="h-5 cursor-pointer hover:opacity-50"
                    onClick={() => onDelete(item.id)}
                    src={DeleteIcon}
                    alt="Delete  record"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
