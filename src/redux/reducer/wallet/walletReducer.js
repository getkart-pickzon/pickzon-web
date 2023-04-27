import createPageType from "./walletType";

let initialState = {
    // createPageFormObj: { name: "", email: "" }
    walletBalance: 0, currency: ""
};

export const walletReducers = (state = initialState, action) => {
    switch (action.type) {
        case createPageType.wallet_data:
            return {
                ...state,
                walletBalance: action.payload.walletBalance,
                currency: action.payload.currency
                // createPageFormObj: createPageFormObj //+ 2
            }
        default:
            return {
                ...state
            }
    }
}