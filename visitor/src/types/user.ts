import { IArt } from "./filtersTypes";

export interface IUser {
    id:number,
    inserted:Date,
    name:string,
    surname:string,
    nick:string,
    birth:string,
    country:number,
    countryName?:string | undefined,
    city:string,
    address:string,
    band:string,
    email:string,
    phone:string,
    website?:string | undefined,
    instagram?:string | undefined,
    facebook?:string | undefined,
    twitter?:string | undefined, 
    checked:number,
    description?:string | undefined,
    image:string,
    role:number,
    lang?:'cs'|'en'|'de' | null,
};

export interface GetUserResponse extends IUser {
    arts:IArt[],
};