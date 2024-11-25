import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type AlertContextType = {
  showAlert: (alertCont:React.ReactNode,timeout?:number) => void;
  closeAlert:()=>void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<React.ReactNode | null>(null);

  const showAlert = useCallback((alertCont: React.ReactNode,timeout?:number) => {
    setAlert(alertCont);
    setTimeout(() => setAlert(null), timeout?? 2000);
  }, []);

  const closeAlert = useCallback(()=>{
    setAlert(null);
  },[]);

  return (
    <AlertContext.Provider value={{ showAlert,closeAlert }}>
      {children}
      {alert}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
