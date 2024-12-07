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
    art:number,
    image:string,
    role:number,
    inserted:Date,
};

export type INewUser = Pick<IUser, 'name' | 'surname' | 'email' | 'password' | 'nick' | 'birth' | 'country' | 'city' | 'address' | 'band' | 'phone' | 'art'>;
export type IEditableUser = Omit<IUser, |'name'| 'surname' | 'email' | 'birth' | 'checked' | 'role' | 'password'>;

export interface IChangePassword {
    id:number,
    old:string,
    new:string,
};

export interface IForgotPassword {
    email:string,
};