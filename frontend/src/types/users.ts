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
};

export interface GetUserResponse extends IUser {
    arts:IArt[],
};

export type INewUser = Omit<IUser, 'role' | 'id' | 'checked' | 'image' | 'inserted'> & {password:string};
export type IEditableUser = Omit<IUser, |'name'| 'surname' | 'email' | 'birth' | 'checked' | 'role' | 'inserted'>;

export interface IChangePassword {
    id:number,
    old:string,
    new:string,
    newRepeat:string,
};

export interface INewPassword {
    email:string,
};