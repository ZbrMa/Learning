import { DOMAttributes, MouseEventHandler } from "react";

export interface IPlace {
    id:number,
    city:string,
    spot:string,
}

export interface IArt {
    id:number,
    name:string,
};

export interface ICountry {
    id:number,
    name:string,
};

export interface IEventFilter {
    places:number[],
    arts:number[];
};

export interface IEventDateRangeFilter {
    from:string,
    to:string,
};

export interface IDropdownMenuOption {
    label: string;
    link?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    optionIcon?:React.ReactNode;
};