import { createContext, useEffect, useState } from "react";
import { INotification } from "../types/notifications";

type modeType = 'write' | 'read';

const NotificationContext = createContext<{
  notification: INotification | null,
  setNotification: (notification:INotification) => void;
}>({
  notification: null,
  setNotification: () => {},
});

type NotificationContextProps = {
  children: React.ReactNode;
};

function NotificationContextProvider({ children }: NotificationContextProps) {
  const [notification, setNotification] = useState<INotification | null>(null);

  useEffect(()=>{
    if(window.location.pathname !== '/app/mail' && window.location.pathname !== '/app/adminPage/notifications'){
      setNotification(null);
    };
  },[window.location.pathname]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContextProvider, NotificationContext };
