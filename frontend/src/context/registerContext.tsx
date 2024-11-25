import { createContext, useEffect, useState } from "react";
import { INewUser } from "../types/users";
import { format } from "date-fns";

const initialValues: INewUser = {
  password: "",
  name: "",
  surname: "",
  nick: "",
  birth: format(new Date(),'yyyy-MM-dd'),
  country: 0,
  city: "",
  address: "",
  band: "",
  email: "",
  phone: "",
  website: undefined,
  instagram: undefined,
  facebook: undefined,
  twitter: undefined,
  description: undefined,
  art: 0,
};

const NewUserContext = createContext<{
  user: INewUser;
  setUser: (updatedUser: INewUser) => void;
}>({
  user: initialValues,
  setUser: () => {},
});

type NewUserContextProviderProps = {
  children: React.ReactNode;
};

export function NewUserContextProvider({ children }: NewUserContextProviderProps) {
  const [user, setUser] = useState<INewUser>(initialValues);

  const updateUser = (updatedFields: Partial<INewUser>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
  };

  return (
    <NewUserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </NewUserContext.Provider>
  );
}

export { NewUserContext };
