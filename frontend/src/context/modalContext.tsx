import { createContext, useEffect, useState } from "react";

const ModalContext = createContext<{
  modal: string | null;
  setModal: (modal: string | null) => void;
}>({
  modal: null,
  setModal: () => {},
});

type ModalContextProps = {
  children: React.ReactNode;
};

function ModalContextProvider({ children }: ModalContextProps) {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider, ModalContext };
