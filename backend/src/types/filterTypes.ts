export interface IPlace {
    id:number,
    city:string,
    spot:string,
}

export interface IArt {
    id:number,
    name:string,
}

export interface IEventFilter {
    places:number[],
    arts:number[];
};

export interface IEventDateRangeFilter {
    from:string,
    to:string,
};