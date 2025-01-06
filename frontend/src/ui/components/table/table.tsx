import React, { CSSProperties, HTMLAttributes, memo, useState } from "react";
import "./table.css";
import { ScrollArea } from "../scrollarea/scrollArea";

type TableRowData<T> = T;

export interface IColumn<T> {
  header: string;
  accessor?: keyof T;
  placeholder?:string,
  render: (row: T) => React.ReactNode;
  style?:CSSProperties;
}

interface TableProps<T> {
  columns: IColumn<T>[];
  data: T[];
  onRowClick?: (rowData: T) => void;
}

const Table = memo(function Table<T>({
  columns,
  data,
  onRowClick,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "ascending" | "descending";
  } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    column: keyof T
  ) => {
    setFilters({ ...filters, [String(column)]: e.target.value });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
  
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
  
        const normalizedA = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
        const normalizedB = typeof bValue === "string" ? bValue.toLowerCase() : bValue;
  
        if (normalizedA < normalizedB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (normalizedA > normalizedB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
  
    return sortableData;
  }, [data, sortConfig]);
  

  const requestSort = (key: keyof T) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <ScrollArea style={{ maxHeight: "80vh" }}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} className="box">
                <div className="flex-col">
                  <span
                    className="col--name tx-sm bold box"
                    onClick={() =>
                      column.accessor && requestSort(column.accessor)
                    }
                  >
                    {column.header}
                  </span>
                  {column.accessor && (
                    <ColumnFilter
                      column={column.accessor}
                      placeholder={column.placeholder}
                      filterValue={filters[String(column.accessor)] || ""}
                      onFilterChange={handleFilterChange}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData
            .filter((row) => {
              return Object.keys(filters).every((column) => {
                const cellValue = row[column as keyof T];
                const filterValue = filters[column].toLowerCase();

                if (!filterValue) {
                  return true;
                }

                return cellValue
                  ? cellValue.toString().toLowerCase().includes(filterValue)
                  : false;
              });
            })
            .map((row, index) => (
              <TableRow
                key={index}
                row={row}
                columns={columns}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: `${onRowClick ? "pointer" : ""}` }}
              />
            ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}) as <T>(props: TableProps<T>) => JSX.Element;

interface TableRowProps<T> extends HTMLAttributes<HTMLElement> {
  row: T;
  columns: IColumn<T>[];
}

function TableRow<T>({ row, columns, ...props }: TableRowProps<T>) {
  return (
    <tr {...props}>
      {columns.map((column) => (
        <TableCell key={String(column.accessor)}>
          {column.render(row)}
        </TableCell>
      ))}
    </tr>
  );
}

type TableCellProps = {
  children: React.ReactNode;
};

const TableCell = memo(function TableCell({ children }: TableCellProps) {
  return <td className="tx-xs">{children}</td>;
});

const ColumnFilter = <T,>({
  column,
  placeholder,
  filterValue,
  onFilterChange,
}: {
  column: keyof T;
  placeholder?:string;
  filterValue: string;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    column: keyof T
  ) => void;
}) => (
  <input
    type="text"
    value={filterValue}
    onChange={(e) => onFilterChange(e, column)}
    placeholder={`${placeholder ?? String(column)}...`}
    className="column--filter tx-sm"
  />
);

export default Table;
