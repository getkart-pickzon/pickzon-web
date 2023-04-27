import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        onLogout: () => initialState,
        onLogin: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { onLogout, onLogin } = userSlice.actions;

export default userSlice.reducer;