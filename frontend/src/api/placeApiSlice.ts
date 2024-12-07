import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "./eventApiSlice";
import { INewPlace, IPlace } from "../types/places";
import apiSlice from "./apiSlice";

export const placeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPlaces:builder.query<IPlace[], void>({
      query:()=>'/getAdminPlaces',
      providesTags:['places']
    }),
    editPlace:builder.mutation<MessageResponse, {place:IPlace,image?:File}>({
      query:(payload)=>{
        const formData = new FormData();
        console.log(payload.image,payload.place)
        formData.append("place", JSON.stringify(payload.place));
        if (payload.image) formData.append("image", payload.image);
        return {
          url:'/updatePlace',
        body:formData,
        method:'POST',
        }
    },
      invalidatesTags:['places'],
    }),
    createPlace:builder.mutation<MessageResponse, {place:INewPlace,image:File}>({
      query:(payload)=>{
        const formData = new FormData();
        console.log(payload.image,payload.place)
        formData.append("place", JSON.stringify(payload.place));
        if (payload.image) formData.append("image", payload.image);
        return {
          url:'/createPlace',
        body:formData,
        method:'POST',
        }
    },
      invalidatesTags:['places'],
    }),
    deletePlace:builder.mutation<MessageResponse,{id:number}>({
      query:(payload)=>({
        url:'/deletePlace',
        body:payload,
        method:'POST'
      })
    }),
  }),
});

export const { 
    useCreatePlaceMutation,
    useGetAdminPlacesQuery,
    useEditPlaceMutation,
    useDeletePlaceMutation,
} = placeApi;
