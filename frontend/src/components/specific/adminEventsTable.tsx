import { PaginatedTable } from "../common/paginatedTable";
import { useNavigate } from "react-router-dom";
import { useApiGetNoParams } from "../../useApi/useApi";
import { IEvent } from "../../types/types";
import { ITableColumn } from "../../types/types";

export function AdminEventsTable() {
    const { data: events, loading, error } = useApiGetNoParams<IEvent[]>('/get_all_events');
    const navigate = useNavigate();
    const headers: (keyof IEvent)[] = ['id', 'day', 'start', 'end', 'confirmed', 'genre', 'userId', 'city', 'spot',  ];

    const tableCols: ITableColumn = {
        header: headers,
        data: events?.map(event => {
            return headers.reduce((obj, key) => {
                obj[key] = event[key];
                return obj;
            }, {} as Partial<Record<keyof IEvent, any>>);
        }) || [],
    };

    const handleRowClick = (param:number) => {
        navigate(`/event/${param}`);
    }

    if (loading) {
        return <div>Načítá se</div>;
    }

    if (error) {
        return <div>Chyba při načítání dat</div>;
    }

    return <PaginatedTable column={tableCols} clickTo={handleRowClick}/>;
}