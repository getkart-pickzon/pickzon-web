import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        message: "",
        status: "info",
        call: false
    }
}

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        onShowSnackbar: (state, action) => {
            state.value = action.payload
        },
        onClearSnackbar: () => initialState
    },
});

export const { onShowSnackbar, onClearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;