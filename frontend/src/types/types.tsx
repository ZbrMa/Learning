export interface IBanner {
    image: any;
    title: string;
    text: string;
}

export interface IEvent{
    id: number;
    day: Date;
    start: string;
    end: string;
    confirmed: boolean;
    genre:string;
    userId:number;
    name: string;
    nationality:string;
    about:string;
    image:string,
    email: string;
    phone: string;
    city:string;
    spot:string;
    placeImage:string;
    coorLong:number;
    coorLat:number;
    path:string;
    desc:string;
}

export interface IPlace{
    id:number;
    city:string;
    spot:string;
    image:string;
    coorLat:number;
    coorLong:number;
    path:string;
    desc:string;
}

export interface IGenre{
    genre:string;
}

export interface IUser {
    id:number;
    username:string;
    password:string;
    role:number,
    name:string;
    email:string;
    phone:string;
    about:string;
    image:string;
    birth_date:Date;
    nationality:string;
    confirmed:number;
    authenticated:boolean;
    instagram:string;
    twitter:string;
    website:string;
}

export interface INews {
    id: number;
    day: Date;
    start: string;
    end: string;
    confirmed: boolean;
    genre:string;
    userId:number;
    name: string;
    nationality:string;
    about:string;
    image:string,
    email: string;
    phone: string;
    city:string;
    spot:string;
    placeImage:string;
    coorLong:number;
    coorLat:number;
    path:string;
    desc:string;
}

export interface ITableColumn {
    header: (keyof IEvent)[];
    data: Array<Partial<Record<keyof IEvent, any>>>;
}