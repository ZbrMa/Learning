import { createContext, useState } from "react";

const TabsContext = createContext<{
  active: string;
  setActive: (value: string) => void;
}>({
  active: '',
  setActive: () => '',
});

type TabsContextProps = {
  children: React.ReactNode;
  defaultTab:string,
};

function TabsContextProvider({children,defaultTab}:TabsContextProps) {
  const [active, setActive] = useState<string>(defaultTab);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

export { TabsContextProvider, TabsContext };
