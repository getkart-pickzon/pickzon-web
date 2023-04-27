import testTypes from "./userAddressType";

export const actionTest = () => {
    return {
        type: testTypes.user_address_add,
        payload: "TEST ADD",
    };
}