import { createContext, useEffect, useState,Dispatch,SetStateAction } from "react";
import { INotification } from "../types/notifications";
import { ExtendedUser } from "../api/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/userStore";

const ProfileContext = createContext<{
  userState: ExtendedUser | null,
  setUser: Dispatch<SetStateAction<ExtendedUser>>,
}>({
  userState: null,
  setUser: () => {},
});

type ProfileContextProps = {
  children: React.ReactNode;
};

function ProfileContextProvider({ children }: ProfileContextProps) {
const user = useSelector((root: RootState) => root.auth);
  const [userState, setUser] = useState<ExtendedUser>(user);

  useEffect(()=>{
    setUser(user);
  },[user]);

  return (
    <ProfileContext.Provider value={{ userState,setUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContextProvider, ProfileContext };
