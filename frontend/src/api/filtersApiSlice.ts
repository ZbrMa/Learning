import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArt, IPlace,ICountry } from "../types/filtersTypes";

export const filtersApi = createApi({
  reducerPath: "filtersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getPlaces: builder.query<IPlace[], void>({
      query: () => "/places",
    }),
    getArts: builder.query<IArt[], void>({
      query: () => "/arts",
    }),
    getCountries: builder.query<ICountry[], void>({
      query: () => "/countries",
    }),
  }),
});

export const { useGetPlacesQuery, useGetArtsQuery, useGetCountriesQuery } = filtersApi;
