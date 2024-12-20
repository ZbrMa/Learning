import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import {
  IEditableUser,
  INewUser,
  IUser,
  IChangePassword,
  INewPassword,
} from "../types/users";
import { MessageResponse } from "./eventApiSlice";
import apiSlice from "./apiSlice";

interface ChangeImageReponse extends MessageResponse {
  imagePath?:string,
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      //prvni je návratový typ, druhý je payload (void znamená, že se nic neočekává)
      query: () => "/users",
    }),
    createUser: builder.mutation<boolean | string, INewUser>({
      query: (newUser) => ({
        url: "/newUser",
        method: "POST",
        body: newUser,
      }),
    }),
    getUser: builder.query<IUser, { userId: number }>({
      query: (newUser) => ({
        url: "/getUser",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation<{ user: IUser; token: string },{email:string,password:string}>({
      query: (loginUser) => ({
        url: "/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    editUser: builder.mutation<boolean, Omit<IEditableUser, "image">>({
      query: (editUser) => ({
        url: "/editUser",
        method: "POST",
        body: editUser,
      }),
    }),
    changeImage: builder.mutation<ChangeImageReponse,{ user: number; image: File }>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("image", payload.image);
        return {
          url: `/${payload.user}/upload-image`,
          method: "POST",
          body: formData,
        };
      },
    }),
    changePassword: builder.mutation<{ success: boolean; message: string },Omit<IChangePassword, "newRepeat">>({
      query: (newPass) => ({
        url: "/changePassword",
        method: "POST",
        body: newPass,
      }),
    }),
    forgotPassword: builder.mutation<{ success: boolean; message: string },INewPassword>({
      query: (newPass) => ({
        url: "/forgotPassword",
        method: "POST",
        body: newPass,
      }),
    }),
    checkEmail: builder.mutation<boolean, { email: string }>({
      query: (payload) => ({
        url: "/checkEmail",
        method: "POST",
        body: payload,
      }),
    }),
    checkNick: builder.mutation<boolean, { nick: string }>({
      query: (payload) => ({
        url: "/checkNick",
        method: "POST",
        body: payload,
      }),
    }),
    checkUser: builder.mutation<{ message: string; success: boolean },{ id: number }>({
      query: (payload) => ({
        url: "/checkUser",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useEditUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useChangeImageMutation,
  useCheckEmailMutation,
  useCheckNickMutation,
  useCheckUserMutation,
  useGetUserQuery,
} = userApi;
