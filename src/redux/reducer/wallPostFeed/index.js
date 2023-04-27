import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const wallPostFeed = createSlice({
    name: "wallPostFeed",
    initialState,
    reducers: {
        onClearWallPostFeed: () => initialState,
        onSetWallPostFeed: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { onClearWallPostFeed, onSetWallPostFeed } = wallPostFeed.actions;

export default wallPostFeed.reducer;