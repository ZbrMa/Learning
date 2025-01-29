import { IPlace } from "../types/places";
import apiSlice from "./api";
import { IEvent, IEventReduced } from "../types/event";
import { IArt,IEventDateRangeFilter,IEventFilter } from "../types/filtersTypes";
import { GetUserResponse } from "../types/user";

interface EventFilterParams {
  range:IEventDateRangeFilter,
  filters:IEventFilter,
  checked:boolean,
};

interface ApiResponse<T> {
  data: T;
}

export const apiSlicer = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaces:builder.query<IPlace[], void>({
      query:()=>'/getAdminPlaces'
    }),
    getFilteredEvents: builder.query<IEvent[], EventFilterParams>({
      query: (payload) => ({
        url:"/filter_events",
        method:'POST',
        body:payload,
      }),    
    }),
    getEventDates: builder.query<Date[], { checked: boolean }>({
      query: (payload) => ({
        url: "/eventDates",
        method: "POST",
        body: payload,
      }),
    }),
    getArts: builder.query<IArt[], void>({
      query: () => "/arts",
    }),
    getUser: builder.query<GetUserResponse, { userId: number }>({
      query: (user) => ({
        url: "/getUser",
        method: "POST",
        body: user,
      }),
    }),
    getUserEvents: builder.mutation<IEventReduced[], { userId: number; startDate: Date }>({
      query: (payload) => ({
        url: '/userEvents',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: ApiResponse<IEventReduced[]> | IEventReduced[]) => {
        return Array.isArray(response) ? response : response.data;
      },
    }),
    })
});

export const { 
    useGetPlacesQuery,
    useGetEventDatesQuery,
    useGetFilteredEventsQuery,
    useGetArtsQuery,
    useGetUserQuery,
    useGetUserEventsMutation
} = apiSlicer;
