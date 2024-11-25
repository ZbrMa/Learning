import { createContext, useState } from "react";

const StepsContext = createContext<{
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}>({
  active: 0,
  setActive: () => '',
});

type StepsContextProps = {
  children: React.ReactNode;
};

function StepsContextProvider({children}:StepsContextProps) {
  const [active, setActive] = useState<number>(0);

  return (
    <StepsContext.Provider value={{ active, setActive }}>
      {children}
    </StepsContext.Provider>
  );
}

export { StepsContextProvider, StepsContext };
