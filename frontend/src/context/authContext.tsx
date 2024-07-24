import { ReactNode, createContext, useState,useEffect } from 'react';
import { IUser } from '../types/types';
import { api } from "../useApi/useApi";
import Cookies from 'js-cookie';

type Props = {
    children?:ReactNode
}

type IAuthContext = {
    user:IUser,
    setUser:(newState:IUser)=>void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
}

export const UserInitialValue = {
    user:{
        id:9999,
        username:'notLogged',
        password:'notLogged',
        role:3,
        name:'notLogged',
        email:'notLogged',
        phone:'notLogged',
        about:'notLogged',
        image:'notLogged',
        birth_date:new Date,
        nationality:'notLogged',
        confirmed:0,
        authenticated:false,
        website:'notLogged',
        instagram:'notLogged',
        twitter:'notLogged',
    },    
    setUser:()=>{},
    loading: false,
    setLoading: () => {},
}

const AuthContext = createContext<IAuthContext>(UserInitialValue);

const AuthProvider = ({children}:Props)=>{
    const [user,setUser] = useState(UserInitialValue.user);
    const [loading, setLoading] = useState<boolean>(false);

    const verifyToken = async (token:any, setUser:any) => {
        try {
            setLoading(true);
            const response = await api.post('/verify', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            if (data.user) {
                const loggedUser:IUser = data.user;
                setUser({
                    id: loggedUser.id,
                    username: loggedUser.username,
                    password: loggedUser.password,
                    role: loggedUser.role,
                    name: loggedUser.name,
                    email:loggedUser.email,
                    phone:loggedUser.phone,
                    about:loggedUser.about,
                    image:loggedUser.image,
                    birth_date:new Date(loggedUser.birth_date),
                    nationality: loggedUser.nationality,
                    confirmed: loggedUser.confirmed,
                    authenticated: true
                  });
                console.log(user);
            } else {
                Cookies.remove('token');
            }
        } catch (error) {
            console.error('Token verification failed', error);
            Cookies.remove('token');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            verifyToken(token, setUser);
        } else {
            setLoading(false);
        }

        let timeoutId:any;

        const resetTimeout = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                Cookies.remove('token');
                setUser(UserInitialValue.user);
            }, 10 * 60 * 1000);
        };

        const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
        events.forEach(event => window.addEventListener(event, resetTimeout));

        resetTimeout();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            events.forEach(event => window.removeEventListener(event, resetTimeout));
        };
    }, []);

    return (
        <AuthContext.Provider value={{user,setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext,AuthProvider};

