import { FC, Fragment } from "react";

export type THeader = {
  name?: string;
  key: string;
  styleClasses?: string;
};

type TTableProps = {
  headers: THeader[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export const Table: FC<TTableProps> = ({ headers, data }) => (
  <div className="">
    <table className="w-full bg-slate-200 bg-opacity-10">
      <thead>
        <tr className="">
          {headers.map(({ key, name, styleClasses }) => (
            <Fragment key={key}>
              {name && (
                <th className={`${styleClasses} text-left pr-2 py-2`} key={key}>
                  {name}
                </th>
              )}
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map(({ key, styleClasses }, index) => (
              <td
                className={`${styleClasses} py-2 border-b pr-2 truncate`}
                key={key + index}
              >
                {key !== "actions" ? (
                  item[key]
                ) : (
                  <div className="flex gap-1">
                    <button>delete</button>
                    <button>edit</button>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
