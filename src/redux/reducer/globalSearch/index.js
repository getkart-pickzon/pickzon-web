import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        payload: []
    }
}

export const globalSearchSlice = createSlice({
    name: "globalSearch",
    initialState,
    reducers: {
        onClearGlobalSearch: () => initialState,
        onSetGlobalSearch: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { onClearGlobalSearch, onSetGlobalSearch } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;