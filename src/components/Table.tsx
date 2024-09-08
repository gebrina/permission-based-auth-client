import {
  ChangeEvent,
  Fragment,
  ReactElement,
  useEffect,
  useState,
} from "react";
import CancelIcon from "../assets/cancel.svg";
import UpdateIcon from "../assets/check.svg";
import ColumnIcon from "../assets/column.svg";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import PlusIcon from "../assets/plus.svg";
import { toLower, wait } from "../utils";
import { Button, Input, Select, TOption } from "./";

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
  const selectOptions: TOption[] = columns.map((col) => ({
    value: col.key.toString(),
    label: col.name ?? "",
  }));

  const shownColumIcon = <img src={UpdateIcon} className="h-6" alt="Shown" />;
  const hiddenColumIcon = (
    <img
      className="h-4 w-6 mix-blend-difference"
      src={CancelIcon}
      alt="Hidden"
    />
  );

  const defaultColumnOptions = selectOptions.map((option, index) => ({
    ...option,
    icon: index !== 0 && shownColumIcon,
  }));

  const [columnSelectOption, setColumnSelectOptions] =
    useState(defaultColumnOptions);

  const selectedOption = selectOptions.find(
    (x) => x.value === filter?.columnKey
  );

  const defaultFilterKey = filter?.columnKey ?? columns[0].key;
  const defaultFilterName =
    columns.filter((x) => x.key === filter?.columnKey)[0]?.name ??
    columns[0].name;

  const [searchTerm, setSearchTerm] = useState("");
  const [rowData, setRowData] = useState<T>();
  const [searchBy, setSearchBy] = useState({
    key: defaultFilterKey,
    name: defaultFilterName,
  });
  const [filteredData, setFilterdData] = useState(data);
  const [shownColumns, setShownColumns] = useState(columns);
  const [showActionsColumn, setShowActionsColumn] = useState(true);
  const [addRow, setAddRow] = useState(false);

  useEffect(() => {
    const areAllColumnsRemoved = shownColumns.every(
      (col) => !!col.name === false
    );
    if (areAllColumnsRemoved) {
      setShowActionsColumn(false);
    } else {
      setShowActionsColumn(true);
    }
  }, [shownColumns]);

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
    if (!rowData) {
      setRowData(row);
    } else {
      onEdit?.(rowData);
      setRowData(undefined);
    }
  };

  const handleCancel = () => setRowData(undefined);

  const handleAddRow = () => {
    setAddRow(true);
  };

  const handleTDInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const key = input.getAttribute("name") as keyof T;
    if (rowData) {
      rowData[key] = input.value as T[keyof T];
    }
  };

  const updateSelectColumnIcon = (icon: ReactElement) => {
    const updatedIcon =
      icon.props?.src === shownColumIcon.props?.src
        ? hiddenColumIcon
        : shownColumIcon;

    return updatedIcon;
  };

  const handleColumnOptionsSelect = (option: TOption) => {
    const updatedColumnOptions = columnSelectOption.map((co) =>
      co.label === option.label
        ? {
            ...co,
            icon: updateSelectColumnIcon(co.icon as ReactElement),
          }
        : co
    );

    const showColumns = updatedColumnOptions
      .filter(
        (co) =>
          (co.icon as ReactElement).props?.src !== hiddenColumIcon.props?.src
      )
      .map(({ value, label }) => ({
        key: value as keyof T,
        name: label,
      }));

    setColumnSelectOptions(updatedColumnOptions);
    setShownColumns(showColumns);
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-ful">
      <div className="flex  items-end justify-between gap-2">
        <div className="bg-gradient-to-tr from-slate-900 h-10 flex items-center p-2 rounded-lg hover:bg-opacity-70">
          <img
            id="column-options"
            src={ColumnIcon}
            className="h-5 sm:h-4 cursor-pointer hover:opacity-80"
            alt="column-options"
          />
          <Select
            options={columnSelectOption}
            targetId="column-options"
            triggerId="column-options"
            hideOnSelection={false}
            onSelect={handleColumnOptionsSelect}
            styleClass="max-w-36"
          />
        </div>

        {filter && (
          <div className="flex items-end justify-end">
            <Input
              type="search"
              placeholder={`Type ${toLower(searchBy.name ?? "")}...`}
              styleClasses="mb-1 relative w-full shadow-slate-500"
              onChange={handleChange}
            />
            <Button
              btnId="filter-by-btn"
              styleClass="text-lg px-2 py-1 text-left from-slate-900 to-slate-600 rounded-lg hover:from-slate-900 hover:to-slate-700"
              label="Filter by..."
              onClick={(e) => e?.preventDefault()}
              variant="primary"
            />
            <Select
              options={selectOptions}
              onSelect={handleSelect}
              selected={selectedOption}
              triggerId="filter-by-btn"
              targetId="filter-by-btn"
            />
          </div>
        )}
        <img
          src={PlusIcon}
          className="h-5 mb-3 cursor-pointer hover:opacity-70"
          alt="Add new record"
          onClick={handleAddRow}
        />
      </div>
      <table className="w-full bg-slate-200  bg-opacity-10">
        <thead>
          <tr>
            {shownColumns.map(({ key, name, styleClasses }) => (
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
            {showActionsColumn && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0
            ? filteredData.map((item, itemIndex) => (
                <tr className="border-y border-slate-400" key={item.id}>
                  {shownColumns.map(({ key, name, styleClasses }, index) => (
                    <Fragment key={key.toString() + index}>
                      {name && (
                        <td
                          className={`${styleClasses ?? ""} p-2 ${
                            item.id === rowData?.id ? "pb-3" : ""
                          }`}
                        >
                          {rowData?.id === item.id ? (
                            <Input
                              type="text"
                              name={key.toString()}
                              defaultValue={rowData[key]?.toString() ?? ""}
                              onChange={handleTDInputChange}
                              styleClasses="bg-slate-500  bg-opacity-50 w-full h-10"
                            />
                          ) : addRow && itemIndex === 0 ? (
                            <>
                              <Input
                                type="text"
                                placeholder={name}
                                name={key.toString()}
                                onChange={() => {}}
                                styleClasses="bg-slate-500 bg-opacity-50 w-full h-10"
                              />
                            </>
                          ) : (
                            <>{item[key]}</>
                          )}
                        </td>
                      )}
                    </Fragment>
                  ))}
                  {showActionsColumn && (
                    <td className={`p-2`}>
                      <div className="flex items-center justify-center gap-3 min-w-24">
                        {onEdit && (
                          <div className="flex items-center">
                            <img
                              className="h-8 cursor-pointer mix-blend-screen hover:opacity-50"
                              src={
                                rowData?.id === item.id ? UpdateIcon : EditIcon
                              }
                              alt="Edit record"
                              onClick={() => handleEdit(item)}
                            />
                            {rowData?.id === item.id && (
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
                      </div>
                    </td>
                  )}
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
