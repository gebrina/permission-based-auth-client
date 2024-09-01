import { ChangeEvent, Fragment, useState } from "react";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import { Select, TOption } from "./";

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
  filter?: boolean;
};

export function Table<T extends { id: string }>({
  data,
  columns,
  onDelete,
  onEdit,
  filter = true,
}: TTableProps<T>) {
  const [searchedTerm, setSearchedTerm] = useState("");
  const filterOptions: TOption[] = columns.map((col) => ({
    value: col.key.toString(),
    label: col.name ?? "",
  }));
  const [filteredData, setFilterdData] = useState(data);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSearchedTerm(value);
  };

  const handleSelect = (optoin: TOption) => {
    alert(optoin.label);
  };

  return (
    <div>
      {filter && (
        <div className="flex justify-end">
          <input
            type="search"
            value={searchedTerm}
            onChange={handleChange}
            className="bg-transparent  border-b-2 shadow-lg outline-none p-2 float-right mb-2"
          />
          <div className="relative w-32">
            <Select
              selectLabel="Filter by..."
              options={filterOptions}
              onSelect={handleSelect}
            />
          </div>
        </div>
      )}
      <table className="w-full bg-slate-200 bg-opacity-10">
        <thead>
          <tr>
            {columns.map(({ key, name, styleClasses }) => (
              <Fragment key={key.toString()}>
                {name && (
                  <th
                    className={`${styleClasses} text-left p-2`}
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
          {filteredData.map((item) => (
            <tr className="border-y border-slate-400" key={item.id}>
              {columns.map(({ key, styleClasses }, index) => (
                <td
                  className={`${styleClasses}  p-2 truncate`}
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
