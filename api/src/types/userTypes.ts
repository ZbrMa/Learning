import { IArt } from "./filterTypes";

export interface IUser {
    id:number,
    password:string,
    name:string,
    surname:string,
    nick:string,
    birth:string,
    country:string,
    countraName?:string | undefined,
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
    inserted:Date,
    lang?:'cs'|'en'|'de' | null,
};

export interface GetUserResponse extends IUser {
    arts:IArt[]
};

export type INewUser = Pick<IUser, 'name' | 'surname' | 'email' | 'password' | 'nick' | 'birth' | 'country' | 'city' | 'address' | 'band' | 'phone' | 'lang'>;
export type IEditableUser = Omit<IUser, |'name'| 'surname' | 'email' | 'birth' | 'checked' | 'role' | 'password'>;

export interface IChangePassword {
    id:number,
    old:string,
    new:string,
};

export interface IForgotPassword {
    email:string,
};

export interface IUserStatistcs {
    eventCount:number | null,
    placeCount:number | null,
    hourCount:number | null,
    sixMonthsCount:number | null,
};