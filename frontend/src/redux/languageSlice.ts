import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const langSlice = createSlice({
    name:'lang',
    initialState:{lang:'cs'},
    reducers: {
        setLang:(state,action:PayloadAction<string>) => {
            state.lang=action.payload
        }
    }
});

export const {setLang} = langSlice.actions;
export default langSlice.reducer;