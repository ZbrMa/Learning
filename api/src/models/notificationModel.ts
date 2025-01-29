import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { INewNotification, INotification } from "../types/notificationTypes";
import { IMessageResponse } from "../types/responseTypes";

export const getNotificationsModel = (flow:'from_user'|'to_user',userId:number,callback:(err:Error| null, result:INotification[] | null)=>void) => {

    const sql = `SELECT 
                    n.id, 
                    n.subject, 
                    n.content, 
                    n.day, 
                    n.time,
                    n.read_at as readAt, 
                    u.nick as from_user,  
                    u2.nick as to_user,
                    u.image as fromImage,
                    u2.image as toImage
                FROM notifications n
                LEFT JOIN users u ON n.from_user = u.id 
                LEFT JOIN users u2 ON n.to_user = u2.id 
                WHERE n.${flow} = ? ${userId !== 1 && flow === 'to_user' ? " OR n.to_user = 0 ":""}
                ORDER BY CONCAT(n.day, ' ', n.time) DESC`;

    db.query<INotification[] & RowDataPacket[]>(sql,userId,(err,res)=>{
        if(err){
            console.log(err);
            return callback(err,null);
        }; 
        return callback(null,res);
    });
};

export const sendNewNotificationModel = (notification:INewNotification,userId:number,callback:(err:Error|null,result:IMessageResponse)=>void) => {
    const sql = `INSERT INTO notifications (subject,content,from_user,to_user,day,time) VALUES (?,?,?,?,CURDATE(),CURRENT_TIME())`;

    const params = [notification.subject,notification.content,userId,notification.to];

    db.query(sql,params,(err,res)=>{
        if(err){
            console.log(err);
            return callback(err,{success:false,message:'Zprávu se nepodařilo odeslat.'})
        }

        return callback(null,{success:true,message:'Zpráva byla odeslána'});
    });
};

export const readNotificationModel = (id:number,callback:(err:Error | null,result:boolean)=>void) => {
    const sql = `UPDATE notifications SET read_at = ? WHERE id = ?`

    db.query(sql,[new Date(),id],(err,res)=>{

        if(err){
            return callback(err,false);
        }
        return callback(null,true);
    });
};