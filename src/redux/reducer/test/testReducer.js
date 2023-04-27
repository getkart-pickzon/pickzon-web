import testTypes from "./testType";


let initialState = {
    testAdd: 0
}
export const testReducers = (state = initialState, action) => {
    let { testAdd } = state;
    switch (action.type) {
        case testTypes.Test_Add:
            return {
                ...state,
                testAdd: testAdd + 1
            }
        default:
            return {
                ...state
            }
    }
}