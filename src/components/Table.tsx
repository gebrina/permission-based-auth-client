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
            <tr key={item.id}>
              {columns.map(({ key, styleClasses }, index) => (
                <td
                  className={`${styleClasses} py-2 border-b pr-2 truncate`}
                  key={key.toString() + index}
                >
                  <>{item[key]}</>
                </td>
              ))}
              <td className="py-2 border-b pr-2">
                {onDelete && <button>Delete</button>}
                {onEdit && <button>Edit</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
