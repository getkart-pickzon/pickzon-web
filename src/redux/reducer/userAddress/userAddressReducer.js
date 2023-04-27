import testTypes from "./userAddressType";


let initialState = {
    add_pincode: 0
}
export const userAddressReducers = (state = initialState, action) => {
    let { add_pincode } = state;
    switch (action.type) {
        case testTypes.user_address_add:
            return {
                ...state,
                add_pincode: add_pincode + 2
            }
        default:
            return {
                ...state
            }
    }
}