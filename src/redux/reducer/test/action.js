import testTypes from "./testType";

export const actionTest = () => {
    return {
        type: testTypes.Test_Add,
        payload: "TEST ADD",
    };
}