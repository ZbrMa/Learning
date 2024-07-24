import { ITableColumn } from "../../types/types";
import './styles/table.css';

type Props = {
    column: ITableColumn,
    clickTo?: (rowIndex:number) => void,
}

export function PaginatedTable({ column , clickTo }: Props) {
    return (
        <table>
            <thead className="t-header">
                <tr>
                    {column.header.map((key: string, index: number) =>
                        <th className="t-header-cell" key={index}>{key}</th>
                    )}
                </tr>
            </thead>
            <tbody className="t-body">
                {column.data?.map((row: any, rowIndex: number) =>
                    <tr className="t-row" key={rowIndex} onClick={() => clickTo?.(row.id)}>
                        {column.header.map((headerKey: string, cellIndex: number) =>
                            <td className="t-cell" key={cellIndex}>{row[headerKey]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}
