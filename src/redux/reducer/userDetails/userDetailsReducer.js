import userType from "./userDetailsType";


let initialState = {
    user_detail_val: 0,
    userClickedId: "",
    userInfo: {},
    userDetails: {}
}
export const userDetailsReducers = (state = initialState, action) => {
    switch (action.type) {
        case userType.user_Details_add:
            return {
                ...state,
                user_detail_val: action.payload
            };
        case userType.userClickedId:
            return {
                ...state,
                userClickedId: action.payload
            };
        case userType.userInfo:
            return {
                ...state,
                userInfo: action.payload
            };
        case userType.userDetails:
            return {
                ...state,
                userDetails: action.payload
            };
        default:
            return {
                ...state
            }
    }
}