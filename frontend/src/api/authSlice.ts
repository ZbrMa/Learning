import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser,IEditableUser } from '../types/users';
import { format } from "date-fns";

export interface ExtendedUser extends Omit<IUser,'inserted'> {
    token: string | undefined,
}

const initialState: ExtendedUser = {
    id: 0,
    password: '',
    name: '',
    surname: '',
    nick: '',
    birth: format(new Date(),'yyyy-MM-dd'),
    country: 0,
    city:'',
    address:'',
    band: '',
    email: '',
    phone: '',
    website: undefined,
    instagram: undefined,
    facebook: undefined,
    twitter: undefined,
    checked: 0,
    description: undefined,
    art: 0,
    image: '',
    token: undefined,
    role:2,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<ExtendedUser>) => {

            return { ...state, ...action.payload };
        },
        logout: () => {
            localStorage.removeItem("tokenExpiry");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            return { ...initialState };
        },
        editSuccess: (state, action: PayloadAction<IEditableUser>) => {
            return { ...state, ...action.payload };
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem("authToken");
            const tokenExpiry = localStorage.getItem("tokenExpiry");
            const userData = localStorage.getItem("userData");
            
            if (token && tokenExpiry && userData) {
                const isExpired = new Date().getTime() > parseInt(tokenExpiry);
                if (isExpired) {
                    localStorage.clear();
                    return { ...initialState };
                } else {
                    const user = JSON.parse(userData);
                    return { ...state, ...user, token };
                }
            }

            return { ...initialState };
        },
    },
});

export const { loginSuccess, logout, editSuccess,initializeAuth } = authSlice.actions;
export default authSlice.reducer;
