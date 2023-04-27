import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userInfo/index";
import snackbarReducer from '../reducer/snackbar/index'
import globalSearchReducer from "../reducer/globalSearch";
import wallPostFeedReducer from "../reducer/wallPostFeed";

export default configureStore({
    reducer: {
        user: userReducer,
        snackbar: snackbarReducer,
        globalSearch: globalSearchReducer,
        wallPostFeed: wallPostFeedReducer
    },
});