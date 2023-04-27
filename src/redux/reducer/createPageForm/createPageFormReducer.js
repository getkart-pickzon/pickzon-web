import createPageType from "./createPageFormType";
let initialState = {
    pageName: "",
    category: "",
    description: "",
    images: []
}
export const createPageFormReducers = (state = initialState, action) => {
    // let { createPageFormObj } = state;
    // debugger
    switch (action.type) {
        case createPageType.create_page_add:
            return {
                ...state,
                pageName: action.payload.pageName,
                category: action.payload.category,
                description: action.payload.description,
                images: action.payload.images
            }
        default:
            return {
                ...state
            }
    }
}