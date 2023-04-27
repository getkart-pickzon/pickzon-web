import testTypes from "./userDetailsType";

export const actionTest = () => {
    return {
        type: testTypes.user_Details_add,
        payload: "TEST ADD",
    };
}