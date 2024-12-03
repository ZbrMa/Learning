import { createContext, useEffect, useState } from "react";
import { INotification } from "../types/notifications";

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

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContextProvider, NotificationContext };
