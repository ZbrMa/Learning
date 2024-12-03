export interface IUser {
    id:number,
    inserted:Date,
    password:string,
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
    art:number,
    image:string,
    role:number,
};

export type INewUser = Omit<IUser, 'role' | 'id' | 'checked' | 'image' | 'inserted'>;
export type IEditableUser = Omit<IUser, |'name'| 'surname' | 'email' | 'birth' | 'checked' | 'role' | 'password' | 'inserted'>;

export interface IChangePassword {
    id:number,
    old:string,
    new:string,
    newRepeat:string,
};

export interface INewPassword {
    email:string,
};