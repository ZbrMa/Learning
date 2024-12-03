import './notificationContainer.css';
import { INotification } from '../../../../../types/notifications';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { NotificationContext, NotificationContextProvider } from '../../../../../context/notificationContext';
import { IoMailOutline } from 'react-icons/io5';

type NotificationContainerProps = {
    notifications:INotification[],
    flow:'from'|'to'
};

export function NotificationContainer({notifications,flow}:NotificationContainerProps){
    const {notification} = useContext(NotificationContext);

    return(
        <NotificationContextProvider>
        <div className='notification__container'>
            <div className='notification__left'>
           { flow === 'from' ? (
                            <h2 className='h-lg xbold mb-16'>Přijaté zprávy</h2>
                        ):(
                            <h2 className='h-lg xbold mb-16'>Odeslané zprávy</h2>
                        )}
                <div className='notification__list flex-col'>
                    {notifications.map((notif,index)=>(
                        <NotificationItem notificationInput={notif} flow={flow}/>
                    ))}
                </div>
            </div>
                <div className='notification__right'>
                    <NotificationDetail flow={flow}/>
                </div>
        </div>
        </NotificationContextProvider>
    );
};

type NotificationItemProps = {
    notificationInput:INotification,
    flow:'from'|'to',
}

export function NotificationItem({notificationInput,flow}:NotificationItemProps){
    const {notification,setNotification} = useContext(NotificationContext);

    return(
        <div className={`notification__list__item p-16 flex-col g-8 ${notification?.id === notificationInput.id ? 'active': ''}`} onClick={()=>setNotification(notificationInput)}>
            <div className='flex g-32 items-base content-space'>
            <h3 className='xbold'>{notificationInput.subject}</h3>
            <p className='tx-sm'>{format(notificationInput.day,'dd.MM')}</p>
            </div>
            
            {flow === 'from' ? (
                <p className='tx-xs'>{notificationInput.from}</p>
            ):(
                <p className='tx-xs'>{notificationInput.to}</p>
            )}
        </div>
    );
};

export function NotificationDetail({flow}:Omit<NotificationItemProps,'notificationInput'>){
    const {notification} = useContext(NotificationContext);

    if (notification){
        return(
            <div className='notification__detail p-64'>
                <div className='notification__header mb-32 pb-16'>
                    <div className='flex content-space items-base mb-16'>
                        <h3 className='h-xl xbold'>{notification.subject}</h3>
                        <p className='tx-md bold notification--time'>{format(notification.day,'dd.MM.yyyy')}, {notification.time}</p>
                    </div>
                    <div className='flex-col g-8 pb-8'>
                        <p className='tx-md bold'><span className='tx-gray tx-sm'>Od: </span>{notification.from}</p>
                        {/*<span className='tx-lg tx-lightGray'>&#x2022; &#x2022; &#x2022;</span>*/}
                        <p className='tx-md bold'><span className='tx-gray tx-sm'>Pro: </span>{notification.to}</p>
                        </div>
                </div>
                <p>{notification.content}</p>
            </div>
        );
    }

    return(
        <IoMailOutline/>
    )
    
};