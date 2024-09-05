import { ChangeEvent, Fragment, useState } from "react";
import CancelIcon from "../assets/cancel.svg";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import UpdateIcon from "../assets/update.svg";
import { filterById, toLower, wait } from "../utils";
import { Input, Select, TOption } from "./";

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
  filter?: {
    columnKey?: keyof T;
  };
};

export function Table<T extends { id: string }>({
  data,
  columns,
  onDelete,
  onEdit,
  filter,
}: TTableProps<T>) {
  const filterOptions: TOption[] = columns.map((col) => ({
    value: col.key.toString(),
    label: col.name ?? "",
  }));

  const selectedOption = filterOptions.find(
    (x) => x.value === filter?.columnKey
  );

  const defaultFilterKey = filter?.columnKey ?? columns[0].key;
  const defaultFilterName =
    columns.filter((x) => x.key === filter?.columnKey)[0]?.name ??
    columns[0].name;

  const [searchTerm, setSearchTerm] = useState("");
  const [rowData, setRowData] = useState<(typeof data)[0]>();
  const [searchBy, setSearchBy] = useState({
    key: defaultFilterKey,
    name: defaultFilterName,
  });
  const [filteredData, setFilterdData] = useState(data);
  const [edit, setEdit] = useState(false);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
    filterTableData(value);
  };

  const filterTableData = async (search: string) => {
    if (search && searchBy.key) {
      await wait(300);
      const filterdData = data.filter((x) =>
        toLower(x[searchBy.key] as string).includes(toLower(search))
      );
      setFilterdData(filterdData);
    } else setFilterdData(data);
  };

  const handleSelect = (option: TOption) =>
    setSearchBy({
      key: option.value as keyof T,
      name: option.label,
    });

  const handleEdit = (row: T) => {
    setEdit(true);
    const filteredData = filterById(data, row.id);
    setRowData(filteredData);
  };

  const handleCancel = () => {
    setEdit(false);
    setRowData({ id: "" } as T);
  };

  return (
    <div>
      {filter && (
        <div className="flex  justify-end">
          <Input
            type="search"
            placeholder={`Type ${toLower(searchBy.name ?? "")}...`}
            styleClasses="mb-1 relative shadow-slate-500"
            onChange={handleChange}
          />
          <div className="relative ml-2  min-w-32">
            <Select
              selectLabel="Filter by..."
              options={filterOptions}
              onSelect={handleSelect}
              selected={selectedOption}
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
          {filteredData.length > 0
            ? filteredData.map((item) => (
                <tr className="border-y border-slate-400" key={item.id}>
                  {columns.map(({ key, styleClasses }, index) => (
                    <td
                      className={`${styleClasses}  p-2 truncate`}
                      key={key.toString() + index}
                    >
                      <>
                        {rowData?.id === item.id && edit ? (
                          <Input
                            type="text"
                            value={rowData[key]?.toString() ?? ""}
                            onChange={() => {}}
                            styleClasses="bg-slate-500 bg-opacity-50 w-full"
                          />
                        ) : (
                          item[key]
                        )}
                      </>
                    </td>
                  ))}
                  <td
                    className={`p-2 flex gap-3 items-center bg-slate-400  justify-center`}
                  >
                    {onEdit && (
                      <div className="flex items-center">
                        <img
                          className="h-7 cursor-pointer mix-blend-screen hover:opacity-50"
                          src={edit ? rowData?.id && UpdateIcon : EditIcon}
                          alt="Edit record"
                          onClick={() => handleEdit(item)}
                        />
                        {edit && (
                          <img
                            className="h-4 mix-blend-difference cursor-pointer hover:opacity-50"
                            alt="Cancel editing"
                            src={CancelIcon}
                            onClick={handleCancel}
                          />
                        )}
                      </div>
                    )}
                    {onDelete && (
                      <img
                        className="h-5 mix-blend-screen cursor-pointer hover:opacity-50"
                        alt="Delete  record"
                        src={DeleteIcon}
                        onClick={() => onDelete(item.id)}
                      />
                    )}
                  </td>
                </tr>
              ))
            : searchTerm && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-2 text-lg leading-10 animate-pulse text-slate-200 text-opacity-70"
                  >
                    Item not found.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
}
