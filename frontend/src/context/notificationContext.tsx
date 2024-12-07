import { createContext, useEffect, useState } from "react";
import { INotification } from "../types/notifications";

type modeType = 'write' | 'read';

const NotificationContext = createContext<{
  notification: INotification | null,
  setNotification: (notification:INotification) => void;
  mode:modeType,
  setMode: (mode:modeType) => void;
}>({
  notification: null,
  setNotification: () => {},
  mode:'read',
  setMode: () => {},
});

type NotificationContextProps = {
  children: React.ReactNode;
};

function NotificationContextProvider({ children }: NotificationContextProps) {
  const [notification, setNotification] = useState<INotification | null>(null);
  const [mode,setMode] = useState<modeType>('read');

  useEffect(()=>{
    if(mode ==='write') setNotification(null);
    console.log(mode);
  },[mode]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification,mode,setMode }}>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContextProvider, NotificationContext };
