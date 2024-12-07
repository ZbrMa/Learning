export interface INotification {
    id:number,
    subject:string,
    content:string,
    from_user:string,
    to_user:string,
    day:Date,
    time:string,
    readAt?:Date | undefined,
};

export interface INewNotification {
    subject:string,
    content:string,
    to?:number,
};