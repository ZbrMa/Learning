export interface IPlace {
    id:number,
    city:string,
    spot:string,
    image:string,
    latitude:number,
    longitude:number,
    about?:string,
};

export type INewPlace = Omit<IPlace, 'image' |'id'>;