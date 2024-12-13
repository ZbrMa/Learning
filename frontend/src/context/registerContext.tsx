import { createContext, useEffect, useState } from "react";
import { INewUser } from "../types/users";
import { format } from "date-fns";
import { IArt, ICountry } from "../types/filtersTypes";
import { useGetArtsQuery, useGetCountriesQuery } from "../api/filtersApiSlice";

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
  art:IArt | null;
  arts:IArt[] | undefined,
  country:ICountry | null;
  countries:ICountry[] | undefined,
}>({
  user: initialValues,
  setUser: () => {},
  art:null,
  arts:undefined,
  country:null,
  countries:undefined,
});

type NewUserContextProviderProps = {
  children: React.ReactNode;
};

export function NewUserContextProvider({ children }: NewUserContextProviderProps) {
  const [user, setUser] = useState<INewUser>(initialValues);
  const [art, setArt] = useState<IArt | null>(null);
  const [country, setCountry] = useState<ICountry | null>(null);

  const { data: arts } = useGetArtsQuery();
  const { data: countries } = useGetCountriesQuery();

  useEffect(()=>{
      if(arts) setArt(arts.find((artItem)=>artItem.id === user.art)?? null);
  },[user.art]);

  useEffect(()=>{
    if(countries) setCountry(countries.find((countryItem)=>countryItem.id === user.country)?? null);
},[user.country]);

  const updateUser = (updatedFields: Partial<INewUser>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
  };

  return (
    <NewUserContext.Provider value={{ user, setUser: updateUser, art,arts,country,countries }}>
      {children}
    </NewUserContext.Provider>
  );
}

export { NewUserContext };
