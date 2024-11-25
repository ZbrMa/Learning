import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { url } from "inspector";
import { IEditableUser, INewUser, IUser, IChangePassword } from "../types/users";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({ //prvni je návratový typ, druhý je payload (void znamená, že se nic neočekává)
          query: () => '/users',
        }),
        createUser: builder.mutation<boolean | string, INewUser>({
          query: (newUser) => ({
            url: '/newUser',
            method: 'POST',
            body: newUser,
          }),
        }),
        getUser: builder.query<IUser, {userId:number}>({
          query: (newUser) => ({
            url: '/getUser',
            method: 'POST',
            body: newUser,
          }),
        }),
        login: builder.mutation<{user:IUser,token:string}, Pick<IUser,'email' | 'password'>>({
            query: (loginUser) => ({
              url: '/login',
              method: 'POST',
              body: loginUser,
            }),
          }),
          editUser: builder.mutation<boolean, Omit<IEditableUser,'image'>>({
            query: (editUser) => ({
              url: '/editUser',
              method: 'POST',
              body: editUser,
            }),
          }),
          changePassword: builder.mutation<{success:boolean,message:string}, Omit<IChangePassword, 'newRepeat'>>({
            query: (newPass) => ({
              url: '/changePassword',
              method: 'POST',
              body: newPass,
            }),
          }),
          changeImage: builder.mutation<{imagePath?:string,message:string}, {user:number,image:File}>({
            query: (payload) => ({
              url: '/changeUserImage',
              method: 'POST',
              body: payload,
            }),
          }),
          checkEmail: builder.mutation<boolean,{email:string}>({
            query: (payload)=>({
              url:'/checkEmail',
              method:'POST',
              body:payload,
            }),
          }),
          checkNick: builder.mutation<boolean,{nick:string}>({
            query: (payload)=>({
              url:'/checkNick',
              method:'POST',
              body:payload,
            }),
          }),
          checkUser:builder.mutation<{message:string,success:boolean},{id:number}>({
            query:(payload)=>({
              url:'/checkUser',
              method:'POST',
              body:payload,
            })
          })
      }),
  });

export const {
    useLazyGetUsersQuery,
    useCreateUserMutation,
    useLoginMutation,
    useEditUserMutation,
    useChangePasswordMutation,
    useChangeImageMutation,
    useCheckEmailMutation,
    useCheckNickMutation,
    useCheckUserMutation,
    useGetUserQuery,
} = userApi;