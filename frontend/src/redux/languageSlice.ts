import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILang } from "../types/filtersTypes";

const initialLang:ILang = {lang:'cs'};

const langSlice = createSlice({
    name:'lang',
    initialState:initialLang,
    reducers: {
        setLang:(state,action:PayloadAction<'cs'|'de'|'en'>) => {
            state.lang=action.payload
        }
    }
});

export const {setLang} = langSlice.actions;
export default langSlice.reducer;