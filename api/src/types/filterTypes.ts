export interface IPlace {
    id:number,
    city:string,
    spot:string,
};

export interface IArt {
    id:number,
    name:string,
    userId?:number,
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

export interface IUserArts {
    id:number,
    user_id:number,
    art_id:number
}