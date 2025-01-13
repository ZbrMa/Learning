import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import {
  IEditableUser,
  INewUser,
  IUser,
  IChangePassword,
  GetUserResponse,
  IUserStatistcs,
} from "../types/users";
import { MessageResponse } from "./eventApiSlice";
import apiSlice from "./apiSlice";
import { IArt } from "../types/filtersTypes";
import { ExtendedUser } from "./authSlice";

interface ChangeImageReponse extends MessageResponse {
  imagePath?:string,
};

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUserResponse[], void>({
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
    getUser: builder.query<GetUserResponse, { userId: number }>({
      query: (user) => ({
        url: "/getUser",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<{ user: GetUserResponse; token: string },{email:string,password:string}>({
      query: (loginUser) => ({
        url: "/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    editUser: builder.mutation<boolean, {user:Omit<IEditableUser, "image">,arts:number[]}>({
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
    resetPassword: builder.mutation<{ success: boolean; message: string },{email:string}>({
      query: (newPass) => ({
        url: "/resetPassword",
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
    getUserStatistics: builder.query<IUserStatistcs, { userId: number }>({
      query: (user) => ({
        url: "/userStatistics",
        method: "POST",
        body: user,
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
  useResetPasswordMutation,
  useChangeImageMutation,
  useCheckEmailMutation,
  useCheckNickMutation,
  useCheckUserMutation,
  useGetUserQuery,
  useGetUserStatisticsQuery,
} = userApi;
