export interface IEvent {
    id:number,
    day:Date,
    start:string,
    end:string,
    city:string,
    spot:string,
    nick:string,
    art:string,
    artistId:number,
    about:string,
    country:string,
    website:string | undefined,
    instagram:string | undefined,
    facebook:string | undefined,
    twitter:string | undefined, 
    image:string,
}

export interface IEventReduced {
    id:number,
    day:Date,
    start:string,
    end:string,
    city:string,
    spot:string,
};

export interface IAdminEvent {
    id:number,
    day:Date,
    start:string,
    end:string,
    city:string,
    spot:string,
    user:number,
    placeId:number,
}

export interface INewEvent {
    day:string,
    start:string,
    end:string,
    place:number,
};

export interface IEditableEvent {
    day:string,
    start:string,
    end:string,
    id:number,
};

export interface IRepeatEvent {
    weekDay:number,
    interval:number,
    period:{start:string,end:string},
    start:string,
    end:string,
    place:number,
}