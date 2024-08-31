import { FC } from "react";

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
  <div>
    <table>
      <thead>
        <tr>
          {headers.map(({ key, name, styleClasses }) => (
            <>
              {name && (
                <th className={styleClasses} key={key}>
                  {name}
                </th>
              )}
            </>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map(({ key, styleClasses }) => (
              <td className={styleClasses} key={key}>
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
