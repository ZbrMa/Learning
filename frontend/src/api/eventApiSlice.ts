import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAdminEvent, IEvent, IEventReduced, INewEvent, IRepeatEvent } from "../types/events";
import { IEventDateRangeFilter, IEventFilter } from "../types/filtersTypes";

interface EventFilterParams {
  range:IEventDateRangeFilter,
  filters:IEventFilter,
  checked:boolean,
};

interface MessageResponse {
  success:boolean,
  message:string,
};

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes:['events', 'userEvents'],
  endpoints: (builder) => ({
    getUpcomingEvents: builder.query<IEvent[], void>({
      query: () => "/up_events",
    }),
    getEventDates: builder.query<Date[], { checked: boolean }>({
      query: (payload) => ({
        url: "/eventDates",
        method: "POST",
        body: payload,
      }),
    }),
    getEventDetail: builder.query<IEvent, {id:number}>({
      query: (payload) => ({
        url:"/eventDetail",
        method:'POST',
        body:payload,
      })      
    }),
    getFilteredEvents: builder.query<IEvent[], EventFilterParams>({
      query: (payload) => ({
        url:"/filter_events",
        method:'POST',
        body:payload,
      }),
      providesTags: ['events','userEvents'],      
    }),
    getAdminEvents:builder.query<IAdminEvent[],void>({
      query:()=>'/adminEvents',
      providesTags:['events'],
    }),
    createNewEvent:builder.mutation<MessageResponse,INewEvent>({
      query:(payload) => ({
        url:'/newEvent',
        method:'POST',
        body:payload,
      }),
      invalidatesTags:['events'],
    }),
    createRepeatEvents:builder.mutation<MessageResponse,IRepeatEvent>({
      query:(payload) => ({
        url:'/repeatEvent',
        method:'POST',
        body:payload,
      }),
      invalidatesTags:['events'],
    }),
    deleteEvent:builder.mutation<boolean,{id:number}>({
      query:(payload) => ({
        url:'/deleteEvent',
        method:'POST',
        body:payload,
      }),
      invalidatesTags:['events'],
    }),
    loginEvent:builder.mutation<MessageResponse,{id:number,userId:number,}>({
      query:(payload) => ({
        url:'/loginEvent',
        method:'POST',
        body:payload,
        
      }),
      invalidatesTags:['events'],
    }),
    getUserEvents: builder.query<IEventReduced[],{userId:number}>({
      query:(payload) => ({
        url:'/userEvents',
        method:'POST',
        body:payload,
      }),
      providesTags:['userEvents'],
    }),
    signOutEvent:builder.mutation<MessageResponse,{id:number}>({
      query:(payload) => ({
        url:'/signOutEvent',
        method:'POST',
        body:payload,
      }),
      invalidatesTags:['userEvents'],
    }),
  }),
});

export const { 
    useLazyGetEventDetailQuery,
    useGetUpcomingEventsQuery,
    useGetFilteredEventsQuery,
    useGetAdminEventsQuery,
    useCreateNewEventMutation,
    useCreateRepeatEventsMutation,
    useDeleteEventMutation,
    useGetEventDatesQuery,
    useLoginEventMutation,
    useSignOutEventMutation,
    useGetUserEventsQuery,
} = eventApi;
