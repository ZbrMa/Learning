import { INewNotification, INotification } from "../types/notifications";
import { MessageResponse } from "./eventApiSlice";
import apiSlice from "./apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncommingNotifications: builder.query<INotification[], {userId:number}>({
      query: (payload) =>({
            url: "/getIncommingNotifications",
            body:payload,
            method:'POST',
        }),
        providesTags:['notificationIn']
    }),
    getSentNotifications: builder.query<INotification[], {userId:number}>({
        query: (payload) =>({
            url: "/getSentNotifications",
            body:payload,
            method:'POST',
        }),
        providesTags:['notificationOut']
    }),
    postNewNotification: builder.mutation<MessageResponse, {notification:INewNotification,userId:number}>({
        query: (payload) =>({
            url: "/sendNewNotification",
            body:payload,
            method:'POST',
        }),
        invalidatesTags:['notificationOut']
    }),
    readNotification: builder.mutation<boolean, {id:number}>({
        query: (payload) =>({
            url: "/readNotification",
            body:payload,
            method:'POST',
        }),
        invalidatesTags:['notificationIn']
    }),
  }),
});

export const { 
    useGetIncommingNotificationsQuery,
    useGetSentNotificationsQuery,   
    usePostNewNotificationMutation, 
    useReadNotificationMutation,
} = notificationsApi;
