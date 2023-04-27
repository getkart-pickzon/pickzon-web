import createPageType from "./createPageFormType";

export const actionTest = () => {
    return {
        type: createPageType.create_page_add,
        payload: {},
    };
}