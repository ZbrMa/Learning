import { IEvent, IEventReduced, INewEvent, IRepeatEvent,IEditableEvent } from "../types/events";
import { IEventDateRangeFilter, IEventFilter } from "../types/filtersTypes";
import apiSlice from "./apiSlice";

interface EventFilterParams {
  range:IEventDateRangeFilter,
  filters:IEventFilter,
  checked:boolean,
};

export interface MessageResponse {
  success:boolean,
  message:string,
};

export const eventApi = apiSlice.injectEndpoints({
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
    getAdminEvents:builder.query<IEventReduced[],{from:string,places:number[]}>({
      query:(payload)=>({
        url:'/adminEvents',
        body:payload,
        method:'POST'
      }),
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
    editEvent:builder.mutation<MessageResponse,IEditableEvent>({
      query:(payload) => ({
        url:'/editEvent',
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
      invalidatesTags:['userEvents'],
    }),
    getUserEvents: builder.mutation<IEventReduced[],{userId:number,startDate:Date}>({
      query:(payload) => ({
        url:'/userEvents',
        method:'POST',
        body:payload,
      }), 
      transformResponse: (response: any) => {
        console.log("Transforming response:", response);
        return response.data || response;
      }    
    }),
    getUserCalendarEvents: builder.query<IEventReduced[],{userId:number,startDate:Date}>({
      query:(payload) => ({
        url:'/userCalendarEvents',
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
    useEditEventMutation,
    useDeleteEventMutation,
    useGetEventDatesQuery,
    useLoginEventMutation,
    useSignOutEventMutation,
    useGetUserEventsMutation,
    useGetUserCalendarEventsQuery,
} = eventApi;
